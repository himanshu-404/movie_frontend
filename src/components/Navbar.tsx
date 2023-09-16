import React from "react";
import { Link } from "react-router-dom";
import style from "./css/navbar.module.css";
import { useAppSelector } from "../store/hooks";

const Navbar = () => {
  const { data, loading } = useAppSelector((state) => state.watchList);

  return (
    <div className={style.navbar}>
      <span className={style.logo}>MOVIES</span>
      <div>
        <Link className={style.navlink} to="/">
          Home
        </Link>
        <Link className={style.navlink} to="/watchlist">
          <span className={style.cartCount}>Watch list: {data?.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
