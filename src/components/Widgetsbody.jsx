import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "./redux/services/Userservice";
import Reward from "./Reward";
import Track from "./Track";
import WidgetsFaq from "./WidgetsFaq";

function Widgetsbody() {
  const dispatch = useDispatch();
  const shopInfo = useSelector((state) => state.usersData);
  return (
    <div>
      <div className="wigets_body">
        <div className="spinner-border" role="status" id="app_spinner">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="container">
          <div className="section_inner">
            <div id="app_index_body">
              {shopInfo.faqpage != false ? <WidgetsFaq /> : ""}
              {shopInfo.reward != false ? <Reward /> : ""}
              {shopInfo.track != false ? <Track /> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Widgetsbody;
