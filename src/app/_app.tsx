import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import '@mantine/core/styles.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider withGlobalClasses>
            <Component {...pageProps} />
        </MantineProvider>
    );
}
