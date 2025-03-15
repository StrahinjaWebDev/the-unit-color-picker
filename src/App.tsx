import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router } from 'react-router-dom';
import ColorList from './presentation/pages/ColorManagement.tsx';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ColorList />
      </Router>
    </Provider>
  );
};

export default App;
