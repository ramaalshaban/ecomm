import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, cartEndpoints } from "src/lib/cart-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useCartGetCart(cartId) {
  let url = cartId ? [cartEndpoints.cart.getCart] : "";

  url = url && url.map((u) => u.replace(":cartId", cartId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      cart: data?.cart,
      cartLoading: isLoading,
      cartError: error,
      cartValidating: isValidating,
    }),
    [data?.cart, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCartListCarts() {
  const url = [cartEndpoints.cart.listCarts];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.carts || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.cart?.length,
    }),
    [data?.cart, error, isLoading, isValidating],
  );

  return memoizedValue;
}
