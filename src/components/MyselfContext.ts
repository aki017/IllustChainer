import { createContext } from "react";
import { Player } from "../definitions";

const MyselfContext = createContext<[Player, (p: Player) => void]>([
  {
    icon: -1,
    name: "",
    ready: false,
  },
  () => {},
]);

export default MyselfContext;
