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
  return http.get(postUrl());
}

export function savePost(post) {
  return http.post(apiEndpoint, post);
}

export function updatePost(post) {
  return http.put(postUrl(post.id), post);
}

export function deletePost(id) {
  return http.delete(postUrl(id));
}

export default {
  getPosts,
  getPost,
  savePost,
  updatePost,
  deletePost,
};
