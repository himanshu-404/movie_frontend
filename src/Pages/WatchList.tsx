import React, { useEffect } from "react";
import { fetchWatchList } from "../Actions/watchList";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const WatchList = () => {
  const dispach = useAppDispatch();

  const data = useAppSelector((state) => state.watchList);
  console.log("🚀 ~ data:", data);

  useEffect(() => {
    dispach(fetchWatchList());
  }, []);

  return <div>{}</div>;
};

export default WatchList;
