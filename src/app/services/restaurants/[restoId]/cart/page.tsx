"use client"
import { ManageRestoProvider } from "@/app/Context/ManageRestoContext";
import CartItems from "@/components/Restaurants/Menu&Cart/Cart";
import { useParams } from "next/navigation";
export default function Cart(){
    const { restoId } = useParams()
    return(
        <ManageRestoProvider>
            <CartItems restoId={restoId}/>
        </ManageRestoProvider>
    )
}