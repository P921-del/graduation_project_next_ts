"use client"
import { ManageRestoProvider } from "@/app/Context/ManageRestoContext";
import { useParams } from "next/navigation";
import Menu from "@/components/Restaurants/Menu&Cart/Menu";
export default function ShowMenu(){
    const { restoId } = useParams()
    return(
        <div className="menu">
            <ManageRestoProvider>
                <Menu restoId={restoId} />
            </ManageRestoProvider>
        </div>
    )
}