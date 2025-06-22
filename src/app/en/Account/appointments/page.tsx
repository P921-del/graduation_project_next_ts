import { ManageRestoProvider } from "@/app/Context/ManageRestoContext";
import AppointmentComponent from "@/components/userOrdersAndAppointments/Appointments";
import { Metadata } from "next";
export const generateMetaData =():Metadata=>{
  return{
    title:"Appointments",
  }
}
export default function Appointments(){
    return(
        <ManageRestoProvider>
            <AppointmentComponent/>
        </ManageRestoProvider>
    )
}