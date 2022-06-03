import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "./redux/services/Userservice";
import Whatsappsvg from "../assets/WhatappSvg";
import GiftSvg from "../assets/giftSvg";
import TruckScg from "../assets/TruckScg";
import HelpSvg from "../assets/helpSvg";

function Widgetfooter() {
  const dispatch = useDispatch();
  const shopInfo = useSelector((state) => state.usersData);

  const onrewardbuttonclick = () => {
    if (shopInfo.track == true || shopInfo.faqpage == true) {
      const reward = "reward";
      const track = "track";
      const rewardvalue = true;
      const trackvalue = false;
      UserService.Component_hide_show(dispatch, reward, rewardvalue);
      UserService.Component_hide_show(dispatch, track, trackvalue);
      const faq = "faq";
      const faqvalue = false;
      UserService.Component_hide_show(dispatch, faq, faqvalue);
    } else {
      const data = "reward";
      const value = true;
      UserService.Component_hide_show(dispatch, data, value);
    }
  };

  const ontrackbuttonclick = () => {
    if (shopInfo.reward == true || shopInfo.faqpage == true) {
      const reward = "reward";
      const track = "track";
      const rewardvalue = false;
      const trackvalue = true;
      UserService.Component_hide_show(dispatch, reward, rewardvalue);
      UserService.Component_hide_show(dispatch, track, trackvalue);
      const faq = "faq";
      const faqvalue = false;
      UserService.Component_hide_show(dispatch, faq, faqvalue);
    } else {
      const data = "track";
      const value = true;
      UserService.Component_hide_show(dispatch, data, value);
    }
  };
  const onfaqbuttonclick = () => {
    if (shopInfo.reward == true || shopInfo.track == true) {
      const reward = "reward";
      const track = "track";
      const faq = "faq";
      const rewardvalue = false;
      const trackvalue = false;
      const faqvalue = true;
      UserService.Component_hide_show(dispatch, reward, rewardvalue);
      UserService.Component_hide_show(dispatch, track, trackvalue);
      UserService.Component_hide_show(dispatch, faq, faqvalue);
    } else {
      const faq = "faq";
      const faqvalue = true;
      UserService.Component_hide_show(dispatch, faq, faqvalue);
    }
  };
  // console.log(shopInfo.faqpage);

  return (
    <>
      <div className="text-center w-100 wigets_footer d-flex">
        <div
          className="footer_btn_wraper d-flex"
          style={{ backgroundColor: shopInfo.primaryColor }}
        >
          <button
            className="footer_btn position-relative"
            id="help"
            onClick={onfaqbuttonclick}
          >
            <HelpSvg iconcolor={shopInfo.secondaryColor}></HelpSvg>
            <div className="arrow-up"></div>
          </button>

          <button className="footer_btn position-relative" id="whatapp">
            <Whatsappsvg iconcolor={shopInfo.secondaryColor}></Whatsappsvg>
            <div className="arrow-up"></div>
          </button>
          <button
            className="footer_btn position-relative"
            id="reward"
            onClick={onrewardbuttonclick}
          >
            <GiftSvg iconcolor={shopInfo.secondaryColor}></GiftSvg>
            <div className="arrow-up"></div>
          </button>
          <button
            className="footer_btn position-relative"
            id="track"
            onClick={ontrackbuttonclick}
          >
            <TruckScg iconcolor={shopInfo.secondaryColor}></TruckScg>
            <div className="arrow-up"></div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Widgetfooter;
