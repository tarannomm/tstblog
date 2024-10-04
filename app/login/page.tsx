import Head from "next/head";
import Login from "../../components/Login";
const LoginPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>صفحه ورود</title>
        <meta
          name="description"
          content="صفحه ورود به لیست مقالات"
        />
        <meta
          name="keywords"
          content="پنل, ورود, پست, مقاله, صنعت, تولید"
        />
        <link rel="canonical" href="https://yourwebsite.com/login" />
      </Head>
      <div className="flex justify-center items-center h-screen">
      <Login/>
    </div>
    </>
  );
};

export default LoginPage;
