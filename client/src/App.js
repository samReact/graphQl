import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ItemDetail from './components/ItemDetail';
import Home from './components/Home';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/items/:id"
        render={({
          match: {
            params: { id },
          },
        }) => <ItemDetail id={id} />}
      />
    </Switch>
  </div>
);

export default App;
