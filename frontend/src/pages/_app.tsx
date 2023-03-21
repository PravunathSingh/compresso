import type { AppProps } from 'next/app';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import color from 'color';
import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';

export const emotionCache = createEmotionCache({
  key: 'mantine',
  prepend: false,
});

const PRIMARY_COLOR = '#3E8FFB';
const primaryColor = color(PRIMARY_COLOR);

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retryDelay: 1000, refetchOnWindowFocus: false },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          emotionCache={emotionCache}
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
            colors: {
              primary: [
                primaryColor.lighten(0.9).hex(), // 0
                primaryColor.lighten(0.8).hex(), // 1
                primaryColor.lighten(0.7).hex(), // 2
                primaryColor.lighten(0.5).hex(), // 3
                primaryColor.lighten(0.3).hex(), // 4
                primaryColor.lighten(0.1).hex(), // 5
                PRIMARY_COLOR, // 6
                primaryColor.darken(0.2).hex(), // 7
                primaryColor.darken(0.3).hex(), // 8
                primaryColor.darken(0.4).hex(), // 9
              ],
            },
            primaryColor: 'primary',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <ModalsProvider>
            <NotificationsProvider position='bottom-right' zIndex={2077}>
              <Component {...pageProps} />
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
