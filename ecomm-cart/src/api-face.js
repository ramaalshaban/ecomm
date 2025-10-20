const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "ecomm - cart",
    brand: {
      name: "ecomm",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "cart",
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
        name: "Cart",
        description:
          "Represents a single user&#39;s shopping cart containing selected product items, their quantities, and state as of last update.",
        reference: {
          tableName: "cart",
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
              name: "lastModified",
              type: "Date",
            },

            {
              name: "yuy",
              type: "Object",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/carts`,
            title: "Create Cart",
            query: [],

            body: {
              type: "json",
              content: {
                items: "Object",
                yuy: "Object",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/carts/{cartId}`,
            title: "Get Cart",
            query: [],

            parameters: [
              {
                key: "cartId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/carts/{cartId}`,
            title: "Update Cart",
            query: [],

            body: {
              type: "json",
              content: {
                items: "Object",
                yuy: "Object",
              },
            },

            parameters: [
              {
                key: "cartId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/carts/{cartId}`,
            title: "Delete Cart",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "cartId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/carts`,
            title: "List Carts",
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
        name: "CartItem",
        description:
          "Describes a product added to a cart with snapshot of its state at time of add—product, quantity, price, and selection attributes.",
        reference: {
          tableName: "cartItem",
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
              name: "priceAtAdd",
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
        name: "Ko",
        description: "",
        reference: {
          tableName: "ko",
          properties: [],
        },
        endpoints: [],
      },

      {
        name: "Bvf",
        description: "",
        reference: {
          tableName: "bvf",
          properties: [],
        },
        endpoints: [],
      },
    ],
  };

  inject(app, config);
};
