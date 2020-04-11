import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Top from "./components/top_page";
import Canvas from "./components/pict_canvas";
import ErrorPage from "./components/error_page";
import Chat from "./components/chat";
import styles from "./App.module.scss";

function App() {
  return (
    <React.StrictMode>
      <div className={styles.App}>
        <Router>
          <header className={styles.header}>
            <Link to="/">お絵描き</Link>
          </header>

          <div>
            <Switch>
              <Route path="/" exact component={Top} />
              <Route path="/chat" component={Chat} />
              <Route path="/rooms/:id" component={Canvas} />
              <Route exact component={ErrorPage} />
            </Switch>
          </div>
        </Router>
      </div>
    </React.StrictMode>
  );
}

export default hot(App);
