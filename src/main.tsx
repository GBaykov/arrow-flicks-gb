import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM, { createRoot } from 'react-dom/client';
import { HistoryRouter } from 'redux-first-history/rr6';

import '@mantine/core/styles.css';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { AppMantineTheme } from './mantine.theme.ts';
import { routes } from './routes/routes.tsx';
import { history, store } from '@redux/configure-store.ts';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <MantineProvider theme={AppMantineTheme}>
                <HistoryRouter history={history}>{routes}</HistoryRouter>
            </MantineProvider>
        </Provider>
    </React.StrictMode>,
);
