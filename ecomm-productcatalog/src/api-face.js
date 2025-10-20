const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "ecomm - productCatalog",
    brand: {
      name: "ecomm",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "productCatalog",
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
        name: "Product",
        description:
          "Represents a product listed in the e-commerce catalog, with full searchable and filterable attributes including inventory, status, pricing, and dimensional details.",
        reference: {
          tableName: "product",
          properties: [
            {
              name: "name",
              type: "String",
            },

            {
              name: "description",
              type: "Text",
            },

            {
              name: "category",
              type: "String",
            },

            {
              name: "price",
              type: "Integer",
            },

            {
              name: "images",
              type: "[String]",
            },

            {
              name: "availability",
              type: "Boolean",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "inventoryCount",
              type: "Integer",
            },

            {
              name: "sku",
              type: "String",
            },

            {
              name: "tags",
              type: "[String]",
            },

            {
              name: "weight",
              type: "Float",
            },

            {
              name: "dimensions",
              type: "Object",
            },

            {
              name: "attributes",
              type: "Object",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/products`,
            title: "Create Product",
            query: [],

            body: {
              type: "json",
              content: {
                name: "String",
                description: "Text",
                category: "String",
                price: "Integer",
                images: "String",
                status: "Enum",
                inventoryCount: "Integer",
                sku: "String",
                tags: "String",
                weight: "Float",
                dimensions: "Object",
                attributes: "Object",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/products/{productId}`,
            title: "Update Product",
            query: [],

            body: {
              type: "json",
              content: {
                name: "String",
                description: "Text",
                category: "String",
                price: "Integer",
                images: "String",
                status: "Enum",
                inventoryCount: "Integer",
                sku: "String",
                tags: "String",
                weight: "Float",
                dimensions: "Object",
                attributes: "Object",
              },
            },

            parameters: [
              {
                key: "productId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/products/{productId}`,
            title: "Delete Product",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "productId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/products/{productId}`,
            title: "Get Product",
            query: [],

            parameters: [
              {
                key: "productId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/products`,
            title: "List Products",
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
