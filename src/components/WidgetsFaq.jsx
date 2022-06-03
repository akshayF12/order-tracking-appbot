import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "./redux/services/Userservice";

function WidgetsFaq() {
  const dispatch = useDispatch();
  const shopInfo = useSelector((state) => state.usersData);
  const customColor = {
    color: shopInfo.tertiaryColor,
  };

  return (
    <div>
      <div className="row action_wraper">
        <div className="faq_body">
          <ul className="que_wraper">
            {shopInfo.faqslist != null
              ? shopInfo.faqslist.map((faq, index) => (
                  <li key={index} style={customColor}>
                    {faq.question}
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WidgetsFaq;
