"use client"
import MainHeaderForEachComponent, {
    ImainRestaurantHeader,
  } from "../mainHeaderForEachComponent";
import { useEffect, useState } from "react"
import HospitalCard from "./HospitalCard"
interface Hospitals{
    hospitalId:number,
    hospitalName: string,
    location: string,
    description: string,
    phoneNumber: number,
    website: string,
    openingHours: string,
    hospitalImage: string,
}
export default function Hospitals(){
    const mainHeaderForRestaurantComponent: ImainRestaurantHeader = {
        image:
        "url('/assets/hospitals/hospital.jpeg')",
        text: "Hospitals In Assuit Government",
        };
    const[hospitals ,setHospitals]=useState<Hospitals[]>()
useEffect(()=>{
const fetchAllHospitals =async()=>{
    const res = await fetch("http://citypulse.runasp.net/api/Hospital/AllHospitals",{
        method:"GET",
    })
    if( res.ok){
            const data =await res.json();
            console.log(data);
            setHospitals(data.$values);
    }
    else{
        console.log("Error fetching hospitals")
    }
    }
    try{
        fetchAllHospitals();
    }catch(e){
        console.log(e)
    }
},[])
    return(<>
        <div className="main">
            <MainHeaderForEachComponent
            mainHeader={mainHeaderForRestaurantComponent}
            />
            <div className="container mx-auto">
                <div className="allHospitals grid grid-cols-2 mt-20 gap-3">
                    {
                        hospitals?.map((hospital:Hospitals)=>(
                            <HospitalCard key={hospital.hospitalId}  hospital={hospital}/>
                        ))
                    }
                </div>
            </div>
        </div>
    </>)
}