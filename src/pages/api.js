import axios from 'axios';
import useSWR from 'swr';

export const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const useFetchUsers = () => {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useFetchUserPosts = (userId) => {
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCreatePost = async (userId, post) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      userId,
      ...post,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create post');
  }
};



// import useSWR from 'swr';

// export const fetcher = async (url) => {
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// };

// export const getUsers = () => {
//   const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher);

//   return {
//     users: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

// export const getUserPosts = (userId) => {
//   const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, fetcher);

//   return {
//     posts: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };
