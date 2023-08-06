import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './Components/Layout/Layout.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './util/Store.js'
import { Auth0Provider } from '@auth0/auth0-react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain='dev-ufm6tojq6qdv6h3f.us.auth0.com'
  clientId='Ik4mws2zOGNJK1odGX1vYQUwJ6xXYgyw'
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
  >
  <Provider store={store}>
  <React.StrictMode>
  <BrowserRouter>
  <Layout>
    <App />
    </Layout>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
  </Auth0Provider>,
)
