import Head from "next/head";
import Login from "../../components/Login";

const LoginPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>صفحه ورود</title>
        <meta name="description" content="صفحه ورود به لیست مقالات" />
        <meta name="keywords" content="پنل ,ورود,پست,مقاله,صنعت,تولید" />
        <link rel="canonical" href="https://yourwebsite.com/posts" />
      </Head>
      <div className="flex justify-center items-center h-[100vh]">
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
