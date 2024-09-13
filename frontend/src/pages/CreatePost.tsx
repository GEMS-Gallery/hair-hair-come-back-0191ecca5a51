import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';
import { Typography, TextField, Button, Box, CircularProgress } from '@mui/material';

interface FormData {
  title: string;
  content: string;
}

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await backend.createPost(data.title, data.content);
      if ('ok' in result) {
        navigate('/');
      } else {
        console.error('Error creating post:', result.err);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Post
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: 'Title is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{ required: 'Content is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Content"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;
