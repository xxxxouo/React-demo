import React from 'react'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async';
import LanguageProvider from './contexts/localization/Provider';
import store from './state'

export default function Providers({children}) {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <LanguageProvider>
            {children}
        </LanguageProvider>
      </HelmetProvider>
    </Provider>
  )
}
