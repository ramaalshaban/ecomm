import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, reportingEndpoints } from "src/lib/reporting-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useReportingGetExportJob(exportJobId) {
  let url = exportJobId ? [reportingEndpoints.exportJob.getExportJob] : "";

  url = url && url.map((u) => u.replace(":exportJobId", exportJobId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      exportJob: data?.exportJob,
      exportJobLoading: isLoading,
      exportJobError: error,
      exportJobValidating: isValidating,
    }),
    [data?.exportJob, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useReportingListExportJobs() {
  const url = [reportingEndpoints.exportJob.listExportJobs];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.exportJobs || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.exportJob?.length,
    }),
    [data?.exportJob, error, isLoading, isValidating],
  );

  return memoizedValue;
}
