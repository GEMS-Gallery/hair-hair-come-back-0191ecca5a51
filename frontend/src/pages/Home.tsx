import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { backend } from 'declarations/backend';
import { Typography, Card, CardContent, CardActions, Button, Grid, CircularProgress } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface Post {
  id: bigint;
  title: string;
  content: string;
  upvotes: bigint;
  downvotes: bigint;
  timestamp: bigint;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const result = await backend.getPosts();
      setPosts(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleVote = async (id: bigint, isUpvote: boolean) => {
    try {
      if (isUpvote) {
        await backend.upvotePost(id);
      } else {
        await backend.downvotePost(id);
      }
      fetchPosts();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id.toString()}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.content.substring(0, 100)}...
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<ThumbUpIcon />}
                onClick={() => handleVote(post.id, true)}
              >
                {post.upvotes.toString()}
              </Button>
              <Button
                size="small"
                startIcon={<ThumbDownIcon />}
                onClick={() => handleVote(post.id, false)}
              >
                {post.downvotes.toString()}
              </Button>
              <Button size="small" component={RouterLink} to={`/post/${post.id}`}>
                Read More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
