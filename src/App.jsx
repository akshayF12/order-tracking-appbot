import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  Provider as AppBridgeProvider,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import "@shopify/polaris/build/esm/styles.css";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../src/components/redux/services/Userservice";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function App() {
  const shopInfo = useSelector((state) => state.usersData);
  const shopname = `${new URL(location).searchParams.get("shop")}`;
  const dispatch = useDispatch();
  useEffect(() => {
    UserService.loadappsettings(dispatch, shopname);
  }, []);

  if (shopInfo.charge_plan.length > 0) {
    // console.log(shopInfo.charge_plan);
    if (shopInfo.charge_plan[0].status === "active") {
      location.replace(shopInfo.charge_plan[0].url);
      // console.log(shopInfo.charge_plan);
    } else {
      location.replace(shopInfo.charge_plan[0].url);
      // console.log(shopInfo.charge_plan);
    }
  }

  return (
    <>
      <Spinner
        animation="border"
        role="status"
        className="text-center spiner_custom"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
}

function MyProvider({ children }) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      fetch: userLoggedInFetch(app),
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}
