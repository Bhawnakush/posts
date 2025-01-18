import React from 'react'
import { createClient } from 'contentful'
import PostCard from '@/components/posts/PostCard'
//import { client } from '@/lib/contentful/client'  // If you're using this client elsewhere, otherwise it's redundant here

// Correcting getStaticProps to fetch data correctly
export async function getStaticProps() {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  // Fetching entries of type 'post' (ensure 'post' is your content type)
  const res = await client.getEntries({
    content_type: 'posts'  // Replace 'post' with your actual content type if different
  })

  return {
    props: {
      posts: res.items,  // Pass the fetched posts to the component
    
    revalidate:1
    }
  }
}



const Index = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.sys.id} post={post} /> // Use a unique key
      ))}
    </div>
  );
};




export default Index
