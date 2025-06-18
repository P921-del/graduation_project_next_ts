import RecentOrders from "@/components/Admin/RecentOrders/RecentOrders";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "adminRecentOrders",
  };
}
export default function adminRecentOrders() {
  return <RecentOrders />;
}
