import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import './index.css'

// If you need polyfills for older browsers, you can import core-js here
// import 'core-js'

const root = document.getElementById('root')
createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
)