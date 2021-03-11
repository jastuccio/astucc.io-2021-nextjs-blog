import Head from 'next/head'
import { siteTitle } from '../components/Layout'
import Link from 'next/link'

export default function Now() {
return (
<>
<Head>
  <title>{siteTitle} - Now </title>
</Head>
<h1>Now - my current projects and interests</h1>
<ul>
  <li>Intrigued by TypeScript and Next.js</li>
  <li>Co organizer of <a href="https://www.meetup.com/JAMstack-Boston/members">JAMstack Boston</a></li>
  <li>Father to a basketball crazed middle schooler 🏀 ❤️ 😁</li>
</ul>

<p>
inspired by Derek Sivers and
 <a href="https://nownownow.com/about"> the Now page movement</a>
</p>
</>
)
}
