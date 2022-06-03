import React from "react";
import { useDispatch, useSelector } from "react-redux";
function HelpfaqHeader() {
  const shopInfo = useSelector((state) => state.usersData);
  return (
    <div>
      <h2 style={{ color: shopInfo.secondaryColor }}>{shopInfo.faqheader}</h2>
      <p style={{ color: shopInfo.secondaryColor }}>{shopInfo.faqheadersub}</p>
    </div>
  );
}

export default HelpfaqHeader;
