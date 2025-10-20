const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: "bff-api",
    name: "ecomm - bff",
    brand: {
      name: "ecomm",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "bff",
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
        name: "Dynamic All Index",
        description: "Dynamic All Index for all elasticsearch index",
        reference: {
          tableName: "Dynamic All Index",
          properties: [],
        },
        endpoints: [
          {
            isAuth: false,
            method: "GET",
            url: "/allIndices",
            title: "All Indices",
            query: [],
            body: {},
            parameters: [],
            headers: [],
          },
          {
            isAuth: false,
            method: "POST",
            url: "/{indexName}/list",
            title: "List",
            query: [
              {
                key: "page",
                value: "1",
                description: "Page number",
                active: true,
              },
              {
                key: "limit",
                value: "10",
                description: "Limit number",
                active: true,
              },
              {
                key: "sortBy",
                value: "createdAt",
                description: "Sort by",
                active: true,
              },
              {
                key: "sortOrder",
                value: "desc",
                description: "Sort order",
                active: true,
              },
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {
              type: "json",
              content: {
                field: {
                  //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
                  operator: "eq",
                  value: "string",
                  //if operator is range, values: [min, max]
                },
              },
            },
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/list",
            title: "List",
            query: [
              {
                key: "page",
                value: "1",
                description: "Page number",
                active: true,
              },
              {
                key: "limit",
                value: "10",
                description: "Limit number",
                active: true,
              },
              {
                key: "sortBy",
                value: "createdAt",
                description: "Sort by",
                active: true,
              },
              {
                key: "sortOrder",
                value: "desc",
                description: "Sort order",
                active: true,
              },
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "POST",
            url: "/{indexName}/count",
            title: "Count",
            query: [
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {
              type: "json",
              content: {
                field: {
                  //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
                  operator: "eq",
                  value: "string",
                  //if operator is range, values: [min, max]
                },
              },
            },
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/count",
            title: "Count",
            query: [
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/schema",
            title: "Schema",
            query: [],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/{id}",
            title: "Get",
            query: [],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
              {
                key: "id",
                value: "string",
                description: "Id",
              },
            ],
            headers: [],
          },
        ],
      },
    ],
  };

  config.dataObjects.push({
    name: "CustomerOrderListView",
    description: "",
    reference: {
      tableName: "CustomerOrderListView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "POST",
        url: "/CustomerOrderListView/list",
        title: "List",
        query: [
          {
            key: "page",
            value: "1",
            description: "Page number",
            active: true,
          },
          {
            key: "limit",
            value: "10",
            description: "Limit number",
            active: true,
          },
          {
            key: "sortBy",
            value: "createdAt",
            description: "Sort by",
            active: true,
          },
          {
            key: "sortOrder",
            value: "desc",
            description: "Sort order",
            active: true,
          },
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {
          type: "json",
          content: {
            field: {
              //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
              operator: "eq",
              value: "string",
              //if operator is range, values: [min, max]
            },
          },
        },
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/CustomerOrderListView/list",
        title: "List",
        query: [
          {
            key: "page",
            value: "1",
            description: "Page number",
            active: true,
          },
          {
            key: "limit",
            value: "10",
            description: "Limit number",
            active: true,
          },
          {
            key: "sortBy",
            value: "createdAt",
            description: "Sort by",
            active: true,
          },
          {
            key: "sortOrder",
            value: "desc",
            description: "Sort order",
            active: true,
          },
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "POST",
        url: "/CustomerOrderListView/count",
        title: "Count",
        query: [
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {
          type: "json",
          content: {
            field: {
              //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
              operator: "eq",
              value: "string",
              //if operator is range, values: [min, max]
            },
          },
        },
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/CustomerOrderListView/count",
        title: "Count",
        query: [
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/CustomerOrderListView/schema",
        title: "Schema",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/CustomerOrderListView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "OrderDetailView",
    description: "",
    reference: {
      tableName: "OrderDetailView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/OrderDetailView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/OrderDetailView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "CartView",
    description: "",
    reference: {
      tableName: "CartView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/CartView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/CartView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "ProductListView",
    description: "",
    reference: {
      tableName: "ProductListView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "POST",
        url: "/ProductListView/list",
        title: "List",
        query: [
          {
            key: "page",
            value: "1",
            description: "Page number",
            active: true,
          },
          {
            key: "limit",
            value: "10",
            description: "Limit number",
            active: true,
          },
          {
            key: "sortBy",
            value: "createdAt",
            description: "Sort by",
            active: true,
          },
          {
            key: "sortOrder",
            value: "desc",
            description: "Sort order",
            active: true,
          },
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {
          type: "json",
          content: {
            field: {
              //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
              operator: "eq",
              value: "string",
              //if operator is range, values: [min, max]
            },
          },
        },
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/ProductListView/list",
        title: "List",
        query: [
          {
            key: "page",
            value: "1",
            description: "Page number",
            active: true,
          },
          {
            key: "limit",
            value: "10",
            description: "Limit number",
            active: true,
          },
          {
            key: "sortBy",
            value: "createdAt",
            description: "Sort by",
            active: true,
          },
          {
            key: "sortOrder",
            value: "desc",
            description: "Sort order",
            active: true,
          },
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "POST",
        url: "/ProductListView/count",
        title: "Count",
        query: [
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {
          type: "json",
          content: {
            field: {
              //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
              operator: "eq",
              value: "string",
              //if operator is range, values: [min, max]
            },
          },
        },
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/ProductListView/count",
        title: "Count",
        query: [
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/ProductListView/schema",
        title: "Schema",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/ProductListView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "SalesDashboardView",
    description: "",
    reference: {
      tableName: "SalesDashboardView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "POST",
        url: "/SalesDashboardView/list",
        title: "List",
        query: [
          {
            key: "page",
            value: "1",
            description: "Page number",
            active: true,
          },
          {
            key: "limit",
            value: "10",
            description: "Limit number",
            active: true,
          },
          {
            key: "sortBy",
            value: "createdAt",
            description: "Sort by",
            active: true,
          },
          {
            key: "sortOrder",
            value: "desc",
            description: "Sort order",
            active: true,
          },
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {
          type: "json",
          content: {
            field: {
              //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
              operator: "eq",
              value: "string",
              //if operator is range, values: [min, max]
            },
          },
        },
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/SalesDashboardView/list",
        title: "List",
        query: [
          {
            key: "page",
            value: "1",
            description: "Page number",
            active: true,
          },
          {
            key: "limit",
            value: "10",
            description: "Limit number",
            active: true,
          },
          {
            key: "sortBy",
            value: "createdAt",
            description: "Sort by",
            active: true,
          },
          {
            key: "sortOrder",
            value: "desc",
            description: "Sort order",
            active: true,
          },
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "POST",
        url: "/SalesDashboardView/count",
        title: "Count",
        query: [
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {
          type: "json",
          content: {
            field: {
              //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
              operator: "eq",
              value: "string",
              //if operator is range, values: [min, max]
            },
          },
        },
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/SalesDashboardView/count",
        title: "Count",
        query: [
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/SalesDashboardView/schema",
        title: "Schema",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/SalesDashboardView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "NotificationTriggerOrderView",
    description: "",
    reference: {
      tableName: "NotificationTriggerOrderView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/NotificationTriggerOrderView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/NotificationTriggerOrderView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "NotificationExportJobView",
    description: "",
    reference: {
      tableName: "NotificationExportJobView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/NotificationExportJobView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/NotificationExportJobView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "exportJobDetailView",
    description: "",
    reference: {
      tableName: "exportJobDetailView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/exportJobDetailView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/exportJobDetailView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "AdminExportJobView",
    description: "",
    reference: {
      tableName: "AdminExportJobView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/AdminExportJobView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/AdminExportJobView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "SalesReportDashboardView",
    description: "",
    reference: {
      tableName: "SalesReportDashboardView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "POST",
        url: "/SalesReportDashboardView/list",
        title: "List",
        query: [
          {
            key: "page",
            value: "1",
            description: "Page number",
            active: true,
          },
          {
            key: "limit",
            value: "10",
            description: "Limit number",
            active: true,
          },
          {
            key: "sortBy",
            value: "createdAt",
            description: "Sort by",
            active: true,
          },
          {
            key: "sortOrder",
            value: "desc",
            description: "Sort order",
            active: true,
          },
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {
          type: "json",
          content: {
            field: {
              //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
              operator: "eq",
              value: "string",
              //if operator is range, values: [min, max]
            },
          },
        },
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/SalesReportDashboardView/list",
        title: "List",
        query: [
          {
            key: "page",
            value: "1",
            description: "Page number",
            active: true,
          },
          {
            key: "limit",
            value: "10",
            description: "Limit number",
            active: true,
          },
          {
            key: "sortBy",
            value: "createdAt",
            description: "Sort by",
            active: true,
          },
          {
            key: "sortOrder",
            value: "desc",
            description: "Sort order",
            active: true,
          },
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "POST",
        url: "/SalesReportDashboardView/count",
        title: "Count",
        query: [
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {
          type: "json",
          content: {
            field: {
              //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
              operator: "eq",
              value: "string",
              //if operator is range, values: [min, max]
            },
          },
        },
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/SalesReportDashboardView/count",
        title: "Count",
        query: [
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/SalesReportDashboardView/schema",
        title: "Schema",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/SalesReportDashboardView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "notificationOrderPlacedView",
    description: "",
    reference: {
      tableName: "notificationOrderPlacedView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/notificationOrderPlacedView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/notificationOrderPlacedView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "notificationOrderStatusShippedView",
    description: "",
    reference: {
      tableName: "notificationOrderStatusShippedView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/notificationOrderStatusShippedView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/notificationOrderStatusShippedView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "notificationPaymentSuccessView",
    description: "",
    reference: {
      tableName: "notificationPaymentSuccessView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/notificationPaymentSuccessView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/notificationPaymentSuccessView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "notificationOrderRefundProcessedView",
    description: "",
    reference: {
      tableName: "notificationOrderRefundProcessedView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/notificationOrderRefundProcessedView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/notificationOrderRefundProcessedView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  inject(app, config);
};
