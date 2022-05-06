import React from "react";
import { useParams } from "react-router-dom";
import DrawPage from "./draw_page";
import AnswerPage from "./answer_page";
const Game = () => {
  const { page } = useParams();
  return +(page || "") % 2 ? <DrawPage /> : <AnswerPage />;
};
export default Game;
