import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GiftSvg from "../assets/giftSvg";
import UserService from "./redux/services/Userservice";

function WidgetButton() {
  const dispatch = useDispatch();
  const shopInfo = useSelector((state) => state.usersData);
  // console.log(shopInfo.colors)
  let appposition = shopInfo.widgetposition;
  let classposition = "";
  if (appposition == "left") {
    classposition = "widgets_position_left";
  } else {
    classposition = "widgets_position_right";
  }
  return (
    <div>
      <button
        className={`${classposition} wigets_btn`}
        id="app_btn"
        style={{
          backgroundColor: shopInfo.primaryColor,
          color: shopInfo.secondaryColor,
        }}
      >
        <div className="widget_button_icon">
          <GiftSvg iconcolor={shopInfo.secondaryColor}></GiftSvg>
        </div>
        <span className="reward_text">{shopInfo.widgetbutttontext}</span>
      </button>
    </div>
  );
}

export default WidgetButton;
