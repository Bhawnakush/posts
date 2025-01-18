import React from 'react';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

// Generate paths for all posts
export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'posts', // Ensure this matches your Contentful content type ID
  });

  const paths = res.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: false, // Adjust fallback as per your requirements
  };
};

// Fetch data for a single post
export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'posts', // Ensure this matches your Contentful content type ID
    'fields.slug': params.slug,
  });

  if (!items.length) {
    return {
      notFound: true, // Handle case where the post is not found
    };
  }

  return {
    props: { post: items[0] },
    revalidate:1
  };
};

// Post Component
function Post({ post }) {
  const { title, description, detailedDescription, authorName, date } = post.fields;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Title */}
        <h1 style={styles.title}>{title}</h1>

        {/* Description */}
        {description && (
          <div style={styles.description}>
            {documentToReactComponents(description)}
          </div>
        )}

        {/* Detailed Description */}
        {detailedDescription && (
          <div style={styles.detailedDescription}>
            {documentToReactComponents(detailedDescription)}
          </div>
        )}

        {/* Author Info */}
        <div style={styles.authorSection}>
          <p style={styles.authorName}>By: {authorName}</p>
          <p style={styles.date}>{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

// Inline styles for improved layout
const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Full viewport height
    backgroundColor: '#f9f9f9', // Subtle background color for contrast
    padding: '20px', // Padding to ensure content doesn't touch screen edges
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center', // Center-align text
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333',
  },
  description: {
    marginBottom: '20px',
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#555',
    textAlign: 'justify',
  },
  detailedDescription: {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginTop: '20px',
    color: '#555',
    textAlign: 'justify',
  },
  authorSection: {
    marginTop: '30px',
    fontSize: '0.9rem',
    color: '#666',
  },
  authorName: {
    fontWeight: 'bold',
  },
  date: {
    fontStyle: 'italic',
  },
};

export default Post;
