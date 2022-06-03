const initialState = {
  shop_data: [],
  status: [],
  reward: false,
  faqpage: false,
  track: true,
  loading: true,
  error: false,
  charge_plan: [],
  primaryColor: [],
  secondaryColor: "#145e54",
  backgroundColor: "#ffffff",
  tertiaryColor: "#145e54",
  rewardpointColor: "#fae86e",
  widgetposition: "left",
  discountbuttontext: "Get Code",
  widgetbutttontext: "Reward",
  trackOrderHeading: "Track order",
  faqheader: "faq",
  faqheadersub: "how we can help?",
  trackOrderSubHeading: "Track your order using order ID",
  rewardsHeading: "Rewards",
  rewardsSubHeading: "Generate Coupon Code",
  faqslist: [],
  clientName: [],
  colors: [],
  phoneNumber: [],
  shopName: `https://${new URL(location).searchParams.get("shop")}`,
  rewardPointsDescription:
    "Congragulations, coupon code has been sent to your number. Use the coupon code to avail discounts.",
  loader: false,
};

function faqReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_FAQS":
      return {
        ...state,
        faqslist: action.payload,
        error: false,
        loading: true,
      };
    case "LOAD_REWARD":
      return { ...state, reward: action.payload, error: false, loading: false };
    case "LOAD_NEW_FAQ_FIELD":
      return {
        ...state,
        faqslist: [...state.faqslist, action.payload],
        error: false,
        loading: false,
      };
    case "LOAD_TRACK":
      return { ...state, track: action.payload, error: false, loading: false };
    case "LOAD_FAQ":
      return {
        ...state,
        faqpage: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_SHOP":
      return {
        ...state,
        shop_data: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_PRIMARY_COLOR":
      return {
        ...state,
        primaryColor: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_SECONDARY_COLOR":
      return {
        ...state,
        secondaryColor: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_BACKGROUND_COLOR":
      return {
        ...state,
        backgroundColor: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_TERTIARY_COLOR":
      return {
        ...state,
        tertiaryColor: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_REWARD_COLOR":
      return {
        ...state,
        rewardpointColor: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_WIDGET_POSITION":
      return {
        ...state,
        widgetposition: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_DISCOUNT_BUTTON_TEXT":
      return {
        ...state,
        discountbuttontext: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_WIDGET_BUTTON_TEXT":
      return {
        ...state,
        widgetbutttontext: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_TRACK_ORDER_HEADING_TEXT":
      return {
        ...state,
        trackOrderHeading: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_FAQ_HEADER_TEXT":
      return {
        ...state,
        faqheader: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_WIDGET_STATUS":
      return {
        ...state,
        status: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_FAQ_HEADER_SUB_TEXT":
      return {
        ...state,
        faqheadersub: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_REWARDS_HEADING_TEXT":
      return {
        ...state,
        rewardsHeading: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_REWARDS_HEADING_SUB_TEXT":
      return {
        ...state,
        rewardsSubHeading: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_TRACK_ORDER_HEADING_SUB_TEXT":
      return {
        ...state,
        trackOrderSubHeading: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_NEW_FAQ":
      return {
        ...state,
        faqslist: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_CLIENT_NAME_FIELD":
      return {
        ...state,
        clientName: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_PHONE_NUMBER_FIELD":
      return {
        ...state,
        phoneNumber: action.payload,
        error: false,
        loading: false,
      };
    case "LOAD_REWARDS_DESCRIPTION_TEXT":
      return {
        ...state,
        rewardPointsDescription: action.payload,
        error: false,
        loading: false,
      };
    case "GET_SETTINGS_CHARGE":
      return {
        ...state,
        charge_plan: [action.payload],
        error: false,
        loading: false,
      };
    case "LOAD_LOADER":
      return { ...state, loader: action.payload, error: false, loading: false };
    case "GET_SETTINGS":
      return {
        ...state,
        primaryColor: action.payload.colors.primaryColor,
        secondaryColor: action.payload.colors.secondaryColor,
        backgroundColor: action.payload.colors.backgroundColor,
        tertiaryColor: action.payload.colors.teritaryColor,
        rewardpointColor: action.payload.colors.rewardPointsColor,
        widgetposition: action.payload.config.position.toString(),
        clientName: action.payload.config.clientName,
        phoneNumber: action.payload.config.phoneNumber,
        widgetbutttontext: action.payload.text.widgetButton,
        faqheader: action.payload.text.faqHeader,
        faqheadersub: action.payload.text.faqSubHeading,
        rewardsHeading: action.payload.text.rewardsHeading,
        rewardsSubHeading: action.payload.text.rewardsSubHeading,
        rewardPointsDescription: action.payload.text.rewardPointsDescription,
        trackOrderHeading: action.payload.text.trackOrderHeading,
        trackOrderSubHeading: action.payload.text.trackOrderSubHeading,
        faqslist: action.payload.faqs,
        status: action.payload.status,
        error: false,
        loading: false,
      };
    case "ERROR_USERS":
      return { ...state, faqList: [], error: true, loading: false };
    default:
      return state;
  }
}
export default faqReducer;
