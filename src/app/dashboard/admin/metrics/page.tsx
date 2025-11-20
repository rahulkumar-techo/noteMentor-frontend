"use client";

import { useGetMetricsQuery } from "@/feature/metrics/metricsApi";
import MatricLayout from "@/components/metrics/Metrics";
import { useEffect, useState } from "react";
import NoteSkeleton from "@/components/common/skeletonLoader";

const Page = () => {
  const { data: metrics, isLoading } = useGetMetricsQuery(undefined, {
    pollingInterval: 5000, // fetch every 5 seconds
  });

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (metrics) {
      setHistory((prev) => [...prev.slice(-50), metrics]);
    }
  }, [metrics]);

  if (isLoading || !metrics) {
    return <NoteSkeleton type="overview"/>
  }

  return (
    <div>
      <MatricLayout metrics={metrics} history={history} />
    </div>
  );
};

export default Page;
