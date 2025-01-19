import React from "react";
import { GetDashboardData } from "./GetDashboardData";
import DashboardStats from "./DashboardStats";
import SetupScreen from "./components/SetupScreen";
import ErrorScreen from "./components/ErrorScreen";
import { DashboardData, DashboardError } from "./types";

type DashboardResponse = DashboardData | DashboardError;

export default async function Page() {
  const dashboardData = await GetDashboardData();

  const isError = (data: DashboardResponse): data is DashboardError => {
    return 'error' in data;
  };

  if (isError(dashboardData) && dashboardData.error === "NO_GYM_FOUND") {
    return <SetupScreen />;
  }

  if (isError(dashboardData)) {
    return <ErrorScreen error={dashboardData.error} />;
  }

  // Transform the data to match the expected type
  const transformedData = {
    ...dashboardData,
    recentActivities: dashboardData.recentActivities.map(activity => ({
      ...activity,
      Validperiod: activity.Validperiod || undefined
    }))
  };

  return <DashboardStats data={transformedData} />;
}
