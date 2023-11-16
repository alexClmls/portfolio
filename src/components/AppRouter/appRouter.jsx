import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ProjectGallery from './components/ProjectGallery';
import ProjectDetail from './components/ProjectDetail';
import Contact from './components/Contact';

function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/projects" component={ProjectGallery} />
          <Route path="/project/:id" component={ProjectDetail} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;

