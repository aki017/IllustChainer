import { useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import React from "react";

const TransitionRouter = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={3000}>
        <div></div>
      </CSSTransition>
    </TransitionGroup>
  );
};
export default TransitionRouter;
