import { Provider } from 'react-redux';
import { store } from './app/store';
import ColorList from './presentation/pages/ColorList';

const App = () => {
  return (
    <Provider store={store}>
      <ColorList />
    </Provider>
  );
};

export default App;
