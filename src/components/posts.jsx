import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import PostsTable from "./postsTable";
import { Link } from "react-router-dom";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import * as postService from "../services/postService";
import { toast } from "react-toastify";

class Posts extends Component {
  state = {
    posts: [],
    pageSize: 10,
    currentPage: 1,
    sortedColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: posts } = await postService.getPosts();
    this.setState({
      posts: posts,
    });
    this.getUpdatePosts();
  }

  getUpdatePosts = () => {
    const { post } = this.props.location;
    if (post) {
      const posts = [...this.state.posts];
      const index = posts.indexOf(post);
      const updatedPosts =
        index > 0 ? (posts[index] = post) : [post, ...this.state.posts];
      this.setState({
        posts: updatedPosts,
      });
    }
  };

  handleDelete = async (id) => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter((post) => post.id !== id);
    this.setState({
      posts,
    });

    try {
      await postService.deletePost(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Post has already been deleted");
      this.setState({ posts: originalPosts });
    }
  };

  handleUpdate = (id) => {
    this.props.history.push(`/posts/${id}`);
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortedColumn: sortColumn,
    });
  };

  render() {
    const { length: count } = this.state.posts;
    const { pageSize, currentPage, posts: allPosts, sortedColumn } = this.state;

    if (count === 0) return <p>There are no posts in the database</p>;

    const sorted = _.orderBy(
      allPosts,
      [sortedColumn.path],
      [sortedColumn.order]
    );

    const posts = paginate(sorted, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-10">
            <Link
              to="/posts/new"
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
              New Post
            </Link>
            <p>Showing {allPosts.length} posts in the database</p>
            <PostsTable
              onDelete={this.handleDelete}
              onUpdate={this.handleUpdate}
              posts={posts}
              onSort={this.handleSort}
              sortedColumn={sortedColumn}
            ></PostsTable>
            <Pagination
              itemCount={allPosts.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            ></Pagination>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Posts;
