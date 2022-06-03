import { RecurringApplicationCharge } from "@shopify/shopify-api/dist/rest-resources/2022-04/index.js";
import sessionSchema from "../../modules/session-module.js";
import mongoose from "mongoose";

export default async function get_oneTime_billling_url(session, host) {
  //   console.log(session);
  const session_data = {
    id: session.id,
    shop: session.shop,
    accessToken: session.accessToken,
    appStatus: true,
    host: host,
  };
  const result = await sessionSchema.findOne({ shop: session.shop });
  var new_user = new sessionSchema(session_data);
  if (result === null) {
    new_user.save(function (err, result) {
      if (err) {
        console.log(err);
      }
    });
  } else {
    await sessionSchema.findOneAndUpdate({ shop: session.shop }, session_data);
  }
}
