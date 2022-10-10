import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className='headingMd'>
          <p>Hello World</p>
        </section>
        <section className='headingMd'>
          This is Sample Page!
        </section>
      </main>

      <style jsx>{`
        .headingMd {
          font-size: 1.2rem;
          line-height: 1.5;
        }
      `}
      </style>

    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

}