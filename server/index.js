// @ts-check
import { resolve } from "path";
import path  from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify, ApiVersion } from "@shopify/shopify-api";
import "dotenv/config";
import {ScriptTag} from '@shopify/shopify-api/dist/rest-resources/2022-04/index.js';
import cors from 'cors'
import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import bodyParser from 'body-parser'
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig.js'

const db = new JsonDB(new Config("myDataBase", true, false, '/'));



const USE_ONLINE_TOKENS = true;
const TOP_LEVEL_OAUTH_COOKIE = "shopify_top_level_oauth";


const PORT = parseInt(process.env.PORT || "8081", 10);
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.April22,
  IS_EMBEDDED_APP: true,
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
    delete ACTIVE_SHOPIFY_SHOPS[shop]
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
    try {
      await Shopify.Webhooks.Registry.process(req, res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
      res.status(500).send(error.message);
    }
  });

  app.get("/products-count", verifyRequest(app), async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
   
    // // const { Product } = await import(
    // //   `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    // // );

    // const countData = await Product.count({ session });
    const test_session = await Shopify.Utils.loadCurrentSession(req, res,true);
     const tag = await ScriptTag.all({
      session: test_session,
    });
    // await ScriptTag.delete({
    //   session: test_session,
    //   id: 206826373284,
    // });
    // await ScriptTag.delete({
    //   session: test_session,
    //   id: 206826406052,
    // });

    // console.log(tag)
    const script_tag = new ScriptTag({session: test_session});
    script_tag.id = 206826504356;
    script_tag.src = `${process.env.HOST}/app.js`;
    await script_tag.save({});
    // const script_tag = new ScriptTag({session: test_session});
    // script_tag.event = "onload";
    // script_tag.src = `${process.env.HOST}/app.js`;
    // await script_tag.save({});
    res.status(200).send("script_tag");
 
  });

  app.post("/shop-admin-active-status",bodyParser.json(), verifyRequest(app),async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    db.push(`/${session.shop}`,{app_status:req.body.status});
     res.send(req.body.status);
  });

  app.get("/shop-app-active-status", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);

    try {
      var data = db.getData(`/${session.shop}`);
    } catch (error) {
       db.push(`/${session.shop}`,{app_status:"active"});
    }
    res.send(data);
  });
  
  app.get("/shop-app-active-status-frontend", async (req, res) => {
     const shop_name = req.query.shop;
     try {
      var data = db.getData(`/${shop_name}`);
     } catch (error) {
       res.send(error.message)
       return;
     }
     res.send(data)
  });

// wigets index html api
  app.get("/wigets-index", async (req, res) => {
    // @ts-ignore
    const test_session = await Shopify.Utils.loadCurrentSession(req, res,true);
      console.log(path.join('view/main.html'))

      const fs = await import("fs");
      res.send(fs.readFileSync(`${process.cwd()}/view/main.html`));
  });

// wigets track order html api 

app.get("/track-order", async (req, res) => {
  // @ts-ignore
  const test_session = await Shopify.Utils.loadCurrentSession(req, res,true);
    console.log(path.join('view/track'))

    const fs = await import("fs");
    res.send(fs.readFileSync(`${process.cwd()}/view/track_order.html`));
});

// wigets check reward body api
app.get("/check-reward-point", async (req, res) => {
  // @ts-ignore
  const test_session = await Shopify.Utils.loadCurrentSession(req, res,true);
    console.log(path.join('view/track'))

    const fs = await import("fs");
    res.send(fs.readFileSync(`${process.cwd()}/view/reward.html`));
});

// wigets get reward  html api call
app.get("/get-reward-point", async (req, res) => {
  // @ts-ignore
  const test_session = await Shopify.Utils.loadCurrentSession(req, res,true);
    console.log(path.join('view/track'))

    const fs = await import("fs");
    res.send(fs.readFileSync(`${process.cwd()}/view/getreward.html`));
});


app.get("/faq-page", async (req, res) => {
  // @ts-ignore
  const test_session = await Shopify.Utils.loadCurrentSession(req, res,true);
    console.log(path.join('view/track'))

    const fs = await import("fs");
    res.send(fs.readFileSync(`${process.cwd()}/view/faq.html`));
});


// wigets get discount code html
app.get("/get-code-dicount", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res,true);
    console.log(path.join('view/track'))

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
