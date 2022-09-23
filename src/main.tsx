import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./redux/store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </React.StrictMode>
  </Router>
)
