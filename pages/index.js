import Head from "next/head";
import Layout from "../components/layout";
import data from "../data/data.json";

export default function Home() {
  const { name } = data;
  return (
    <>
      <Layout>
        <Head>
          <title>{name}</title>
        </Head>
      </Layout>
    </>
  );
}
