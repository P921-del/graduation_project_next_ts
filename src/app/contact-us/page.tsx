import ContactPage from "@/components/Contact Us/ContactPage";
import { Metadata } from "next";
export const generateMetaData =():Metadata=>{
  return{
    title:"Contact",
  }
}
  
export default function Contact() {
  return <ContactPage />;
}
