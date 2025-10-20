import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, productCatalogEndpoints } from "src/lib/productCatalog-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useProductCatalogGetProduct(productId) {
  let url = productId ? [productCatalogEndpoints.product.getProduct] : "";

  url = url && url.map((u) => u.replace(":productId", productId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      product: data?.product,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useProductCatalogListProducts() {
  const url = [productCatalogEndpoints.product.listProducts];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.products || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.product?.length,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}
