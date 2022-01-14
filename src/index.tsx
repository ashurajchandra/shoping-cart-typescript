import React from 'react';
import ReactDOM from 'react-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './index.css';
import App from './App';

 // Create a client
 const queryClient = new QueryClient()
ReactDOM.render(
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

