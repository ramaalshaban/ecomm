import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  notificationPreferencesEndpoints,
} from "src/lib/notificationPreferences-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useNotificationPreferencesGetUserNotificationPreferences(
  userNotificationPreferencesId,
) {
  let url = userNotificationPreferencesId
    ? [
        notificationPreferencesEndpoints.userNotificationPreferences
          .getUserNotificationPreferences,
      ]
    : "";

  url =
    url &&
    url.map((u) =>
      u.replace(
        ":userNotificationPreferencesId",
        userNotificationPreferencesId,
      ),
    );

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      userNotificationPreferences: data?.userNotificationPreferences,
      userNotificationPreferencesLoading: isLoading,
      userNotificationPreferencesError: error,
      userNotificationPreferencesValidating: isValidating,
    }),
    [data?.userNotificationPreferences, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useNotificationPreferencesGetAdminNotificationConfig(
  adminNotificationConfigId,
) {
  let url = adminNotificationConfigId
    ? [
        notificationPreferencesEndpoints.adminNotificationConfig
          .getAdminNotificationConfig,
      ]
    : "";

  url =
    url &&
    url.map((u) =>
      u.replace(":adminNotificationConfigId", adminNotificationConfigId),
    );

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      adminNotificationConfig: data?.adminNotificationConfig,
      adminNotificationConfigLoading: isLoading,
      adminNotificationConfigError: error,
      adminNotificationConfigValidating: isValidating,
    }),
    [data?.adminNotificationConfig, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useNotificationPreferencesListUserNotificationPreferences() {
  const url = [
    notificationPreferencesEndpoints.userNotificationPreferences
      .listUserNotificationPreferences,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.userNotificationPreferencess || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading &&
        !isValidating &&
        !data?.userNotificationPreferences?.length,
    }),
    [data?.userNotificationPreferences, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useNotificationPreferencesListAdminNotificationConfigs() {
  const url = [
    notificationPreferencesEndpoints.adminNotificationConfig
      .listAdminNotificationConfigs,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.adminNotificationConfigs || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.adminNotificationConfig?.length,
    }),
    [data?.adminNotificationConfig, error, isLoading, isValidating],
  );

  return memoizedValue;
}
