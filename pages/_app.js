import "@/styles/globals.css";
import Layout from "@/components/layouts/Index";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
