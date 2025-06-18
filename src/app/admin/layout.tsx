"use client";
import React, { useRef, useState } from "react";
import "../../components/Admin/AdminStyles.css";
import AdminSidebar from "../../components/Admin/AdminSidebar/AdminSidebar";
import { FiMenu } from "react-icons/fi";
import { IoSunny } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloudOffline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import useMediaQuery from "../../Hooks/useMediaQuery";
const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const menu_btn = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  function HandleCloseButton(data: boolean) {
    setShowSidebar(data);
  }
  return (
    <div className="w-full my-0 flex flex-row bg-gray-100">
      <AdminSidebar
        isMobile={isMobile}
        showSidebar={showSidebar}
        sendData={HandleCloseButton}
      />
      {children}
      <div className="right">
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
                Hey, <b>Salem</b>
                <div className="text-muted">Admin</div>
              </p>
            </div>
            <div className="profile-photo bg-slate-300">
              <IoPerson className="text-3xl text-indigo-500 rounded-full" />
            </div>
          </div>
        </div>
        {/* END TOP SECTION */}
        {/*START RECENT-UPDATES SECTION */}
        <div className="recent-updates">
          <h2 className="font-sans font-bold text-3xl">Recent Updates</h2>
          <div className="updates">
            <div className="update">
              <div className="profile-photo">
                <IoPerson className="text-3xl text-indigo-500" />
              </div>
              <div className="messsage">
                <p>
                  <b>Mike Tyson</b> received his order of Night lion tech GPS
                  done.
                </p>
                <small className="text-muted"> 2 Minutes Ago</small>
              </div>
            </div>
            <div className="update">
              <div className="profile-photo">
                <IoPerson className="text-3xl text-indigo-500" />
              </div>
              <div className="messsage">
                <p>
                  <b>Mike Tyson</b> received his order of Night lion tech GPS
                  done.
                </p>
                <small className="text-muted"> 2 Minutes Ago</small>
              </div>
            </div>
            <div className="update">
              <div className="profile-photo">
                <IoPerson className="text-3xl text-indigo-500" />
              </div>
              <div className="messsage">
                <p>
                  <b>Mike Tyson</b> received his order of Night lion tech GPS
                  done.
                </p>
                <small className="text-muted"> 2 Minutes Ago</small>
              </div>
            </div>
          </div>
        </div>
        {/*END RECENT-UPDATES SECTION */}
        {/*START SALES ANALYTICS SECTION */}
        <div className="sales-analytics">
          <h2 className="font-sans font-bold text-3xl">Sales Analytics</h2>
          <div className="item online">
            <div className="icon">
              <FaShoppingCart />
            </div>
            <div className="right">
              <div className="info">
                <h3 className="card-text">ONLINE ORDERS</h3>
                <small className="text-muted">Last 24 Hours</small>
              </div>
              <h5 className="text-green-300">+39%</h5>
              <h3 className="card-text">3849</h3>
            </div>
          </div>
          <div className="item offline">
            <div className="icon">
              <IoCloudOffline />
            </div>
            <div className="right">
              <div className="info">
                <h3 className="card-text">OFFLINE ORDERS</h3>
                <small className="text-muted">Last 24 Hours</small>
              </div>
              <h5 className="text-red-500">-17%</h5>
              <h3 className="card-text">1100</h3>
            </div>
          </div>
          <div className="item customars">
            <div className="icon">
              <IoPerson />
            </div>
            <div className="right">
              <div className="info">
                <h3 className="card-text">NEW CUSTOMARS</h3>
                <small className="text-muted">Last 24 Hours</small>
              </div>
              <h5 className="text-green-300">+25%</h5>
              <h3 className="card-text">849</h3>
            </div>
          </div>
          <div className="item add-item">
            <div>
              <IoMdAdd />
              <h3>Add Item</h3>
            </div>
          </div>
        </div>
        {/*END SALES ANALYTICS SECTION */}
      </div>
    </div>
  );
};

export default AdminLayout;
