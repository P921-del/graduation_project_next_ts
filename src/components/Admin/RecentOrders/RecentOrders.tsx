import React from "react";
import "./RecentOrders.css";
type Props = {};

function RecentOrders({}: Props) {
  return (
    <div className="recent-orders">
      <h2 className="font-sans text-5xl mb-16">
        <b>Recent Orders</b>
      </h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Number</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="text-yellow-500">Pending...</td>
            <td className="text-indigo-500">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="text-yellow-500">Pending...</td>
            <td className="text-indigo-500">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="text-yellow-500">Pending...</td>
            <td className="text-indigo-500">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="text-yellow-500">Pending...</td>
            <td className="text-indigo-500">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="text-yellow-500">Pending...</td>
            <td className="text-indigo-500">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="text-yellow-500">Pending...</td>
            <td className="text-indigo-500">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="text-yellow-500">Pending...</td>
            <td className="text-indigo-500">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="text-yellow-500">Pending...</td>
            <td className="text-indigo-500">Details</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrders;
