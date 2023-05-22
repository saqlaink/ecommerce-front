import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { CartContextProvider } from '@/components/CartContext';
import styled, { createGlobalStyle } from 'styled-components';
import { SessionProvider } from 'next-auth/react';
// import Spinner from '@/components/Spinner';
// import NextNProgress from 'nextjs-progressbar';
const NextNProgress = dynamic(() => import('nextjs-progressbar'));
const Spinner = dynamic(() => import('@/components/Spinner'));

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  hr{
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
  }
`;
const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Load>
          <Spinner fullWidth={true} />
        </Load>
      ) : (
        <>
          <GlobalStyles />
          <SessionProvider session={session}>
            <CartContextProvider>
              <NextNProgress
                color="linear-gradient(90deg, #b656cb, #10a1a0)"
                startPosition={0.3}
                stopDelayMs={200}
                height={5}
                showOnShallow={true}
              />
              <Component {...pageProps} />
            </CartContextProvider>
          </SessionProvider>
        </>
      )}
    </>
  );
}
