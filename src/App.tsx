import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Top from "./components/top_page";
import Room from "./components/room";
import ErrorPage from "./components/error_page";
import Chat from "./components/chat";
import styles from "./App.module.scss";
import Header from "./components/layout/header";
import MyselfContext from "./components/MyselfContext";
import Game from "./components/game";
import TransitionRouter from "./transition_router";

function App() {
  const [myself, setMyself] = useState({ icon: -1, name: "", ready: false });
  return (
    <div className={styles.App}>
      <Router>
        <MyselfContext.Provider value={[myself, setMyself]}>
          <header className={styles.header}>
            <Header />
          </header>
          <div className={styles.content}>
            <TransitionRouter />
            <Switch>
              <Route path="/" exact component={Top} />
              <Route path="/chat" component={Chat} />
              <Route path="/rooms/:id/:page" component={Game} />
              <Route path="/rooms/:id" component={Room} />
              <Route exact component={ErrorPage} />
            </Switch>
          </div>
        </MyselfContext.Provider>
      </Router>
    </div>
  );
}

export default hot(App);
