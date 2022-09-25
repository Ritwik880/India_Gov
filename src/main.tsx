import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./redux/store";

const initialState = {
  isLoggedIn: false
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true
      };
    case "LOGOUT":
      return {
        isLoggedIn: false
      };
    default:
      return state;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </React.StrictMode>
  </Router>
)
