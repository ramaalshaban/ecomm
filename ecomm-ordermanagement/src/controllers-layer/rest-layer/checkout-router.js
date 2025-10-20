const express = require("express");
const stripeDemoRouter = express.Router();
const paymentMethodsRouter = express.Router();
const { paymentGatePool } = require("common");
const fs = require("fs");
const path = require("path");

const {
  getPaymentCustomerId,
  savePaymentCustomerId,
  getPaymentMethodsOfUser,
  addPaymentMethodToCustomer,
  deletePaymentMethod,
} = require("utils").paymentUtils;

const { dbGetOrderPaymentByPaymentId } = require("dbLayer");

const createServiceController = require("./create-service-controller");

const initWithRestController = async (name, routeName, req, res) => {
  const restController = createServiceController(name, routeName, req, res);
  await restController.init();
};

const getOrderController = async (req, res, next) => {
  await initWithRestController("getOrder", "getOrder", req, res);

  const { getOrderById } = require("dbLayer");
  try {
    const orderId = req.query["orderId"];
    const fData = await getOrderById(orderId);
    const ownerId = await fData.userId;

    if (ownerId != req.session.userId) {
      res.status(403).send("Unauthorized");
      return;
    }

    res.send(fData);
  } catch (err) {
    //**errorLog
    console.log("Unmanaged err in  of order flow demo => ", err.message);
    res.send({
      error: "Unmanaged err in  order get order in flow demo => ",
      message: err.message,
    });
  }
};

const createOrderController = async (req, res, next) => {
  await initWithRestController("createOrder", "createOrder", req, res);
  const { createOrder } = require("dbLayer");
  try {
    if (!req.session?.userId) {
      res.status(403).send("Unauthorized");
      return;
    }
    const input = req.body;
    const fData = await createOrder(input);
    res.send(fData);
  } catch (err) {
    //**errorLog
    console.log("Unmanaged err in createOrder => ", err.message);
    res.send({
      error: "Unmanaged err in createOrder => ",
      message: err.message,
    });
  }
};

const getOrderStripeDemoController = async (req, res, next) => {
  await initWithRestController("OrderStripeDemo", "OrderStripeDemo", req, res);
  const url = req.url.split("?")[0];
  let fileName = url.split("/").pop();
  let userEmail = null;
  console.log(fileName);
  if (fileName == "sign-in.html") {
    fName = path.join(
      __dirname,
      "../",
      "../",
      "stripe-demo",
      "order",
      "sign-in.html",
    );
  } else if (!req.session) {
    fName = path.join(
      __dirname,
      "../",
      "../",
      "stripe-demo",
      "order",
      "unauthorized.html",
    );
  } else {
    userEmail = req.session.email ?? "unknown";
    if (fileName == "order" || fileName == "") fileName = "index.html";
    fName = path.join(
      __dirname,
      "../",
      "../",
      "stripe-demo",
      "order",
      fileName,
    );
  }

  const serviceUrl = process.env.SERVICE_URL;
  let fData = fs.readFileSync(fName, "utf8");

  if (userEmail) fData = fData.replaceAll("$userEmail", userEmail);
  fData = fData.replaceAll("$serviceUrl", serviceUrl);
  res.send(fData);
};

const getPaymentMethodsController = async (req, res, next) => {
  await initWithRestController(
    "getPaymentMethods",
    "getPaymentMethods",
    req,
    res,
  );
  try {
    if (!req.session) {
      res.status(403).send("Unauthorized");
      return;
    }

    let customerId = await getPaymentCustomerId(req.session, "stripe");

    if (!customerId) return res.send([]);

    const paymentMethods = await getPaymentMethodsOfUser(req.session, "stripe");
    res.send(paymentMethods);
  } catch (err) {
    console.log(err);
    console.log("Unmanaged err in getPaymentMethods => ", err.message);
    //**errorLog
    res.send({
      error: "Unmanaged err in getPaymentMethods => ",
      message: err.message,
    });
  }
};

const addPaymentMethodToCustomerController = async (req, res, next) => {
  await initWithRestController(
    "addPaymentMethod",
    "addPaymentMethod",
    req,
    res,
  );
  try {
    if (!req.session) {
      res.status(403).send("Unauthorized");
      return;
    }

    const userId = req.session.userId;

    const paymentMethodId = req.body.paymentMethodId;
    let customerId = null;
    customerId = await getPaymentCustomerId(req.session, "stripe");
    if (!customerId) {
      customerId = await savePaymentCustomerId(req.session, "stripe");
    }
    const paymentMethod = await addPaymentMethodToCustomer(
      userId,
      customerId,
      paymentMethodId,
      "stripe",
    );
    res.send(paymentMethod);
  } catch (err) {
    console.log("Unmanaged err in addPaymentMethodToCustomer => ", err.message);
    //**errorLog
    res.send({
      error: "Unmanaged err in addPaymentMethodToCustomer => ",
      message: err.message,
    });
  }
};

const deletePaymentMethodController = async (req, res, next) => {
  try {
    await initWithRestController(
      "deletePaymentMethod",
      "deletePaymentMethod",
      req,
      res,
    );
    if (!req.session) {
      res.status(403).send("Unauthorized");
      return;
    }

    const userId = req.session.userId;
    const paymentMethodId = req.params.paymentMethodId;
    const deletedData = await deletePaymentMethod(
      userId,
      paymentMethodId,
      "stripe",
    );
    res.send(deletedData);
  } catch (err) {
    console.log("Unmanaged err in deletePaymentMethod => ", err.message);
    //**errorLog
    res.send({
      error: "Unmanaged err in deletePaymentMethod => ",
      message: err.message,
    });
  }
};

const orderStripeDemoFolder = path.resolve(
  __dirname,
  "../",
  "../",
  "stripe-demo",
  "order",
);
stripeDemoRouter.use(
  "/order/images",
  express.static(path.join(orderStripeDemoFolder, "images")),
);
stripeDemoRouter.use(
  "/order/lib",
  express.static(path.join(orderStripeDemoFolder, "lib")),
);

stripeDemoRouter.get("/order", getOrderStripeDemoController);
stripeDemoRouter.get("/order/fetch-created-order", getOrderController);
stripeDemoRouter.post("/order/create-order", createOrderController);
stripeDemoRouter.get("/order/*", getOrderStripeDemoController);

paymentMethodsRouter.get("/list", getPaymentMethodsController);
paymentMethodsRouter.post("/add", addPaymentMethodToCustomerController);
paymentMethodsRouter.post("/delete", deletePaymentMethodController);

module.exports = {
  /*
   */
  stripeDemoRouter,
  paymentMethodsRouter,
};
