import Head from 'next/head';
import { siteTitle } from '../components/Layout';

// copied code
import Link from 'next/link';

import { postsApi } from '../lib/index';

// import { VerticalSpacer } from '@components/index';
// import { BlogLayout } from '@layouts/index';
// import styles from './blog.module.css';

interface BlogProps {
  posts: postsApi.Post[];
}

function Blog({ posts }: BlogProps) {
  return (
    <>
      <Head>
        <title>tech blog+ - {siteTitle} - </title>
      </Head>
      <h1>This blog is a poem to myself... it helps me to code</h1>
      <p>
        I write about Next.js, TypeScript, coding tips, camping, kayaking, and
        other adventures. Most of the tech posts appear on 
        <a href="https://dev.to/jastuccio">dev.to/jastuccio.</a>
      </p>
      {/* <VerticalSpacer /> */}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link as={`/blog/${post.slug}`} href="/blog/[slug]">
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Blog;

export async function getStaticProps() {
  let posts = await postsApi.query();
  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}

/******************************************************************
 *
 * original code
 *
 ******************************************************************
export default function Blog(
  {
    //   postData,
    // }: {
    //   postData: {
    //     title: string;
    //     date: string;
    //     contentHtml: string;
    //   };
  }
) {
  return (
    <>
      <Head>
        <title>{siteTitle} - tech blog +</title>
      </Head>
      <h2>This blog is a poem to myself... it helps me to code</h2>
      <p>
        This blog is about Next.js, TypeScript, coding tips, camping, kayaking,
        and other adventures. Most of the tech posts appear on 
        <a href="https://dev.to/jastuccio">dev.to/jastuccio.</a>
      </p>
    </>
  );
}

*/
