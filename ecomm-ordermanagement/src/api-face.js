const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "ecomm - orderManagement",
    brand: {
      name: "ecomm",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "orderManagement",
      version: process.env.SERVICE_VERSION || "1.0.0",
    },
    auth: {
      url: authUrl,
      loginPath: "/login",
      logoutPath: "/logout",
      currentUserPath: "/currentuser",
      authStrategy: "external",
      initialAuth: true,
    },
    dataObjects: [
      {
        name: "Order",
        description:
          "A purchase order placed by a user, containing selected products, shipping info, total, and payment/lifecycle status. Integrated with Stripe for payment and refunds. Immutable after placed except for admin status/notes/stripe events.",
        reference: {
          tableName: "order",
          properties: [
            {
              name: "userId",
              type: "ID",
            },

            {
              name: "items",
              type: "[Object]",
            },

            {
              name: "shippingAddress",
              type: "Object",
            },

            {
              name: "totalAmount",
              type: "Integer",
            },

            {
              name: "currency",
              type: "String",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "paymentStatus",
              type: "Enum",
            },

            {
              name: "placedAt",
              type: "Date",
            },

            {
              name: "stripePaymentIntentId",
              type: "String",
            },

            {
              name: "refundRequested",
              type: "Boolean",
            },

            {
              name: "refundAmount",
              type: "Integer",
            },

            {
              name: "adminNotes",
              type: "String",
            },

            {
              name: "orderHistory",
              type: "[Object]",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/orders`,
            title: "Create Order",
            query: [],

            body: {
              type: "json",
              content: {
                items: "Object",
                shippingAddress: "Object",
                totalAmount: "Integer",
                currency: "String",
                placedAt: "Date",
                stripePaymentIntentId: "String",
                refundRequested: "Boolean",
                refundAmount: "Integer",
                adminNotes: "String",
                orderHistory: "Object",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/orders/{orderId}`,
            title: "Get Order",
            query: [],

            parameters: [
              {
                key: "orderId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/orders/{orderId}`,
            title: "Update Order",
            query: [],

            body: {
              type: "json",
              content: {
                status: "Enum",
                paymentStatus: "Enum",
                stripePaymentIntentId: "String",
                refundRequested: "Boolean",
                refundAmount: "Integer",
                adminNotes: "String",
                orderHistory: "Object",
              },
            },

            parameters: [
              {
                key: "orderId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/orders/{orderId}`,
            title: "Delete Order",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "orderId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/orders`,
            title: "List Orders",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/checkoutstartorder/{orderId}`,
            title: "Checkout Startorder",
            query: [],

            body: {
              type: "json",
              content: {
                paymentUserParams: "Object",
              },
            },

            parameters: [
              {
                key: "orderId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/checkoutcompleteorder/{orderId}`,
            title: "Checkout Completeorder",
            query: [],

            body: {
              type: "json",
              content: {
                paymentUserParams: "Object",
              },
            },

            parameters: [
              {
                key: "orderId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/checkoutrefreshorder/{orderId}`,
            title: "Checkout Refreshorder",
            query: [],

            body: {
              type: "json",
              content: {
                paymentUserParams: "Object",
              },
            },

            parameters: [
              {
                key: "orderId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            newTab: true,
            url: `${basePath}/stripe-demo/order`,
            title: "Test Stripe Payment",
            query: [
              {
                key: "orderId",
                value: "",
                description: "Enter the id of order to start payment on it.",
                active: true,
              },
            ],
          },
        ],
      },

      {
        name: "OrderItem",
        description:
          "Snapshot of a product at time of order: productId, name, sku, price per unit, quantity, image url, custom selection/attributes. Not updated after order placed.",
        reference: {
          tableName: "orderItem",
          properties: [
            {
              name: "productId",
              type: "ID",
            },

            {
              name: "productName",
              type: "String",
            },

            {
              name: "sku",
              type: "String",
            },

            {
              name: "price",
              type: "Integer",
            },

            {
              name: "quantity",
              type: "Integer",
            },

            {
              name: "image",
              type: "String",
            },

            {
              name: "attributes",
              type: "Object",
            },
          ],
        },
        endpoints: [],
      },

      {
        name: "Sys_orderPayment",
        description:
          "A payment storage object to store the payment life cyle of orders based on order object. It is autocreated based on the source object&#39;s checkout config",
        reference: {
          tableName: "sys_orderPayment",
          properties: [
            {
              name: "ownerId",
              type: "ID",
            },

            {
              name: "orderId",
              type: "ID",
            },

            {
              name: "paymentId",
              type: "String",
            },

            {
              name: "paymentStatus",
              type: "String",
            },

            {
              name: "statusLiteral",
              type: "String",
            },

            {
              name: "redirectUrl",
              type: "String",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/orderpayment2/{sys_orderPaymentId}`,
            title: "Get Orderpayment2",
            query: [],

            parameters: [
              {
                key: "sys_orderPaymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/orderpayments2`,
            title: "List Orderpayments2",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/orderpayment`,
            title: "Create Orderpayment",
            query: [],

            body: {
              type: "json",
              content: {
                orderId: "ID",
                paymentId: "String",
                paymentStatus: "String",
                statusLiteral: "String",
                redirectUrl: "String",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/orderpayment/{sys_orderPaymentId}`,
            title: "Update Orderpayment",
            query: [],

            body: {
              type: "json",
              content: {
                paymentId: "String",
                paymentStatus: "String",
                statusLiteral: "String",
                redirectUrl: "String",
              },
            },

            parameters: [
              {
                key: "sys_orderPaymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/orderpayment/{sys_orderPaymentId}`,
            title: "Delete Orderpayment",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "sys_orderPaymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/orderpayments2`,
            title: "List Orderpayments2",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/orderpaymentbyorderid/{sys_orderPaymentId}`,
            title: "Get Orderpaymentbyorderid",
            query: [],

            parameters: [
              {
                key: "sys_orderPaymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/orderpaymentbypaymentid/{sys_orderPaymentId}`,
            title: "Get Orderpaymentbypaymentid",
            query: [],

            parameters: [
              {
                key: "sys_orderPaymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/orderpayment2/{sys_orderPaymentId}`,
            title: "Get Orderpayment2",
            query: [],

            parameters: [
              {
                key: "sys_orderPaymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },
        ],
      },

      {
        name: "Sys_paymentCustomer",
        description:
          "A payment storage object to store the customer values of the payment platform",
        reference: {
          tableName: "sys_paymentCustomer",
          properties: [
            {
              name: "userId",
              type: "ID",
            },

            {
              name: "customerId",
              type: "String",
            },

            {
              name: "platform",
              type: "String",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/paymentcustomerbyuserid/{sys_paymentCustomerId}`,
            title: "Get Paymentcustomerbyuserid",
            query: [],

            parameters: [
              {
                key: "sys_paymentCustomerId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/paymentcustomers`,
            title: "List Paymentcustomers",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "Sys_paymentMethod",
        description:
          "A payment storage object to store the payment methods of the platform customers",
        reference: {
          tableName: "sys_paymentMethod",
          properties: [
            {
              name: "paymentMethodId",
              type: "String",
            },

            {
              name: "userId",
              type: "ID",
            },

            {
              name: "customerId",
              type: "String",
            },

            {
              name: "cardHolderName",
              type: "String",
            },

            {
              name: "cardHolderZip",
              type: "String",
            },

            {
              name: "platform",
              type: "String",
            },

            {
              name: "cardInfo",
              type: "Object",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/paymentcustomermethods`,
            title: "List Paymentcustomermethods",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [],
            headers: [],
          },
        ],
      },
    ],
  };

  inject(app, config);
};
