import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import WebAppStore from './store/store.ts';
import { App } from './App';
import {WebAppProvider} from "@vkruglikov/react-telegram-web-app";

const store = new WebAppStore();

interface State {
    store: WebAppStore;
}

export const Context = React.createContext<State>({ store });

const root = createRoot(document.getElementById('root')!);
root.render(
    <StrictMode>
        <WebAppProvider>
        <Context.Provider value={{ store }}>
            <PrimeReactProvider>
                <App />
            </PrimeReactProvider>
        </Context.Provider>
        </WebAppProvider>
    </StrictMode>
);
