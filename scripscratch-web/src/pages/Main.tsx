import { Layout } from "../components/Layout";

export const Main = () => {
  console.log(import.meta.env.VITE_SERVER_ENDPOINT); // "123"
  return (
    <Layout>
      <p>hi</p>
    </Layout>
  );
};
