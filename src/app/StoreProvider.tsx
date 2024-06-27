'use client';

import { store } from '@/redux/configure-store';
// import { AppStore, makeStore } from '@/redux/configure-store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    // const storeRef = useRef<AppStore>();
    // if (!storeRef.current) {
    //     storeRef.current = makeStore();
    // }

    // const persistor = persistStore(storeRef.current);

    return (
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
                {children}
            {/* </PersistGate> */}
        </Provider>
    );
}
