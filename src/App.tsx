import { Provider } from 'react-redux';
import { store } from './app/store/store.ts';
import { BrowserRouter as Router } from 'react-router-dom';
import ColorList from './presentation/pages/ColorManagement.tsx';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ColorList />
        <Toaster />
      </Router>
    </Provider>
  );
};

export default App;
