import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { backend } from 'declarations/backend';
import { Typography, Card, CardContent, CardActions, Button, Box, CircularProgress } from '@mui/material';
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

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    if (!id) return;
    try {
      const result = await backend.getPost(BigInt(id));
      if (result) {
        setPost(result);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  const handleVote = async (isUpvote: boolean) => {
    if (!post) return;
    try {
      if (isUpvote) {
        await backend.upvotePost(post.id);
      } else {
        await backend.downvotePost(post.id);
      }
      fetchPost();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Posted on: {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            startIcon={<ThumbUpIcon />}
            onClick={() => handleVote(true)}
          >
            {post.upvotes.toString()}
          </Button>
          <Button
            size="small"
            startIcon={<ThumbDownIcon />}
            onClick={() => handleVote(false)}
          >
            {post.downvotes.toString()}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PostDetail;
