/****************************************************************
 *     This page creates a list of blog posts with Links to
 *     individual blog posts
 ****************************************************************/

import Head from 'next/head';
import { siteTitle } from '../components/Layout';
import Link from 'next/link';

import useSWR from 'swr';

function Blog() {
  const url = 'https://dev.to/api/articles?username=jastuccio';
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data);

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
      {data.map((post) => (
        // Todo: remove last 4 characters from path
        // Todo: order posts based on most recent update
        <ol>
          <li key={post.slug}>
            <Link as={`/blog/${post.slug}`} href="/blog/[slug]">
              <a>{post.title}</a>
            </Link>
          </li>
        </ol>
      ))}
      ;
    </>
  );
}

export default Blog;
