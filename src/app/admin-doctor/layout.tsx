"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../components/Admin Doctor/AdminDoctorStyles.css";
import AdminDoctorSidebar from "../../components/Admin Doctor/AdminDoctorSidebar/AdminDoctorSidebar";
import { FiMenu } from "react-icons/fi";
import { IoSunny } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { usePathname, useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { backendURL } from "@/lib/Slices/auth/authRules";
interface AdminDoctorModel {
  address: string;
  email: string;
  nameU: string;
  phoneNumber: string;
  profileImage: string;
  userName: string;
}
const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const menu_btn = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const pathname = usePathname();
  function HandleCloseButton(data: boolean) {
    setShowSidebar(data);
  }
  const [adminDoctorObject, setAdminDoctorObject] = useState<AdminDoctorModel>({
    address: "",
    email: "",
    nameU: "",
    phoneNumber: "",
    profileImage: "",
    userName: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://citypulse.runasp.net/api/User/GetUserById/${
            store.getState().auth.user?.id
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${store.getState().auth.userToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAdminDoctorObject({
            address: data.address,
            email: data.email,
            nameU: data.nameU,
            phoneNumber: data.phoneNumber,
            profileImage: data.profileImage,
            userName: data.userName,
          });
          console.log(data);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, [store.getState().auth.user?.id]);
  return (
    <div className={"w-full my-0 flex flex-row bg-gray-100"}>
      <AdminDoctorSidebar
        isMobile={isMobile}
        showSidebar={showSidebar}
        sendData={HandleCloseButton}
      />
      {children}
      {pathname === "/admin-doctor/admin-doctor-profile" ? null : (
        <div
          style={
            pathname === "/admin-doctor/admin-doctor-appointments"
              ? { width: "10%" }
              : pathname === "/admin-doctor/admin-doctor-reports"
              ? { width: "25%" }
              : pathname === "/admin-doctor/admin-doctor-profile" ||
                pathname === "/admin-doctor/scheduling_the_days_of_the_week"
              ? { display: "none" }
              : {}
          }
          className="right"
        >
          {/*START TOP SECTION */}
          <div className="top">
            <button
              ref={menu_btn}
              onClick={() => {
                setShowSidebar(true);
              }}
            >
              <FiMenu className="icon" />
            </button>
            <div className="theme-toggle">
              <IoSunny className="icon active" />
              <MdDarkMode className="icon" />
            </div>
            <div className="profile">
              <div className="info">
                <p>
                  Hey, <b>{adminDoctorObject.nameU}</b>
                  <div className="text-muted space-x-0.5">Admin Doctor</div>
                </p>
              </div>
              {adminDoctorObject.profileImage !== "ProfileImage" ? (
                <div className="w-32 h-32 rounded-full border border-gray-100">
                  <img
                    src={backendURL + "/" + adminDoctorObject.profileImage}
                    alt={"AdminDoctor" + adminDoctorObject.nameU}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="profile-photo bg-slate-300">
                  <IoPerson className="text-3xl text-indigo-500 rounded-full" />
                </div>
              )}
            </div>
          </div>
          {/* END TOP SECTION */}
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
