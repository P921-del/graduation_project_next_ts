
import Registercomp from "@/components/Registercomp"
import { Metadata } from "next"
export  function generateMetadata():Metadata{
    return{
        title:"Register"
    }
}
export default function Register(){
        return <Registercomp/>
}