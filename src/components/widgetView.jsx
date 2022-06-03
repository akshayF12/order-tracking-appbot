import React from "react";
import WidgetButton from "./WidgetButton";
import Widgetfooter from "./Widgetfooter";
import Widgetsbody from "./Widgetsbody";
import { useDispatch, useSelector } from "react-redux";
import UserService from "./redux/services/Userservice";
import HelpfaqHeader from "./HelpfaqHeader";
import Rewardheader from "./Rewardheader";
import Trackheader from "./Trackheader";
function widgetView() {
  const dispatch = useDispatch();
  const shopInfo = useSelector((state) => state.usersData);
  let appposition = shopInfo.widgetposition;
  let classposition = "";
  if (appposition == "left") {
    classposition = "widgets_position_left_app";
  } else {
    classposition = "widgets_position_right_app";
  }
  return (
    <div className="appwraper">
      <section className="wigets_app cx-main-container" id="app_bussinebot">
        <div
          className={`sigle ${classposition}`}
          style={{ backgroundColor: shopInfo.backgroundColor }}
        >
          <div className="wave">
            <svg
              version="1.1"
              id="Shape_1_00000142895540903166544160000003796646156293961111_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 400 86.66"
              style={{ enableBackground: "new 0 0 400 86.66" }}
              xmlSpace="preserve"
            >
              <g id="Shape_1">
                <g>
                  <path
                    className="st0"
                    d="M0,0v75.81c0,0,109.08-36.71,251.37-3.99c0,0,111.38,24.75,148.63,3.99V0H0z"
                    style={{ fill: shopInfo.primaryColor }}
                  />
                </g>
              </g>
            </svg>
            <svg
              version="1.1"
              className="shave_svg_2"
              id="Shape_1_00000142895540903166544160000003796646156293961111_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 400 86.66"
              style={{ enableBackground: "new 0 0 400 86.66" }}
              xmlSpace="preserve"
            >
              <g id="Shape_1">
                <g>
                  <path
                    className="st0"
                    d="M0,0v75.81c0,0,109.08-36.71,251.37-3.99c0,0,111.38,24.75,148.63,3.99V0H0z"
                    style={{ fill: shopInfo.primaryColor }}
                  />
                </g>
              </g>
            </svg>

            <span className="close_wigets">X</span>
            <div className="text-header-app">
              {shopInfo.faqpage != false ? <HelpfaqHeader></HelpfaqHeader> : ""}
              {shopInfo.reward != false ? <Rewardheader></Rewardheader> : ""}
              {shopInfo.track != false ? <Trackheader></Trackheader> : ""}
            </div>
          </div>
          <Widgetsbody />
          <Widgetfooter />
        </div>
      </section>
      <WidgetButton></WidgetButton>
    </div>
  );
}

export default widgetView;
