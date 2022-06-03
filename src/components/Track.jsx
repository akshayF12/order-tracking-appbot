import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "./redux/services/Userservice";

function Track() {
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
    <>
      <div className="track_oder_body">
        <div className="header_oder_track text-center d-none">Track Order</div>

        <div className="track_oder_body" id="GFG">
          <form id="form_data_track_oder">
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={customColor}
              >
                Oder id
              </label>
              <input
                type="text"
                className="form-control"
                id="oder_number"
                name="order_no"
                style={customColor}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label"
                style={customColor}
              >
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="customer_phone_number"
                name="phone_no"
                style={customColor}
              />
            </div>
          </form>
          <button
            style={btnstyle}
            className="btn_track_order"
            id="track"
            onMouseEnter={() => setBgColourbtn(shopInfo.primaryColor)}
            onMouseLeave={() => setBgColourbtn("#fafafa")}
          >
            Track order
          </button>
        </div>
        <div className="display_oder_status">
          <div id="opt_oder_details"></div>
          <div id="opt_product"></div>
        </div>
        <div className="error_message">
          <span className="text-danger"></span>
        </div>
      </div>
    </>
  );
}

export default Track;
