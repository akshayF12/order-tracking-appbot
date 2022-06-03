import { RecurringApplicationCharge } from "@shopify/shopify-api/dist/rest-resources/2022-04/index.js";
import billing_schema from "../../modules/billing-module.js";
import mongoose from "mongoose";
const { Schema } = mongoose;
export default async function get_oneTime_billling_url(session) {
  // console.log("session", session);
  const check_recurring_charge = await RecurringApplicationCharge.all({
    session: session,
  });

  console.log(check_recurring_charge[0]);
  if (
    check_recurring_charge.length > 0 &&
    check_recurring_charge[0].status === "active"
  ) {
    console.log("Dsd");
    const data = check_recurring_charge[0];
    const billing_data = {
      id: data.id,
      name: data.name,
      api_client_id: data.api_client_id,
      price: data.price,
      status: data.status,
      return_url: data.return_url,
      billing_on: data.billing_on,
      created_at: data.created_at,
      updated_at: data.updated_at,
      test: data.test,
      activated_on: data.activated_on,
      cancelled_on: data.cancelled_on,
      trial_days: data.trial_days,
      trial_ends_on: data.trial_ends_on,
      decorated_return_url: data.decorated_return_url,
      confirmation_url: data.confirmation_url,
      shop: session.shop,
      Session: session,
    };

    const result = await billing_schema.findOne({ shop: session.shop });
    var new_user = new billing_schema(billing_data);
    if (result === null) {
      new_user.save(function (err, result) {
        if (err) {
          console.log(err);
        }
      });
    } else {
      await billing_schema.findOneAndUpdate(
        { shop: session.shop },
        billing_data
      );
    }
  }
  if (check_recurring_charge.length > 0) {
    if (
      check_recurring_charge[0].status === "declined" ||
      check_recurring_charge[0].status === "cancelled"
    ) {
      console.log("dsd");
      const billing_create = await createRecurringCharge(session);
      const data = billing_create[0];
      const billing_data = {
        id: data.id,
        name: data.name,
        api_client_id: data.api_client_id,
        price: data.price,
        status: data.status,
        return_url: data.return_url,
        billing_on: data.billing_on,
        created_at: data.created_at,
        updated_at: data.updated_at,
        test: data.test,
        activated_on: data.activated_on,
        cancelled_on: data.cancelled_on,
        trial_days: data.trial_days,
        trial_ends_on: data.trial_ends_on,
        decorated_return_url: data.decorated_return_url,
        confirmation_url: data.confirmation_url,
        shop: session.shop,
        Session: session,
      };
      await billing_schema.findOneAndUpdate(
        { shop: session.shop },
        billing_data
      );
      return;
    }
  }

  if (check_recurring_charge.length == 0) {
    const billing_create = await createRecurringCharge(session);
    const data = billing_create[0];
    const billing_data = {
      id: data.id,
      name: data.name,
      api_client_id: data.api_client_id,
      price: data.price,
      status: data.status,
      return_url: data.return_url,
      billing_on: data.billing_on,
      created_at: data.created_at,
      updated_at: data.updated_at,
      test: data.test,
      activated_on: data.activated_on,
      cancelled_on: data.cancelled_on,
      trial_days: data.trial_days,
      trial_ends_on: data.trial_ends_on,
      decorated_return_url: data.decorated_return_url,
      confirmation_url: data.confirmation_url,
      shop: session.shop,
      Session: session,
    };
    const result = await billing_schema.findOne({ shop: session.shop });
    var new_user = new billing_schema(billing_data);
    if (result === null) {
      new_user.save(function (err, result) {
        if (err) {
          console.log(err);
        }
      });
    }
  }
}

const createRecurringCharge = async (session) => {
  const recurring_application_charge = new RecurringApplicationCharge({
    session: session,
  });
  recurring_application_charge.name = "Super Duper Plan";
  recurring_application_charge.price = 12.95;
  recurring_application_charge.test = true;
  recurring_application_charge.return_url = `${process.env.HOST}/?shop=${session.shop}`;
  await recurring_application_charge.save({});
  const check_recurring_charge = await RecurringApplicationCharge.all({
    session: session,
  });
  return check_recurring_charge;
};
