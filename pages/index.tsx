import BaseLayout from 'components/common/BaseLayout';
import { CustomImage } from 'components/common/styled-common-components';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import styles from '../styles/Home.module.css';
import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
   return (
      <div className={styles.container}>
         <main className={styles.main}>
            <h1 className={styles.title}>
               <p>상단의 Get Started를 눌러주세요.</p>
            </h1>

            <p className={styles.description}>
               Get started by editing <code className={styles.code}>pages/index.tsx</code>
            </p>

            <div className={styles.grid}>
               <a href="https://nextjs.org/docs" className={styles.card}>
                  <h2>Documentation &rarr;</h2>
                  <p>Find in-depth information about Next.js features and API.</p>
               </a>

               <a href="https://nextjs.org/learn" className={styles.card}>
                  <h2>Learn &rarr;</h2>
                  <p>Learn about Next.js in an interactive course with quizzes!</p>
               </a>

               <a
                  href="https://github.com/vercel/next.js/tree/canary/examples"
                  className={styles.card}
               >
                  <h2>Examples &rarr;</h2>
                  <p>Discover and deploy boilerplate example Next.js projects.</p>
               </a>

               <a
                  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                  className={styles.card}
               >
                  <h2>Deploy &rarr;</h2>
                  <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
               </a>
            </div>
         </main>

         <footer className={styles.footer}>
            <a
               href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
               target="_blank"
               rel="noopener noreferrer"
            >
               Powered by{' '}
               <span className={styles.logo}>
                  <CustomImage src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
               </span>
            </a>
         </footer>
      </div>
   );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
   return <BaseLayout title={'HOME'}>{page}</BaseLayout>;
};
