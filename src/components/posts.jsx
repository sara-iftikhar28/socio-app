import React, { useEffect, useState } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import PostsTable from "./postsTable";
import { Link } from "react-router-dom";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import * as postService from "../services/postService";
import { toast } from "react-toastify";
import SearchBox from "./common/searchBox";
import ErrorBoundary from "./common/errorBoundary";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "#cccccc3b",
  },
  margin: {
    marginTop: 10,
    marginBottom: 10,
  },
}));

function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedColumn, setSortedColumn] = useState({
    path: "title",
    order: "asc",
  });
  const pageSize = 10;

  useEffect(() => {
    try {
      getPosts();
    } catch (ex) {}
  }, [setPosts]);

  const getPosts = async () => {
    try {
      const { data } = await postService.getPosts();
      setPosts(data);
      getUpdatePosts(data);
    } catch (ex) {}
  };

  const getUpdatePosts = (data) => {
    const { post } = props.location;
    if (post) {
      const posts = [...data];
      const index = posts.findIndex((x) => x.id === post.id);
      const updatedPosts =
        index > 0
          ? () => {
              posts[index] = post;
              return posts;
            }
          : [post, ...posts];
      setPosts(updatedPosts);
    }
  };

  const handleDelete = async (id) => {
    const originalPosts = posts;
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);

    try {
      await postService.deletePost(id);
      toast.success("Post deleted Successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Post has already been deleted");
      setPosts(originalPosts);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (sortColumn) => {
    setSortedColumn(sortColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handleUpdate = (id) => {
    props.history.push(`/posts/${id}`);
  };

  const getPagedData = () => {
    if (posts.length === 0) return <p>There are no posts in the database</p>;

    let filtered = posts;
    if (searchQuery) {
      filtered = posts.filter((x) =>
        x.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(
      filtered,
      [sortedColumn.path],
      [sortedColumn.order]
    );

    const filteredPosts = paginate(sorted, currentPage, pageSize);

    return { data: filteredPosts };
  };

  const { user } = props;

  const { data } = getPagedData();

  const classes = useStyles();

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <div className={classes.root}>
          {user && (
            <Button
              className={classes.margin}
              variant="contained"
              color="primary"
              to="/posts/new"
              component={Link}
              margin="normal"
            >
              New Post
            </Button>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ErrorBoundary>
                  <PostsTable
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    posts={data}
                    onSort={handleSort}
                    sortedColumn={sortedColumn}
                  ></PostsTable>
                </ErrorBoundary>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <ErrorBoundary>
                      <SearchBox
                        value={searchQuery}
                        onChange={handleSearch}
                      ></SearchBox>
                    </ErrorBoundary>
                  </Grid>
                  <Grid item xs={6}>
                    <ErrorBoundary>
                      <Pagination
                        itemCount={posts.length}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                      ></Pagination>
                    </ErrorBoundary>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Posts;
