import AdminDashboard from "@/components/Admin/AdminDashboard/AdminDashboard";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "admin",
  };
}
export default function adminDashboard() {
  return <AdminDashboard />;
}
