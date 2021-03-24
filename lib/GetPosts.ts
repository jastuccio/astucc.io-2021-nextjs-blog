/****************************************************************
 *   This file gets your dev.to blog posts using SWR from Vercel
 *   https://github.com/vercel/swr
 ****************************************************************/

/******* dependencies I will probably need later
  import matter from 'gray-matter';
  import remark from 'remark';
  import html from 'remark-html';
********/

// Todo: fetch only posts that have a Canonical URL

const devtoPosts = () => {
  fetch('https://dev.to/api/articles?username=jastuccio')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

export default devtoPosts;
