import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  orderManagementEndpoints,
} from "src/lib/orderManagement-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useOrderManagementGetOrder(orderId) {
  let url = orderId ? [orderManagementEndpoints.order.getOrder] : "";

  url = url && url.map((u) => u.replace(":orderId", orderId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      order: data?.order,
      orderLoading: isLoading,
      orderError: error,
      orderValidating: isValidating,
    }),
    [data?.order, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useOrderManagementGetOrderPayment2(sys_orderPaymentId) {
  let url = sys_orderPaymentId
    ? [orderManagementEndpoints.sys_orderPayment.getOrderPayment2]
    : "";

  url =
    url && url.map((u) => u.replace(":sys_orderPaymentId", sys_orderPaymentId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      sys_orderPayment: data?.sys_orderPayment,
      sys_orderPaymentLoading: isLoading,
      sys_orderPaymentError: error,
      sys_orderPaymentValidating: isValidating,
    }),
    [data?.sys_orderPayment, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useOrderManagementGetOrderPaymentByOrderId(sys_orderPaymentId) {
  let url = sys_orderPaymentId
    ? [orderManagementEndpoints.sys_orderPayment.getOrderPaymentByOrderId]
    : "";

  url =
    url && url.map((u) => u.replace(":sys_orderPaymentId", sys_orderPaymentId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      sys_orderPayment: data?.sys_orderPayment,
      sys_orderPaymentLoading: isLoading,
      sys_orderPaymentError: error,
      sys_orderPaymentValidating: isValidating,
    }),
    [data?.sys_orderPayment, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useOrderManagementGetOrderPaymentByPaymentId(
  sys_orderPaymentId,
) {
  let url = sys_orderPaymentId
    ? [orderManagementEndpoints.sys_orderPayment.getOrderPaymentByPaymentId]
    : "";

  url =
    url && url.map((u) => u.replace(":sys_orderPaymentId", sys_orderPaymentId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      sys_orderPayment: data?.sys_orderPayment,
      sys_orderPaymentLoading: isLoading,
      sys_orderPaymentError: error,
      sys_orderPaymentValidating: isValidating,
    }),
    [data?.sys_orderPayment, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useOrderManagementGetPaymentCustomerByUserId(
  sys_paymentCustomerId,
) {
  let url = sys_paymentCustomerId
    ? [orderManagementEndpoints.sys_paymentCustomer.getPaymentCustomerByUserId]
    : "";

  url =
    url &&
    url.map((u) => u.replace(":sys_paymentCustomerId", sys_paymentCustomerId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      sys_paymentCustomer: data?.sys_paymentCustomer,
      sys_paymentCustomerLoading: isLoading,
      sys_paymentCustomerError: error,
      sys_paymentCustomerValidating: isValidating,
    }),
    [data?.sys_paymentCustomer, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useOrderManagementListOrders() {
  const url = [orderManagementEndpoints.order.listOrders];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.orders || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.order?.length,
    }),
    [data?.order, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useOrderManagementListOrderPayments2() {
  const url = [orderManagementEndpoints.sys_orderPayment.listOrderPayments2];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.sys_orderPayments || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.sys_orderPayment?.length,
    }),
    [data?.sys_orderPayment, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useOrderManagementListPaymentCustomers() {
  const url = [
    orderManagementEndpoints.sys_paymentCustomer.listPaymentCustomers,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.sys_paymentCustomers || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.sys_paymentCustomer?.length,
    }),
    [data?.sys_paymentCustomer, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useOrderManagementListPaymentCustomerMethods() {
  const url = [
    orderManagementEndpoints.sys_paymentMethod.listPaymentCustomerMethods,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.sys_paymentMethods || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.sys_paymentMethod?.length,
    }),
    [data?.sys_paymentMethod, error, isLoading, isValidating],
  );

  return memoizedValue;
}
