import Layout from '@/components/layout';
import Sidebar from '@/components/sidebar';
import { useSession } from '@/libs/session';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    const [showSidebar, setShowsidebar] = useState(true);
    const handleToggleSidebar = () => {
        setShowsidebar((prevState) => !prevState);
    };

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, viewport-fit=cover"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
            </Head>
            <div className="flex">
                <Sidebar links={[]} showSidebar={showSidebar} />
                <div className="flex-grow transition-all ease duration-150">
                    <Component
                        {...pageProps}
                        toggleSidebar={handleToggleSidebar}
                    />
                </div>
            </div>
        </>
    );
};

export default App;
