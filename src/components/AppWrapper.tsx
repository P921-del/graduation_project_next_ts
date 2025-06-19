"use client";

import { usePathname, useRouter } from "next/navigation";
import { Provider, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(children);
  const pathname = usePathname();
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  const isLoading = auth === undefined;
  useEffect(() => {
    if (!isLoading) {
      if (auth !== undefined) {
        if (pathname === "/en/Account/Profile" && !auth.userToken) {
          router.push("/login");
        } else if (
          !pathname.startsWith("/admin-doctor") &&
          auth.userToken &&
          auth.user?.roles === "ClinicStaff"
        ) {
          router.push("/admin-doctor");
        } else if (
          pathname === "/en/Account/Profile" &&
          auth.user?.roles === "ClinicStaff"
        ) {
          router.push("/unauthorized");
        } else if (pathname.startsWith("/admin-doctor") && !auth.userToken) {
          router.push("/login");
        } else if (
          pathname.startsWith("/admin-doctor") &&
          auth.user?.roles === "User"
        ) {
          router.push("/unauthorized");
        }
      }
    }
  }, [isLoading, auth]);

  const hideUIPaths = [
    "/unauthorized",
    "/login",
    "/register",
    "/en/doctors/Reservation/create",
    "/admin",
    "/admin/dashboard",
    "/admin/recent-orders",
    "/admin-doctor",
    "/admin-doctor/dashboard",
    "/admin-doctor/admin-doctor-appointments",
    "/admin-doctor/admin-doctor-profile",
    "/admin-doctor/scheduling_the_days_of_the_week",
    "/admin-doctor/admin-doctor-reports",
  ];

  const showUI = !hideUIPaths.includes(pathname);

  return (
    <>
      {showUI && <Navbar />}
      <Toaster position="bottom-center" />
      {children}
      {showUI && <Footer />}
    </>
  );
}
