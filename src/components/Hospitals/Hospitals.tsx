"use client"
import { FaSpinner } from "react-icons/fa";
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
    const[hospitals ,setHospitals]=useState<Hospitals[]>([])
useEffect(()=>{
    const timeout =setTimeout(()=>{
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
    },1500)
    return ()=> clearTimeout(timeout)
},[])
    return(<>
        <div className="main">
            <MainHeaderForEachComponent
            mainHeader={mainHeaderForRestaurantComponent}
            />
            <h1 className="text-black text-4xl font-serif font-bold my-4 text-center">
                The closest government hospitals to your location is in Assiut
            </h1>
            {
                hospitals.length > 0 ?(
            <div className="container mx-auto">
                
                <div className="allHospitals grid grid-cols-2 my-20 gap-3 duration-700">
                    {
                        hospitals?.map((hospital:Hospitals)=>(
                            <HospitalCard key={hospital.hospitalId}  hospital={hospital}/>
                        ))
                    }
                </div>
            </div>):
            <div className="spin h-96">
            <div className="flex justify-center h-full items-center">
            <h2 className="text-5xl text-blue-700">Loading..</h2>
            <FaSpinner className="animate-spin text-blue-500 text-6xl" />
            </div>
            </div>
            }
        </div>
    </>)
}