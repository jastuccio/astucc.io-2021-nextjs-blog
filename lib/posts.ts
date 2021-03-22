import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
//process.cwd() returns the "current working directory"

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}

/**********************************************************
 *
 *  https://dev.to/cvr/using-dev-to-as-a-cms-with-next-js
 *
 **********************************************************/
import { addSeconds, isAfter } from 'date-fns';

type Maybe<T> = T | null;

export interface Post {
  type_of: string;
  id: number;
  title: string;
  description: string;
  published: boolean;
  published_at: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  page_views_count: number;
  published_timestamp: string;
  body_markdown: string;
  cover_image: Maybe<string>;
  positive_reactions_count: number;
  readable_publish_date: string;
  social_image: string;
  tag_list: string[];
  canonical_url: string;
  created_at: string;
  edited_at: Maybe<string>;
  crossposted_at: Maybe<string>;
  last_comment_at: string;
  content: string;
  matter: { data: Record<string, any>; content: string };
  read_estimate: string;
}

let cachePath = path.join(process.cwd(), 'cache');
let cacheValuePath = path.join(cachePath, 'value');
let cacheTtlPath = path.join(cachePath, 'ttl');

let cache = {
  set: (value: any) => {
    if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath);
    let revalidate = addSeconds(new Date(), 1).getTime();
    fs.writeFileSync(cacheValuePath, JSON.stringify(value));
    fs.writeFileSync(cacheTtlPath, JSON.stringify(revalidate));
  },
  get: <T>(): T | null => {
    if (!fs.existsSync(cacheValuePath) || !fs.existsSync(cacheTtlPath)) {
      return null;
    }
    let ttl = JSON.parse(fs.readFileSync(cacheTtlPath).toString());
    let now = Date.now();
    let shouldRevalidate = isAfter(now, ttl);
    return shouldRevalidate
      ? null
      : JSON.parse(fs.readFileSync(cacheValuePath).toString());
  },
};

let stripWhitespace = (string: string) => {
  return string.replace(/^\s+/, '').replace(/\s+$/, '');
};

// let wordCount = (string: string) => {
//   let pattern = '\\w+';
//   let reg = new RegExp(pattern, 'g');
//   return (string.match(reg) || []).length;
// };

// let humanReadableTime = (time: number) => {
//   if (time < 0.5) {
//     return 'less than a minute';
//   }
//   return `${Math.ceil(time)} minute`;
// };

// let getReadEstimate = (content: string) => {
//   let avergageWordsPerMinute = 225;
//   content = stripWhitespace(content);
//   let minutes = wordCount(content) / avergageWordsPerMinute;
//   return humanReadableTime(minutes);
// };

let normalizePost = (post: Post): Post => {
  let { data, content } = matter(post.body_markdown);
  return {
    ...post,
    // remove the last bit (its a 4 digit identifier, not needed here)
    slug: post.slug.split('-').slice(0, -1).join('-'),
    matter: { data, content },
    // read_estimate: getReadEstimate(post.body_markdown),
  };
};

let fetchArticle = async (page: number) =>
  fetch(`https://dev.to/api/articles/me/published?page=${page}&per_page=100`, {
    headers: {
      'api-key': process.env.DEVTO_TOKEN as string,
    },
  });

let fetchAllArticles = async (page = 1, results = []): Promise<Post[]> => {
  let latestResults = await fetchArticle(page)
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .catch((err) => {
      throw new Error(`error fetching page ${page}, ${err}`);
    });

  if (latestResults.length === 100)
    return fetchAllArticles(page + 1, results.concat(latestResults));

  return results.concat(latestResults);
};

let sleep = (ms: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export let query = async () => {
  await sleep(1000);
  // we cache the response
  // otherwise we'll hit the 429 error "Too many requests" during build times
  let cached = cache.get<Post[]>();
  if (cached) return cached;
  let posts = (await fetchAllArticles()).map(normalizePost);
  cache.set(posts);
  // console.log(posts);
  return posts;
};
