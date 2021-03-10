import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const name = 'Joe Astuccio'
export const siteTitle = 'astucc.io - my personal blog'

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="Joe Astuccio"
          content="My blog built using Next.js"
        />
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
            {/* <Image
              priority
              // src="/images/profile.jpg"
              // src={myCloudinaryResponse.public_id} width="150" height="150"
              src="/joe/joe-camp-cooking-sq-crop.jpg"
              height={144}
              width={144}
              alt={name}
            /> */}
            <h1>{name}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}
