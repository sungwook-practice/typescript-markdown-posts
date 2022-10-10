import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react'
import { getAllPostsIds, getSortedPostDataFromID } from '../../lib/posts';

const Post = ({ postData }: {
  PostData: {
    title: string
    date: string
    contentHtml: string
  }
}) => {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml }}></div>
      </article>
    </div>
  )
}

export default Post;

// 라우팅
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsIds();
  console.log(paths);
  // [{params: {id: 'example} }]
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const postData = await getSortedPostDataFromID(params.id as string);
  return {
    props: {
      postData
    }
  }
}