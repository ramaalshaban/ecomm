import cartAxios from "src/lib/cart-axios";
import authAxios from "src/lib/auth-axios";
import reportingAxios from "src/lib/reporting-axios";
import productCatalogAxios from "src/lib/productCatalog-axios";
import orderManagementAxios from "src/lib/orderManagement-axios";
import notificationPreferencesAxios from "src/lib/notificationPreferences-axios";

import { JWT_STORAGE_KEY } from "./constant";

export function jwtDecode(token) {
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length < 2) {
      throw new Error("Invalid token!");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
}

export function isValidToken(accessToken) {
  if (!accessToken) {
    return false;
  }

  try {
    return jwtDecode(accessToken);
  } catch (error) {
    console.error("Error during token validation:", error);
    return false;
  }
}

export async function setSession(accessToken) {
  try {
    if (accessToken) {
      sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);

      productCatalogAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      cartAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      orderManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      notificationPreferencesAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      reportingAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      authAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const decodedToken = jwtDecode(accessToken);

      if (!decodedToken) {
        throw new Error("Invalid access token!");
      }
      return decodedToken;
    } else {
      sessionStorage.removeItem(JWT_STORAGE_KEY);

      delete productCatalogAxios.defaults.headers.common.Authorization;

      delete cartAxios.defaults.headers.common.Authorization;

      delete orderManagementAxios.defaults.headers.common.Authorization;

      delete notificationPreferencesAxios.defaults.headers.common.Authorization;

      delete reportingAxios.defaults.headers.common.Authorization;

      delete authAxios.defaults.headers.common.Authorization;

      return null;
    }
  } catch (error) {
    console.error("Error during set session:", error);
    throw error;
  }
}
