import CreateFlight from './components/CreateFlight';
import SearchFlights from './components/SearchFlights';
import Flight from './components/Flight';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import AllFlights from "./components/AllFlights";
import SearchResults from './components/SearchResults';

function App() {
  return (

    <Router>
        <div>
          <Route exact path='/' component={SearchFlights} />
          <Route exact path='/flight' component={Flight} />
          <Route exact path='/all_flights' component={AllFlights} />
          <Route exact path='/create_flight' component={CreateFlight} />
          <Route exact path='/search_flights' component={SearchFlights} />
          <Route exact path='/search_results' component={SearchResults} />

        </div>
      </Router> 
  );

}

export default App;