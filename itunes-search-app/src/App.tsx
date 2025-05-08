import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import SearchPage from './pages/index';
import DetailsPage from './pages/details';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={SearchPage} />
          <Route path="/details/:id" component={DetailsPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;