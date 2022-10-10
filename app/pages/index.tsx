import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getSortedPostDataFromMarkDown } from '../lib/posts'
import styles from '../styles/Home.module.css'

const Home = ({allPostData}: {
  allPostData: {
    fileId: string
    date: string
    title: string
  }[]
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section>
          <p>Hello world</p>
          <p>This is sample page</p>
        </section>
        <ul>
          {allPostData.map(({fileId, title, date}) =>
            <li key={fileId}>
              <Link href={`/posts/${fileId}`}>
                <a>{title}(클릭)</a>
              </Link>
              <br />
              <small>
                날짜: {date}
              </small>
            </li>
          )}
        </ul>
      </main>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostData = getSortedPostDataFromMarkDown();
  return {
    props: {
      allPostData
    }
  }
}
