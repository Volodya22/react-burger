import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import './styles.css';
import { createStore } from './services/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const store = createStore();

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
