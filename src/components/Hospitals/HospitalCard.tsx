"use client"
import { FaLocationDot } from "react-icons/fa6";

interface Props{
hospital:{ hospitalId:number,
    hospitalName: string,
    location: string,
    description: string,
    phoneNumber: number,
    website: string,
    openingHours: string,
    hospitalImage: string,
}
}

export default function HospitalCard({ hospital }: Props) {
return (
        <div className="bg-white border-2  text-center border-dashed border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
            {/* <img
            src={hospital.hospitalImage}
            alt={hospital.hospitalName}
            className="w-full h-48 object-cover rounded-lg"
            /> */}
            <h3 className="mt-4 text-xl font-semibold text-gray-900">{hospital.hospitalName}</h3>
            <p className="text-purple-800 flex justify-center">
                <FaLocationDot />{hospital.location}
            </p>
            <p className="text-gray-800 mt-2">{hospital.description}</p>
            <p className="mt-2 text-gray-700">Phone: {hospital.phoneNumber}</p>
            <p className="mt-1 text-gray-700">Open: {hospital.openingHours}</p>
            <a
            href={hospital.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-blue-500 hover:text-blue-700 underline"
            >
            Visit Website
            </a>
        </div>
    );
}