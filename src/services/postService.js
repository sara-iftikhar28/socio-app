import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/posts";

function postUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPosts() {
  return http.get(apiEndpoint);
}

export function getPost(postId) {
  return http.get(postUrl(postId));
}

export function savePost(post) {
  if (post.id) {
    const body = { ...post };
    delete body.id;
    return http.put(postUrl(post.id), body);
  }
  return http.post(apiEndpoint, post);
}

export function deletePost(id) {
  return http.delete(postUrl(id));
}

export default {
  getPosts,
  getPost,
  savePost,
  deletePost,
};
