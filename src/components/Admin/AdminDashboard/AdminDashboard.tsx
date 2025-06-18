"use client";
import React, { useEffect, useState } from "react";
import "../../Admin/AdminDashboard/AdminDashboard.css";
import { MdAnalytics } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
type Props = {};
const todayDate = new Date();

function AdminDashboard({}: Props) {
  const [totalProfits, setTotalProfits] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  useEffect(() => {
    const totalProfitsInterval = setInterval(() => {
      const increase = Math.ceil(25024 / 1000);
      setTotalProfits((prevtotalProfits) => {
        const newTotalPrfoits = prevtotalProfits + increase;
        return newTotalPrfoits > 25024 ? 25024 : newTotalPrfoits;
      });
    }, 300);
    return () => clearInterval(totalProfitsInterval);
  }, []);
  useEffect(() => {
    const totalExpensesInterval = setInterval(() => {
      const increase = Math.ceil(14160 / 1000);
      setTotalExpenses((prevtotalExpenses) => {
        const newTotalExpenses = prevtotalExpenses + increase;
        return newTotalExpenses > 14160 ? 14160 : newTotalExpenses;
      });
    }, 300);
    return () => clearInterval(totalExpensesInterval);
  }, [totalExpenses]);
  useEffect(() => {
    const totalIncomeInterval = setInterval(() => {
      const increase = Math.ceil(10864 / 1000);
      setTotalIncome((prevtotalIncome) => {
        const newTotalIncome = prevtotalIncome + increase;
        return newTotalIncome > 10864 ? 10864 : newTotalIncome;
      });
    }, 300);
    return () => clearInterval(totalIncomeInterval);
  }, [totalIncome]);
  return (
    <main>
      <h1 className="font-sans font-bold text-5xl">Dashboard</h1>

      <div className="date">
        <span>
          {(todayDate.getMonth() + 1).toString().length === 1
            ? "0" + (todayDate.getMonth() + 1).toString()
            : (todayDate.getMonth() + 1).toString()}
        </span>
        <span>/</span>
        <span>
          {todayDate.getDate().toString().length === 1
            ? "0" + todayDate.getDate().toString()
            : todayDate.getDate().toString()}
        </span>
        <span>/</span>
        <span>{todayDate.getFullYear()}</span>
        <MdOutlineDateRange className="ml-4 font-sans text-2xl" />
      </div>
      {/* START INSIGHTS SECION */}
      <div className="insights">
        {/*START SALES SECTION*/}
        <div className="sales">
          <MdAnalytics className="icon" />
          <div className="middle">
            <div className="left">
              <h3>Total Profits</h3>
              {/*formating Number */}
              <h1>{"$" + new Intl.NumberFormat().format(totalProfits)}</h1>
            </div>
            <div className="progress">
              <svg>
                <circle
                  cx="38"
                  cy="38"
                  r="36"
                  style={{
                    strokeDasharray:
                      (Math.ceil((totalProfits * 100) / 30518) * 200) / 82,
                  }}
                ></circle>
              </svg>
              <div className="number">
                <p>{Math.ceil((totalProfits * 100) / 30518) + "%"}</p>
              </div>
            </div>
          </div>
          <small className="text-muted">Last 24 Hours</small>
        </div>
        {/*END EXPENSES SECTION*/}
        {/*START SALES SECTION*/}
        <div className="expenses">
          <MdOutlineAnalytics className="icon" />
          <div className="middle">
            <div className="left">
              <h3>Total Expenses</h3>
              {/*formating Number */}
              <h1>{"$" + new Intl.NumberFormat().format(totalExpenses)}</h1>
            </div>
            <div className="progress">
              <svg>
                <circle
                  style={{
                    strokeDasharray:
                      (Math.ceil((totalExpenses * 100) / 22839) * 80) / 62,
                  }}
                  cx="38"
                  cy="38"
                  r="36"
                ></circle>
              </svg>
              <div className="number">
                <p>{Math.ceil((totalExpenses * 100) / 22839) + "%"}</p>
                {/*62% */}
              </div>
            </div>
          </div>
          <small className="text-muted">Last 24 Hours</small>
        </div>
        {/*END EXPENSES SECTION*/}
        {/*START INCOME SECTION*/}
        <div className="income">
          <IoAnalyticsSharp className="icon" />
          <div className="middle">
            <div className="left">
              <h3>Total Income</h3>
              {/*formating Number */}
              <h1>{"$" + new Intl.NumberFormat().format(totalIncome)}</h1>
            </div>
            <div className="progress">
              <svg>
                <circle
                  style={{
                    strokeDasharray:
                      (Math.ceil((totalIncome * 100) / 24691) * 110) / 44,
                  }}
                  cx="38"
                  cy="38"
                  r="36"
                ></circle>
              </svg>
              <div className="number">
                <p>{Math.ceil((totalIncome * 100) / 24691) + "%"}</p>
                {/*44% */}
              </div>
            </div>
          </div>
          <small className="text-muted">Last 24 Hours</small>
        </div>
        {/*END INCOME SECTION*/}
      </div>
      {/* END INSIGHTS SECION */}
    </main>
  );
}

export default AdminDashboard;
