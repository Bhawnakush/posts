import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function PostCard({ post }) {
  const { title, slug, thumbnail, description, authorName, profilepicture, date } = post.fields;

  return (
    <div style={styles.card}>
      {/* Thumbnail */}
      {thumbnail?.fields?.file?.url && (
        <div style={styles.thumbnail}>
          <Image
            src={`https:${thumbnail.fields.file.url}`}
            alt={title}
            width={800}
            height={400}
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
      )}

      {/* Title */}
      <h2 style={styles.title}>{title}</h2>

      {/* Description */}
      {description && (
        <div style={styles.description}>
          {documentToReactComponents(description)}
        </div>
      )}

      {/* Author and Profile */}
      <div style={styles.authorSection}>
        {profilepicture?.fields?.file?.url && (
          <Image
            src={`https:${profilepicture.fields.file.url}`}
            alt={authorName}
            width={40}
            height={40}
            style={{ borderRadius: '50%' }}
          />
        )}
        <p style={styles.authorName}>By {authorName}</p>
        <p style={styles.date}>{new Date(date).toLocaleDateString()}</p>
      </div>

      {/* Read More Link */}
      <div style={styles.readMore}>
        <Link href={`/posts/${slug}`} legacyBehavior>
          <a style={styles.link}>Read More →</a>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    maxWidth: '800px',
    margin: 'auto',
  },
  thumbnail: {
    marginBottom: '16px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '16px 0',
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '16px',
  },
  authorSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '16px',
    fontSize: '0.9rem',
    color: '#666',
  },
  authorName: {
    marginLeft: '8px',
    fontWeight: '500',
  },
  date: {
    marginLeft: 'auto',
    fontStyle: 'italic',
  },
  readMore: {
    marginTop: '16px',
    textAlign: 'right',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
