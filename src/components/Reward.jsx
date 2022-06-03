import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "./redux/services/Userservice";

function Reward() {
  const dispatch = useDispatch();
  const shopInfo = useSelector((state) => state.usersData);
  const [bgColourbtn, setBgColourbtn] = useState("#fafafa");
  const btnstyle = {
    backgroundColor: bgColourbtn,
    border: `1px solid ${shopInfo.primaryColor}`,
    color: shopInfo.tertiaryColor,
  };
  const customColor = {
    color: shopInfo.tertiaryColor,
  };

  return (
    <div>
      <div className="getreward_point_body">
        <div className="header_oder_track text-center">
          <h2
            className="user_point"
            style={{ color: shopInfo.rewardpointColor }}
          >
            761
          </h2>
        </div>
        <div className="track_oder_body">
          <form id="coupon_data">
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={customColor}
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                style={customColor}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="customer_phone_number"
                className="form-label"
                style={customColor}
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                className="form-control"
                id="customer_phone_number"
                style={customColor}
              />
            </div>

            <button
              style={btnstyle}
              id="get_coupon"
              className="btn_track_order"
              onMouseEnter={() => setBgColourbtn(shopInfo.primaryColor)}
              onMouseLeave={() => setBgColourbtn("#fafafa")}
            >
              {shopInfo.discountbuttontext}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reward;
