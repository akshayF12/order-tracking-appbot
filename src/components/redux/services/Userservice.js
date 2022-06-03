import { Component } from "react";
import Communication from "./Communication";
import config from "./config";
const UserService = {
  loadfaq(dispatch) {
    Communication.getMethod(config.endPoints.users)
      .then((users) => {
        dispatch({
          type: "GET_FAQS",
          payload: users.faq,
        });
        // console.log("faq  ::", users.faq)
      })
      .catch(() => {
        dispatch({
          type: "ERROR_USERS",
          payload: null,
        });
      })
      .finally(() => {});
  },

  saveSettings(dispatch, data) {
    Communication.saveMethodsettings(config.baseUrl, data)
      .then((data) => {
        if (data) {
          const loader = false;
          dispatch({
            type: "LOAD_LOADER",
            payload: loader,
          });
        }
        console.log("save  ::", data);
      })
      .catch(() => {
        dispatch({
          type: "ERROR_USERS",
          payload: null,
        });
      });
  },

  loadShop(dispatch, data) {
    dispatch({
      type: "LOAD_SHOP",
      payload: data,
    });
  },

  Component_hide_show(dispatch, data, settingsData) {
    if (data == "reward") {
      dispatch({
        type: "LOAD_REWARD",
        payload: settingsData,
      });
    }

    if (data == "track") {
      dispatch({
        type: "LOAD_TRACK",
        payload: settingsData,
      });
    }

    if (data == "faq") {
      dispatch({
        type: "LOAD_FAQ",
        payload: settingsData,
      });
    }
  },

  loadprimarycolor(dispatch, data) {
    dispatch({
      type: "LOAD_PRIMARY_COLOR",
      payload: data,
    });
  },

  loadsecondarycolor(dispatch, data) {
    dispatch({
      type: "LOAD_SECONDARY_COLOR",
      payload: data,
    });
  },

  loadbackgroundcolor(dispatch, data) {
    dispatch({
      type: "LOAD_BACKGROUND_COLOR",
      payload: data,
    });
  },

  loadtertiaryColor(dispatch, data) {
    dispatch({
      type: "LOAD_TERTIARY_COLOR",
      payload: data,
    });
  },

  loadrewardcolor(dispatch, data) {
    dispatch({
      type: "LOAD_REWARD_COLOR",
      payload: data,
    });
  },

  loadwidgetposition(dispatch, data) {
    dispatch({
      type: "LOAD_WIDGET_POSITION",
      payload: data,
    });
  },

  loadwidgetstatus(dispatch, data) {
    dispatch({
      type: "LOAD_WIDGET_STATUS",
      payload: data,
    });
  },

  loaddiscountbuttontext(dispatch, data) {
    dispatch({
      type: "LOAD_DISCOUNT_BUTTON_TEXT",
      payload: data,
    });
  },

  loadwidgetbuttontext(dispatch, data) {
    dispatch({
      type: "LOAD_WIDGET_BUTTON_TEXT",
      payload: data,
    });
  },
  loadtrackOrderHeading(dispatch, data) {
    dispatch({
      type: "LOAD_TRACK_ORDER_HEADING_TEXT",
      payload: data,
    });
  },
  loadtrackOrderHeadingsub(dispatch, data) {
    dispatch({
      type: "LOAD_TRACK_ORDER_HEADING_SUB_TEXT",
      payload: data,
    });
  },
  loadfaqHeader(dispatch, data) {
    dispatch({
      type: "LOAD_FAQ_HEADER_TEXT",
      payload: data,
    });
  },

  loadfaqHeadersub(dispatch, data) {
    dispatch({
      type: "LOAD_FAQ_HEADER_SUB_TEXT",
      payload: data,
    });
  },

  loadrewardsHeading(dispatch, data) {
    dispatch({
      type: "LOAD_REWARDS_HEADING_TEXT",
      payload: data,
    });
  },

  loadrewardsHeadingsub(dispatch, data) {
    dispatch({
      type: "LOAD_REWARDS_HEADING_SUB_TEXT",
      payload: data,
    });
  },

  loadrewardPointsDescription(dispatch, data) {
    dispatch({
      type: "LOAD_REWARDS_DESCRIPTION_TEXT",
      payload: data,
    });
  },

  loadLoader(dispatch, data) {
    dispatch({
      type: "LOAD_LOADER",
      payload: data,
    });
  },

  loadnewfaq(dispatch, data) {
    dispatch({
      type: "LOAD_NEW_FAQ",
      payload: data,
    });
  },
  loadnewfaqfield(dispatch, data) {
    dispatch({
      type: "LOAD_NEW_FAQ_FIELD",
      payload: data,
    });
  },

  loadnewclientName(dispatch, data) {
    dispatch({
      type: "LOAD_CLIENT_NAME_FIELD",
      payload: data,
    });
  },
  loadnewphonenumber(dispatch, data) {
    dispatch({
      type: "LOAD_PHONE_NUMBER_FIELD",
      payload: data,
    });
  },

  loadappsettings(dispatch, shopname) {
    Communication.getMethodSettings(config.endPoints.settings, shopname)
      .then((data) => {
        if (data.error != true) {
          dispatch({
            type: "GET_SETTINGS_CHARGE",
            payload: data,
          });
        } else {
          console.log("GET_SETTINGS  ::", data);
        }
        // console.log("GET_SETTINGS  ::", data);
      })
      .catch(() => {
        dispatch({
          type: "ERROR_USERS",
          payload: null,
        });
      })
      .finally(() => {});
  },
};
export default UserService;
