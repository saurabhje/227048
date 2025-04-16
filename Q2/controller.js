import express from 'express'

const router = express.Router();

import { fetchPostComments, fetchPosts, fetchUserPosts, fetchUsers } from './helper/fetchData.js';

router.get('/users', async (req, res) => {
    try {
        const data = await fetchUsers();
        const users = data.users
    
        const userCommentCounts = [];

        for (const id of Object.keys(users)) {
            const posts = await fetchUserPosts(id);
            let totalComments = 0;

            for (const post of posts) {
                const comments = await fetchPostComments(post.id);
                totalComments += comments.length;
            }
            userCommentCounts.push({
                id,
                name: data.users[id],
                totalComments
            });
        }

        const topUsers = userCommentCounts
            .sort((a, b) => b.totalComments - a.totalComments)
            .slice(0, 5)
            .map(({ id, name }) => ({ id, name }));

        res.json(topUsers);
    } catch (error) {
        console.error('Error fetching top users with most commented posts:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/posts', async (req, res) => {
    const { type } = req.query; 

    if (type !== 'popular') {
        return res.status(400).json({ error: 'Invalid type parameter. Use "popular".' });
    }

    try {
        const posts = await fetchPosts();
        const postCommentCounts = [];
        for (const post of posts) {
            const comments = await fetchPostComments(post.id);
            postCommentCounts.push({
                post,
                totalComments: comments.length
            });
        }

        const topPosts = postCommentCounts
            .sort((a, b) => b.totalComments - a.totalComments)
            .slice(0, 5)
            .map(item => item.post); 

        res.json(topPosts); 
    } catch (error) {
        console.error('Error fetching top posts with most comments:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
