// @ts-check
import { resolve } from "path";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify, ApiVersion } from "@shopify/shopify-api";
import "dotenv/config";
import { ScriptTag } from "@shopify/shopify-api/dist/rest-resources/2022-04/index.js";
import cors from "cors";
import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import bodyParser from "body-parser";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";
import connectMogodb from "../db/mongoConnect.js";
import recurring_application_charge from "../modules/billing-module.js";
import shopData from "../modules/session-module.js";
import { RecurringApplicationCharge } from "@shopify/shopify-api/dist/rest-resources/2022-04/index.js";
connectMogodb();
const db = new JsonDB(new Config("charges", true, false, "/"));

const USE_ONLINE_TOKENS = true;
const TOP_LEVEL_OAUTH_COOKIE = "shopify_top_level_oauth";

const PORT = parseInt(process.env.PORT || "8081", 10);
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
console.log(process.env.HOST.replace(/https:\/\//, ""));
Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.April22,
  IS_EMBEDDED_APP: false,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};
Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
  path: "/webhooks",
  // @ts-ignore
  webhookHandler: async (topic, shop, body) => {
    recurring_application_charge.findOneAndDelete(
      { shop: shop },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted User : ", docs);
        }
      }
    );
    await shopData.findOneAndUpdate({ shop: shop }, { appStatus: false });
    delete ACTIVE_SHOPIFY_SHOPS[shop];
  },
});

// export for test use only
export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) {
  const app = express();
  app.use(cors());

  app.set("top-level-oauth-cookie", TOP_LEVEL_OAUTH_COOKIE);
  app.set("active-shopify-shops", ACTIVE_SHOPIFY_SHOPS);
  app.set("use-online-tokens", USE_ONLINE_TOKENS);

  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  applyAuthMiddleware(app);

  app.post("/webhooks", async (req, res) => {
    console.log(req.body);
    try {
      await Shopify.Webhooks.Registry.process(req, res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
      res.status(500).send(error.message);
    }
  });

  // app.get("/", verifyRequest(app), async (req, res) => {
  //   const session = await Shopify.Utils.loadCurrentSession(req, res, true);
  //   console.log(session);
  //   //   // // const { Product } = await import(
  //   //   // //   `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
  //   //   // // );

  //   //   // const countData = await Product.count({ session });
  //   //   const test_session = await Shopify.Utils.loadCurrentSession(req, res,true);
  //   //    const tag = await ScriptTag.all({
  //   //     session: test_session,
  //   //   });
  //   //   // await ScriptTag.delete({
  //   //   //   session: test_session,
  //   //   //   id: 206826373284,
  //   //   // });
  //   //   // await ScriptTag.delete({
  //   //   //   session: test_session,
  //   //   //   id: 206826406052,
  //   //   // });

  //   //   // console.log(tag)
  //   //   const script_tag = new ScriptTag({session: test_session});
  //   //   script_tag.id = 206826504356;
  //   //   script_tag.src = `${process.env.HOST}/app.js`;
  //   //   await script_tag.save({});
  //   //   // const script_tag = new ScriptTag({session: test_session});
  //   //   // script_tag.event = "onload";
  //   //   // script_tag.src = `${process.env.HOST}/app.js`;
  //   //   // await script_tag.save({});
  //   //   res.status(200).send("script_tag");
  //   res.end();
  // });

  app.post(
    "/shop-admin-active-status",
    bodyParser.json(),
    verifyRequest(app),
    async (req, res) => {
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      console.log(req.body.shop_name);
      db.push(`/${session.shop}`, {
        app_status: req.body.status,
        shop_name: req.body.shop_name,
      });
      res.send(req.body.status);
    }
  );

  async function middleware1(req, res, next) {
    // Set data

    const shop = req.query.shop;
    const data = await recurring_application_charge.findOne(
      { shop: shop },
      { _id: 0 }
    );
    // console.log(data.Session);
    const checkdata = await RecurringApplicationCharge.find({
      session: data.Session,
      id: data.id,
    });

    req.checkBillingstatus = checkdata.status;
    next();
  }

  app.get("/shop-app-active-status", middleware1, async (req, res) => {
    const shop = req.query.shop;
    // console.log("midlewaredata", req.checkBillingstatus);
    const data = await recurring_application_charge.findOne(
      { shop: shop },
      { _id: 0 }
    );
    // console.log(data.Session);
    const checkdata = await RecurringApplicationCharge.find({
      session: data.Session,
      id: data.id,
    });
    // console.log(checkdata);
    if (data) {
      if (data.status === "active") {
        // console.log("mongo");
        res.send({ status: "active", url: "https://app.businessonbot.com/" });
        return;
      } else if (checkdata.status === "declined") {
        const recurring_application_charge_re = new RecurringApplicationCharge({
          session: data.Session,
        });
        recurring_application_charge_re.name = "Basic Plan";
        recurring_application_charge_re.price = 12.95;
        recurring_application_charge_re.test = true;
        recurring_application_charge_re.return_url = `${process.env.HOST}/?shop=${data.shop}`;
        await recurring_application_charge_re.save({});
        const check_recurring_charge = await RecurringApplicationCharge.all({
          session: data.Session,
        });
        // console.log("hello", check_recurring_charge[0]);
        if (check_recurring_charge) {
          const rebillingData = {
            id: check_recurring_charge[0].id,
            name: check_recurring_charge[0].name,
            api_client_id: check_recurring_charge[0].api_client_id,
            price: check_recurring_charge[0].price,
            status: check_recurring_charge[0].status,
            return_url: check_recurring_charge[0].return_url,
            billing_on: check_recurring_charge[0].billing_on,
            created_at: check_recurring_charge[0].created_at,
            updated_at: check_recurring_charge[0].updated_at,
            test: check_recurring_charge[0].test,
            activated_on: check_recurring_charge[0].activated_on,
            cancelled_on: check_recurring_charge[0].cancelled_on,
            trial_days: check_recurring_charge[0].trial_days,
            trial_ends_on: check_recurring_charge[0].trial_ends_on,
            decorated_return_url: checkdata.decorated_return_url,
            confirmation_url: checkdata.confirmation_url,
          };
          const datasave = await recurring_application_charge.findOneAndUpdate(
            { shop: shop },
            rebillingData
          );
          res.send({
            status: data.status,
            url: check_recurring_charge[0].confirmation_url,
          });
        }
        return;
      } else if (checkdata.status === "active") {
        const status = { status: "active" };
        const datasave = await recurring_application_charge.findOneAndUpdate(
          { shop: shop },
          status
        );
        res.send({ status: "active", url: "https://app.businessonbot.com/" });
        return;
      } else {
        res.send({ status: data.status, url: data.confirmation_url });
      }
    }
  });

  // app.get("/", async (req, res) => {
  //   const shop = req.query.shop;
  //   console.log(shop);
  //   // const data = await recurring_application_charge.findOne(
  //   //   { shop: shop },
  //   //   { _id: 0 }
  //   // );
  //   // if (data) {
  //   //   res.send(data.confirmation_url);
  //   // } else {
  //   //   res.status(404).send("Data not found");
  //   //
  //   res.send(shop);
  // });

  app.get("/shop-app-active-status-frontend", async (req, res) => {
    const shop_name = req.query.shop;
    try {
      var data = db.getData(`/${shop_name}`);
    } catch (error) {
      res.send(error.message);
      return;
    }
    res.send(data);
  });

  // ******************** Shopify Frontend api here  ********************************

  // wigets index html api
  app.get("/wigets-index", async (req, res) => {
    // @ts-ignore
    const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);
    console.log(path.join("view/main.html"));

    const fs = await import("fs");
    res.send(fs.readFileSync(`${process.cwd()}/view/main.html`));
  });

  // wigets track order html api
  app.get("/track-order", async (req, res) => {
    // @ts-ignore
    const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);
    console.log(path.join("view/track"));

    const fs = await import("fs");
    res.send(fs.readFileSync(`${process.cwd()}/view/track_order.html`));
  });

  // wigets check reward body api
  app.get("/check-reward-point", async (req, res) => {
    // @ts-ignore
    const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);
    console.log(path.join("view/track"));

    const fs = await import("fs");
    res.send(fs.readFileSync(`${process.cwd()}/view/reward.html`));
  });

  // wigets get reward  html api call
  app.get("/get-reward-point", async (req, res) => {
    // @ts-ignore
    const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);
    console.log(path.join("view/track"));

    const fs = await import("fs");
    res.send(fs.readFileSync(`${process.cwd()}/view/getreward.html`));
  });

  app.get("/faq-page", async (req, res) => {
    // @ts-ignore
    const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);
    console.log(path.join("view/track"));

    const fs = await import("fs");
    res.send(fs.readFileSync(`${process.cwd()}/view/faq.html`));
  });

  // wigets get discount code html
  app.get("/get-code-dicount", async (req, res) => {
    const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);
    console.log(path.join("view/track"));

    const fs = await import("fs");
    res.send(fs.readFileSync(`${process.cwd()}/view/getcode.html`));
  });

  app.post("/graphql", verifyRequest(app), async (req, res) => {
    try {
      const response = await Shopify.Utils.graphqlProxy(req, res);
      res.status(200).send(response.body);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.use(express.json());

  app.use((req, res, next) => {
    const shop = req.query.shop;
    if (Shopify.Context.IS_EMBEDDED_APP && shop) {
      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors https://${shop} https://admin.shopify.com;`
      );
    } else {
      res.setHeader("Content-Security-Policy", `frame-ancestors 'none';`);
    }
    next();
  });

  app.use("/*", (req, res, next) => {
    const shop = req.query.shop;
    const chargeid = req.query.charge_id;

    // Detect whether we need to reinstall the app, any request from Shopify will
    // include a shop in the query parameters.
    // @ts-ignore
    if (app.get("active-shopify-shops")[shop] === undefined && shop) {
      res.redirect(`/auth?shop=${shop}`);
    } else {
      next();
    }
  });

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await import("vite").then(({ createServer }) =>
      createServer({
        root,
        logLevel: isTest ? "error" : "info",
        server: {
          port: PORT,
          hmr: {
            protocol: "ws",
            host: "localhost",
            port: 64999,
            clientPort: 64999,
          },
          middlewareMode: "html",
        },
      })
    );
    app.use(vite.middlewares);
  } else {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    const fs = await import("fs");
    app.use(compression());
    app.use(serveStatic(resolve("dist/client")));
    // @ts-ignore
    app.use("/*", (req, res, next) => {
      // Client-side routing will pick up on the correct route to render, so we always render the index here
      res
        .status(200)
        .set("Content-Type", "text/html")
        .send(fs.readFileSync(`${process.cwd()}/dist/client/index.html`));
    });
  }

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) => app.listen(PORT));
}
