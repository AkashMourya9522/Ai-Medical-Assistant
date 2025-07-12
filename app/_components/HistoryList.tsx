"use client";
import React, { useState } from "react";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);
  return (
    <div>
      {historyList.length > 0 ? (
        <div>you have history</div>
      ) : (
        <div>You dont have history now</div>
      )}
    </div>
  );
};

export default HistoryList;
