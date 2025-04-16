import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'http://20.244.56.144/evaluation-service';
const access_token = process.env.TOKEN

const headers = {
    Authorization: `Bearer ${access_token}`
};

export async function fetchUsers() {
    const res = await axios.get(`${BASE_URL}/users`, { headers });
    return res.data;
}

export async function fetchUserPosts(userId) {
    const res = await axios.get(`${BASE_URL}/users/${userId}/posts`, { headers });
    return res.data;
}

export async function fetchPosts() {
    const res = await axios.get(`${BASE_URL}/posts`, { headers });
    return res.data;
}

export async function fetchPostComments(postId) {
    const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`, { headers });
    return res.data;
}

