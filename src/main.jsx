import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './Components/Layout/Layout.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './util/Store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
  <React.StrictMode>
  <BrowserRouter>
  <Layout>
    <App />
    </Layout>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
 ,
)
