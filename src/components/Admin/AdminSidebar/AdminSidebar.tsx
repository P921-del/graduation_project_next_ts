import React, { useRef } from "react";
import "./AdminSidebar.css";
import { IoClose } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { GiHotMeal } from "react-icons/gi";
import { BiSolidPizza } from "react-icons/bi";
import { GrRestaurant } from "react-icons/gr";
import { BsFillFileMedicalFill } from "react-icons/bs";
import { FaClinicMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdContactPage } from "react-icons/md";
import { GoReport } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
type Props = {
  isMobile: boolean;
  showSidebar: boolean;
  sendData: (data: boolean) => void;
};

function AdminSidebar(props: Props) {
  const close_btn = useRef<HTMLDivElement>(null);
  const router = useRouter();
  return (
    <aside
      style={
        props.isMobile
          ? props.showSidebar
            ? { display: "block" }
            : { display: "none" }
          : {}
      }
      className="w-[35%] md:w-[20%] h-screen bg-gray-100"
    >
      <div className="top">
        <div className="logo" onClick={() => router.push("/admin")}>
          <img
            className="bg-transparent"
            src={"/assets/Images/logo/services-provider-logo.jpg"}
            alt={"logoImage"}
          />
          <h2 className="font-sans font-extrabold text-lg">
            ASSUI<span className="text-red-400">5DAMAT</span>
          </h2>
        </div>
        <div
          className="close"
          ref={close_btn}
          onClick={() => {
            if (props.showSidebar && props.isMobile) {
              props.sendData(false);
            }
          }}
        >
          <IoClose className="icon" />
        </div>
      </div>
      <div className="sidebar">
        <Link
          href="/admin/dashboard"
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.classList.add("active");
              if (e.currentTarget.parentElement) {
                for (
                  let i = 0;
                  i < e.currentTarget.parentElement.children.length;
                  i++
                ) {
                  if (
                    e.currentTarget.parentElement.children[i].textContent ===
                    e.currentTarget.textContent
                  ) {
                    continue;
                  }
                  if (
                    e.currentTarget.parentElement.children[
                      i
                    ].classList.contains("active")
                  ) {
                    e.currentTarget.parentElement.children[i].classList.remove(
                      "active"
                    );
                  }
                }
              }
            }
            router.push("/admin/dashboard");
          }}
          className={
            location.pathname === "/admin" ||
            location.pathname === "/admin/dashboard"
              ? "active Link"
              : "Link"
          }
        >
          <MdDashboard className={"icon text-2xl"} />
          <h3>Dashboard</h3>
        </Link>
        <Link href="#" className="Link">
          <IoPersonOutline className={"icon text-2xl"} />
          <h3>users</h3>
        </Link>
        <Link
          href="/admin/recent-orders"
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.classList.add("active");
              if (e.currentTarget.parentElement) {
                for (
                  let i = 0;
                  i < e.currentTarget.parentElement.children.length;
                  i++
                ) {
                  if (
                    e.currentTarget.parentElement.children[i].textContent ===
                    e.currentTarget.textContent
                  ) {
                    continue;
                  }
                  if (
                    e.currentTarget.parentElement.children[
                      i
                    ].classList.contains("active")
                  ) {
                    e.currentTarget.parentElement.children[i].classList.remove(
                      "active"
                    );
                  }
                }
              }
            }
            router.push("/admin/orders");
          }}
          className={
            location.pathname === "/admin/recent-orders"
              ? "active Link"
              : "Link"
          }
        >
          <GiHotMeal className={"icon text-2xl"} />
          <h3>orders</h3>
        </Link>
        <Link href="#" className="Link">
          <BiSolidPizza className={"icon text-2xl"} />
          <h3>AllItems</h3>
        </Link>
        <Link href="#" className="Link">
          <GrRestaurant className={"icon text-2xl"} />
          <h3>Restaurants</h3>
        </Link>
        <Link href="#" className="Link">
          <BsFillFileMedicalFill className={"icon text-2xl"} />
          <h3>Appointments</h3>
        </Link>
        <Link href="#" className="Link">
          <FaClinicMedical className={"icon text-2xl"} />
          <h3>Clinics</h3>
        </Link>
        <Link href="#" className="Link">
          <FaUserDoctor className={"icon text-2xl"} />
          <h3>Doctors</h3>
        </Link>
        <Link href="#" className="Link">
          <MdContactPage className={"icon text-2xl"} />
          <h3>Contact Us</h3>
        </Link>
        <Link
          href="/admin/recent-orders"
          className={location.pathname === "recent-orders" ? "active" : ""}
        >
          <GoReport className={"icon text-2xl"} />
          <h3>Reports</h3>
        </Link>
        <Link href="#" className="Link">
          <IoMdSettings className={"icon text-2xl"} />
          <h3>Settings</h3>
        </Link>
        <div className="Link">
          <MdOutlineLogout className={"icon text-2xl"} />
          <h3>Logout</h3>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
