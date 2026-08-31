// App.js
// Purpose: Root component of the Netflix GPT application.
// Connects Redux store with the React application and renders the Body component.

import './App.css';
import { Provider } from 'react-redux';
import Body from './components/Body';
import appStore from './utils/appStore';

// App component:
// Acts as the root component of the application.
// Provides the Redux store to all child components using Provider.
function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;