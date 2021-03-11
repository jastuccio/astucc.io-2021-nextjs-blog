import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'

export default function Now() {
return (
<Layout home>
<Head>
<title>{siteTitle} - Now </title>
</Head>

<ul>
  <li>intrigued by 
  <a href="">TypeScript</a> and 
  <a href=""></a>Next.js</a></li>
<li>
Co organizer of [JAMstack Boston](https://www.meetup.com/JAMstack-Boston/members/?op=leaders)</li>
<li>Father to a basketball crazed middle schooler 🏀 ❤️ 😁</li>
</ul>

<p>
inspired by Derek Sivers and
 <a href="https://nownownow.com/about"> the Now page movement</a>
</p>
</)
}
