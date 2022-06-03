import React from "react";
import { useDispatch, useSelector } from "react-redux";
function Trackheader() {
  const shopInfo = useSelector((state) => state.usersData);
  return (
    <div>
      <h2 style={{ color: shopInfo.secondaryColor }}>
        {shopInfo.trackOrderHeading}
      </h2>
      <p style={{ color: shopInfo.secondaryColor }}>
        {shopInfo.trackOrderSubHeading}
      </p>
    </div>
  );
}

export default Trackheader;
