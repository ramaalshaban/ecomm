import axios from "axios";

import { CONFIG } from "src/global-config";

const notificationPreferencesAxiosInstance = axios.create({
  baseURL: CONFIG.notificationPreferencesServiceUrl,
});

notificationPreferencesAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default notificationPreferencesAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await notificationPreferencesAxiosInstance.get(url, {
      ...config,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const notificationPreferencesEndpoints = {
  userNotificationPreferences: {
    createUserNotificationPreferences: "/v1/usernotificationpreferencess",

    getUserNotificationPreferences:
      "/v1/usernotificationpreferencess/:userNotificationPreferencesId",

    updateUserNotificationPreferences:
      "/v1/usernotificationpreferencess/:userNotificationPreferencesId",

    deleteUserNotificationPreferences:
      "/v1/usernotificationpreferencess/:userNotificationPreferencesId",

    listUserNotificationPreferences: "/v1/usernotificationpreferencess",
  },

  adminNotificationConfig: {
    createAdminNotificationConfig: "/v1/adminnotificationconfigs",

    getAdminNotificationConfig:
      "/v1/adminnotificationconfigs/:adminNotificationConfigId",

    updateAdminNotificationConfig:
      "/v1/adminnotificationconfigs/:adminNotificationConfigId",

    deleteAdminNotificationConfig:
      "/v1/adminnotificationconfigs/:adminNotificationConfigId",

    listAdminNotificationConfigs: "/v1/adminnotificationconfigs",
  },
};
