import { ManageRestoProvider } from "@/app/Context/ManageRestoContext";
import OrdersComponent from "@/components/userOrdersAndAppointments/Orders";

import { Metadata } from "next";
export const generateMetaData =():Metadata=>{
  return{
    title:"Orders",
  }
}
export default function Orders(){
    return(
        <ManageRestoProvider>
            <OrdersComponent/>
        </ManageRestoProvider>
    )
}