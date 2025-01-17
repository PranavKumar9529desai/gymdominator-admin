"use client";
import React from "react";
import BottomNavigation from "@/components/common/bottomnavigation";
import { menuItems } from "./sidebar";

export default function OwnerDashboardBottomNavigation() {
  return <BottomNavigation menuItems={menuItems} basePath="/ownerdashboard" />;
}
