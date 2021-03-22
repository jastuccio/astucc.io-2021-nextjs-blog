import Head from 'next/head';
import { siteTitle } from '../components/Layout';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../lib/date';
import { GetStaticProps } from 'next';

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>
          Web Developer, Sailor, Stargazer, Hockey Player, and all around fun
          guy... but my absolute favorite thing is being a dad.
        </p>
      </section>
      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/blog/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
