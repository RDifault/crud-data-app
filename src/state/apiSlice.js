import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Fetch Posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

//Create Post
export const createPost = createAsyncThunk(
  "example/createPost",
  async (newPost) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
    return response.data;
  }
);

//Update Post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
      updatedPost
    );
    return response.data;
  }
);

//Delete Post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

const apiSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //Create Post
        .addCase(createPost.pending, (state) => {
          state.status = "posting";
        })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "success-posting";
        state.posts.push(action.payload);
        console.log("done", state.status);
      })
        .addCase(createPost.rejected, (state, action) => {
          state.status = "failed-posting";
          state.error = action.error.message;
        })
      //Update Post
      .addCase(updatePost.pending, (state) => {
        state.status = "updating";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "success-updating";
        state.posts = state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed-updating";
        state.error = action.error.message;
      })
      //Delete Post
      .addCase(deletePost.pending, (state) => {
        state.status = "deleting";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "success-deleting";
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed-deleting";
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
