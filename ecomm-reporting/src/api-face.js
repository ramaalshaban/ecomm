const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "ecomm - reporting",
    brand: {
      name: "ecomm",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "reporting",
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
        name: "SalesReport",
        description:
          "Aggregated business/sales analytics snapshot for defined date range (on-demand for reporting/dashboard).",
        reference: {
          tableName: "salesReport",
          properties: [
            {
              name: "dateRange",
              type: "Object",
            },

            {
              name: "totalRevenue",
              type: "Double",
            },

            {
              name: "orderCount",
              type: "Integer",
            },

            {
              name: "productCount",
              type: "Integer",
            },

            {
              name: "bestsellers",
              type: "[Object]",
            },

            {
              name: "refundsTotal",
              type: "Double",
            },

            {
              name: "exportJobId",
              type: "ID",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/salesreports`,
            title: "Create Salesreport",
            query: [],

            body: {
              type: "json",
              content: {
                dateRange: "Object",
                totalRevenue: "Double",
                orderCount: "Integer",
                productCount: "Integer",
                bestsellers: "Object",
                refundsTotal: "Double",
                exportJobId: "ID",
              },
            },

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "ExportJob",
        description:
          "Tracks an export operation for orders or product catalog (for CSV/JSON download by admin).",
        reference: {
          tableName: "exportJob",
          properties: [
            {
              name: "exportType",
              type: "Enum",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "requestedBy",
              type: "ID",
            },

            {
              name: "startedAt",
              type: "Date",
            },

            {
              name: "completedAt",
              type: "Date",
            },

            {
              name: "downloadUrl",
              type: "String",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/exportjobs`,
            title: "Create Exportjob",
            query: [],

            body: {
              type: "json",
              content: {
                exportType: "Enum",
                status: "Enum",
                completedAt: "Date",
                downloadUrl: "String",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/exportjobs/{exportJobId}`,
            title: "Get Exportjob",
            query: [],

            parameters: [
              {
                key: "exportJobId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/exportjobs`,
            title: "List Exportjobs",
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
        name: "ReportingJobAudit",
        description:
          "(Optional: for extension) Audit log for reporting/export operations (who, when, what). Not exposed in CRUD for MVP.",
        reference: {
          tableName: "reportingJobAudit",
          properties: [
            {
              name: "exportJobId",
              type: "ID",
            },

            {
              name: "action",
              type: "String",
            },

            {
              name: "timestamp",
              type: "Date",
            },

            {
              name: "details",
              type: "Object",
            },
          ],
        },
        endpoints: [],
      },
    ],
  };

  inject(app, config);
};
