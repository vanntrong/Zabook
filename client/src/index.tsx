import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import History from 'utils/history';
import App from './App';
import { store } from './store/store';

//https://stackoverflow.com/questions/68399876/how-to-navigate-outside-of-react-component-using-react-router-6/70002872#70002872
const NavigateSetter = () => {
  History.navigate = useNavigate();

  return null;
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <NavigateSetter />
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
