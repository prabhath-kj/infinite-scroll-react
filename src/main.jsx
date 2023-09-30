import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ErrorBoundary} from 'react-error-boundary';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <App /></ErrorBoundary>
   
)
