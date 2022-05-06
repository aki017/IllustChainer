import React from "react";

import styles from "./layout.module.scss";
import { Link } from "react-router-dom";

const Header = () => (
  <div className={styles.header}>
    <Link to="/">Pict Relay</Link>
  </div>
);

export default Header;
