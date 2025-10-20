const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "ecomm - notificationPreferences",
    brand: {
      name: "ecomm",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "notificationPreferences",
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
        name: "UserNotificationPreferences",
        description:
          "Stores notification preferences for a user, indicating which event types (order, shipping, promo, payment, system) they wish to receive notifications for.",
        reference: {
          tableName: "userNotificationPreferences",
          properties: [
            {
              name: "userId",
              type: "ID",
            },

            {
              name: "orderUpdates",
              type: "Boolean",
            },

            {
              name: "shippingUpdates",
              type: "Boolean",
            },

            {
              name: "promoOptIn",
              type: "Boolean",
            },

            {
              name: "paymentEvents",
              type: "Boolean",
            },

            {
              name: "systemEvents",
              type: "Boolean",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/usernotificationpreferencess`,
            title: "Create Usernotificationpreferences",
            query: [],

            body: {
              type: "json",
              content: {
                orderUpdates: "Boolean",
                shippingUpdates: "Boolean",
                promoOptIn: "Boolean",
                paymentEvents: "Boolean",
                systemEvents: "Boolean",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/usernotificationpreferencess/{userNotificationPreferencesId}`,
            title: "Get Usernotificationpreferences",
            query: [],

            parameters: [
              {
                key: "userNotificationPreferencesId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/usernotificationpreferencess/{userNotificationPreferencesId}`,
            title: "Update Usernotificationpreferences",
            query: [],

            body: {
              type: "json",
              content: {
                orderUpdates: "Boolean",
                shippingUpdates: "Boolean",
                promoOptIn: "Boolean",
                paymentEvents: "Boolean",
                systemEvents: "Boolean",
              },
            },

            parameters: [
              {
                key: "userNotificationPreferencesId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/usernotificationpreferencess/{userNotificationPreferencesId}`,
            title: "Delete Usernotificationpreferences",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "userNotificationPreferencesId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/usernotificationpreferencess`,
            title: "List Usernotificationpreferences",
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
        name: "AdminNotificationConfig",
        description:
          "Stores notification configuration for administrators, specifying which system events should trigger notifications, preferred delivery channels, and enablement status.",
        reference: {
          tableName: "adminNotificationConfig",
          properties: [
            {
              name: "adminId",
              type: "ID",
            },

            {
              name: "triggerEvents",
              type: "[String]",
            },

            {
              name: "notifyBy",
              type: "[String]",
            },

            {
              name: "enabled",
              type: "Boolean",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/adminnotificationconfigs`,
            title: "Create Adminnotificationconfig",
            query: [],

            body: {
              type: "json",
              content: {
                triggerEvents: "String",
                notifyBy: "String",
                enabled: "Boolean",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/adminnotificationconfigs/{adminNotificationConfigId}`,
            title: "Get Adminnotificationconfig",
            query: [],

            parameters: [
              {
                key: "adminNotificationConfigId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/adminnotificationconfigs/{adminNotificationConfigId}`,
            title: "Update Adminnotificationconfig",
            query: [],

            body: {
              type: "json",
              content: {
                triggerEvents: "String",
                notifyBy: "String",
                enabled: "Boolean",
              },
            },

            parameters: [
              {
                key: "adminNotificationConfigId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/adminnotificationconfigs/{adminNotificationConfigId}`,
            title: "Delete Adminnotificationconfig",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "adminNotificationConfigId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/adminnotificationconfigs`,
            title: "List Adminnotificationconfigs",
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
