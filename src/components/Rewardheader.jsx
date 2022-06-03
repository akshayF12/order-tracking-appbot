import React from "react";
import { useDispatch, useSelector } from "react-redux";
function Rewardheader() {
  const shopInfo = useSelector((state) => state.usersData);
  return (
    <div>
      <h2 style={{ color: shopInfo.secondaryColor }}>
        {shopInfo.rewardsHeading}
      </h2>
      <p style={{ color: shopInfo.secondaryColor }}>
        {shopInfo.rewardsSubHeading}
      </p>
    </div>
  );
}

export default Rewardheader;
