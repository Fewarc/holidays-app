import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
import CountryHolidays from './components/CountryHolidays/CountryHoliday.js';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/calendar/:alpha2" component={CountryHolidays}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
