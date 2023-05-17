import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFetchUserPosts, createPost } from '../api';

export default function UserPosts() {
  const router = useRouter();
  const { id } = router.query;

  const { posts, isLoading, isError } = useFetchUserPosts(id);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  const handleInputChange = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(id, newPost);
      router.replace(router.asPath);
      setNewPost({ title: '', body: '' });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <div>
      <h1>User {id} Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}

      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input className='text-black' type="text" id="title" name="title" value={newPost.title} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea className='text-black' id="body" name="body" value={newPost.body} onChange={handleInputChange} />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}


// import { useRouter } from 'next/router';
// import { getUserPosts } from '../api';

// export default function UserPosts() {
//   const router = useRouter();
//   const { id } = router.query;

//   const { posts, isLoading, isError } = getUserPosts(id);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error loading posts</div>;
//   }

//   return (
//     <div>
//       <h1>User {id} Posts</h1>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.body}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
