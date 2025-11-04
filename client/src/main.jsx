import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { getImages } from './redux/slices/imagesSlice'
import App from './App'          
import './index.css'
//dispatch לפני createRoot
store.dispatch(getImages({ 
  category: 'nature', 
  page: 1,
  sortBy: 'latest' 
})).then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
});