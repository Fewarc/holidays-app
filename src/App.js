import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
import CountryHolidays from './components/CountryHolidays/CountryHoliday.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Main path="/" exact component={Main} />
          <CountryHolidays path="/calendar"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
