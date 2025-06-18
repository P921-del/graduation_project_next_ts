import AdminDashboard from "@/components/Admin/AdminDashboard/AdminDashboard";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "adminDashboard",
  };
}
export default function adminDashboard() {
  return <AdminDashboard />;
}
