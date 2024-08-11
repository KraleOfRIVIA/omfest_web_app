import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';


import WebAppStore from "./store/store.ts";
import {App} from './App';
const store = new WebAppStore();

interface State{
  store: WebAppStore
}
export const Context = React.createContext<State>({store})

createRoot(document.getElementById('root')!).render(
    <Context.Provider value={{store}}>
      <StrictMode>
          <PrimeReactProvider>
              <App/>
          </PrimeReactProvider>
      </StrictMode>
    </Context.Provider>
)
