import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Main from './components/Main/Main';

function App() {
  return (
    <Router>
      <div className="App">
        <Main path="/" component={Main} />
      </div>
    </Router>
  );
}

export default App;
