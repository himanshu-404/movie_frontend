import React from "react";
import { Link } from "react-router-dom";
import style from "./navbar.module.css";

const Navbar = () => {
  // const items = useSelector((state) => state.cart);
  return (
    <div className={style.navbar}>
      <span className={style.logo}>MOVIES</span>
      <div>
        <Link className={style.navlink} to="/">
          Home
        </Link>
        <Link className={style.navlink} to="/watchlist">
          <span className={style.cartCount}>Watch list: {5}</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
