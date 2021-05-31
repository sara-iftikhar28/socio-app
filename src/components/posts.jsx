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
  });

  const getPosts = async () => {
    const { data } = await postService.getPosts();
    setPosts(data);
    getUpdatePosts(data);
  };

  const getUpdatePosts = (data) => {
    const { post } = props.location;
    if (post) {
      const posts = [...data];
      const index = posts.indexOf(post);
      const updatedPosts = index > 0 ? (posts[index] = post) : [post, ...posts];
      setPosts(updatedPosts);
    }
  };

  const handleDelete = async (id) => {
    const originalPosts = posts;
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);

    try {
      await postService.deletePost(id);
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

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-10">
          {user && (
            <Link
              to="/posts/new"
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
              New Post
            </Link>
          )}
          <p>Showing {posts.length} posts in the database</p>
          <ErrorBoundary>
            <SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
          </ErrorBoundary>
          <ErrorBoundary>
            <PostsTable
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              posts={data}
              onSort={handleSort}
              sortedColumn={sortedColumn}
            ></PostsTable>
          </ErrorBoundary>
          <ErrorBoundary>
            <Pagination
              itemCount={posts.length}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            ></Pagination>
          </ErrorBoundary>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Posts;
