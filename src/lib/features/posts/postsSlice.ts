import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define types
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  currentPost: null,
};

// Async thunk to fetch all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      return data as Post[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to fetch a single post
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      return data as Post;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to create a post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData: Omit<Post, "id">, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const data = await response.json();
      return data as Post;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData: Post, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      const data = await response.json();
      return data as Post;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      return postId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch single post
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.loading = false;
          state.currentPost = action.payload;
        }
      )
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create post
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update post
    builder
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete post
    builder
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
