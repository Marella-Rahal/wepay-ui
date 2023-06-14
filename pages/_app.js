import Head from "next/head";
import "../styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

// 𝘀𝗲𝘁𝘁𝗶𝗻𝗴 𝘂𝗽 𝗿𝗲𝗱𝘂𝘅
import { Provider } from 'react-redux';
import { wrapper } from "../Redux/Store";

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

// 𝘀𝗲𝘁𝘁𝗶𝗻𝗴 𝘂𝗽 𝗿𝗲𝗱𝘂𝘅
function MyApp({ Component, ...rest }) {
  
  // 𝘀𝗲𝘁𝘁𝗶𝗻𝗴 𝘂𝗽 𝗿𝗲𝗱𝘂𝘅
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  const router = useRouter();

  return (
    <>
      <Head>
        <title>wepay</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Online Payment System"
        />
        <meta name="keywords" content="online-pay-payment-system-nextjs-reactjs-javascript-tailwind-mapboxgl" />
        <meta name="author" content="Marella Rahal" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#161616"/>
        <link rel="icon" href="logo.svg" />

        {/* 𝘀𝗲𝘁𝘁𝗶𝗻𝗴 𝘂𝗽 𝗰𝗮𝗶𝗿𝗼 𝗳𝗼𝗻𝘁 */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Cairo&display=swap" rel="stylesheet"/>

      </Head>

      {/* //todo for dark mode  */}
      <ThemeProvider attribute="class" enableSystem={false}>

        {/* //todo animation for the whole page */}
        <AnimatePresence mode="wait">

          <motion.div
            key={router.route}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >

            {/* 𝘀𝗲𝘁𝘁𝗶𝗻𝗴 𝘂𝗽 𝗿𝗲𝗱𝘂𝘅 */}
            <Provider store={store}>
              <Component {...pageProps} />
              <Analytics/>
            </Provider>

          </motion.div>
        </AnimatePresence>

      </ThemeProvider>

    </>
  );
}

export default MyApp;
