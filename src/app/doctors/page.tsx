import { Patua_One } from "next/font/google";
import {
  Patrick_Hand,
  Noto_Sans_Arabic,
  Noto_Naskh_Arabic,
} from "next/font/google";
import Doctors, { DoctorModel } from "@/components/Doctors/Doctors";
export const patua = Patua_One({ subsets: ["latin"], weight: "400" });
export const patrik_hand = Patrick_Hand({ subsets: ["latin"], weight: "400" });
export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["600", "300", "500"],
});
export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
});
export interface DoctorCard {
  id: string;
  name: string;
  title: string;
  specialty: string[];
  description: string;
  image: string;
  rating: number;
  ratingCount: number;
  hygieneBadge: string;
  location: string;
  city: string; // ✅ added
  area: string; // ✅ added
  fees: number | undefined;
  waitingTime: string;
  phone: string;
  schedule: object[];
  gender: "Male" | "Female";
}

export const doctorCards: DoctorCard[] = [
  {
    id: "doctor-card__1",
    name: "Mohamed Sherif",
    title: "Doctor",
    specialty: [
      "Pediatric Dentistry",
      "Cosmetic Dentistry",
      "Endodontics",
      "Periodontics",
    ],
    description: "Specialist of Restorative & Esthetic Dentistry",
    image:
      "https://cdn-dr-images.vezeeta.com/Assets/Images/SelfServiceDoctors/ENT78152c81f2a447b6/Profile/150/doctor-mohamed-sherif-dentistry-1_20240819165829000.jpg",
    rating: 5,
    ratingCount: 96,
    hygieneBadge:
      "https://d1aovdz1i2nnak.cloudfront.net/vezeeta-web-reactjs/jenkins-117/images/hygiene-badge-en.png",
    location: "El-Maadi : Lasilki St.",
    city: "Cairo",
    area: "El-Maadi",
    fees: 400,
    waitingTime: "10 Minutes",
    phone: "16676",
    schedule: [
      {
        date: "Today",
        slots: [
          "8:00 PM",
          "8:30 PM",
          "9:00 PM",
          "9:30 PM",
          "10:00 PM",
          "10:30 PM",
        ],
      },
      {
        date: "Tomorrow",
        slots: [
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
          "4:30 PM",
        ],
      },
      {
        date: "Tue 02/25",
        slots: [
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
          "4:30 PM",
        ],
      },
    ],
    gender: "Male",
  },
  {
    id: "doctor-card__2",
    name: "Ahmed Ali",
    title: "Dentist",
    specialty: ["Orthodontics", "Implantology", "Cosmetic Dentistry"],
    description: "Experienced Dentist specialized in Orthodontics.",
    image:
      "https://cdn-dr-images.vezeeta.com/Assets/Images/SelfServiceDoctors/ENT78152c81f2a447b6/Profile/150/doctor-aly-hassan-dentistry-2_20240819165829000.jpg",
    rating: 4.8,
    ratingCount: 120,
    hygieneBadge: "https://example.com/hygiene_badge.jpg",
    location: "Nasr City : Ahmed Zaki St.",
    city: "Cairo",
    area: "Nasr City",
    fees: 500,
    waitingTime: "15 Minutes",
    phone: "16677",
    schedule: [
      {
        date: "Today",
        slots: [
          "8:00 PM",
          "8:30 PM",
          "9:00 PM",
          "9:30 PM",
          "10:00 PM",
          "10:30 PM",
        ],
      },
      {
        date: "Tomorrow",
        slots: [
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
          "4:30 PM",
        ],
      },
      {
        date: "Tue 02/25",
        slots: [
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
          "4:30 PM",
        ],
      },
    ],
    gender: "Male",
  },
  {
    id: "doctor-card__3",
    name: "Sara Youssef",
    title: "Specialist",
    specialty: ["Pediatric Dentistry", "General Dentistry"],
    description: "Expert in Pediatric and Family Dentistry.",
    image:
      "https://cdn-dr-images.vezeeta.com/Assets/Images/SelfServiceDoctors/ENT78152c81f2a447b6/Profile/150/doctor-aly-hassan-dentistry-2_20240819165829000.jpg",
    rating: 4.9,
    ratingCount: 200,
    hygieneBadge: "https://example.com/hygiene_badge.jpg",
    location: "Cairo: Zamalek St.",
    city: "Cairo",
    area: "Zamalek",
    fees: 450,
    waitingTime: "5 Minutes",
    phone: "16678",
    schedule: [
      {
        date: "Today",
        slots: [
          "8:00 PM",
          "8:30 PM",
          "9:00 PM",
          "9:30 PM",
          "10:00 PM",
          "10:30 PM",
        ],
      },
      {
        date: "Tomorrow",
        slots: [
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
          "4:30 PM",
        ],
      },
      {
        date: "Tue 02/25",
        slots: [
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
          "4:30 PM",
        ],
      },
    ],
    gender: "Female",
  },
  // ... continue for remaining doctors
];
interface salem {
  params: { slug: string };
}
interface Props {
  searchParams: {
    title?: string;
    examination_fee?: string;
    sorting?: string;
    specialty?: string;
    city?: string;
    search_name?: string;
  };
}

export default async function DoctorsPage(props: Props) {
  const response = await fetch(
    "https://citypulse.runasp.net/api/Clinic/AllDoctors"
  );
  const data = await response.json();
  const getAllDoctors = data.$values;
  if (!Array.isArray(getAllDoctors)) return;

  const mappedDoctors = getAllDoctors.map((element) => ({
    doctorId: element.doctorId,
    clinicId: element.clinicId,
    doctorName: element.doctorName,
    description: element.description,
    specialization: element.specialization,
    experienceYears: element.experienceYears,
    profileImage: element.profileImage,
    academicDegree: element.academicDegree,
    retaing: element.retaing, // typo: maybe should be `rating`?
    price: element.price,
    city: element.city,
    addressLine1: element.addressLine1,
    workingHour: Array.isArray(element.workingHour.$values)
      ? element.workingHour.$values.map((hour: any) => ({
          workingHourID: hour.workingHourID,
          workingDate: hour.workingDate,
          workingDay: hour.workingDay,
          startTime: hour.startTime,
          endTime: hour.endTime,
          waitingHours: hour.waitingHours,
          status: hour.status,
          appointmentCount: hour.appointmentCount,
          maxAppointments: hour.maxAppointments,
        }))
      : [],
    services: Array.isArray(element.services.$values)
      ? element.services.$values.map((service: any) => ({
          idService: service.idService,
          clinicId: service.clinicId,
          serviceName: service.serviceName,
          serviceDescription: service.serviceDescription,
          price: service.price,
        }))
      : [],
  }));
  console.log(mappedDoctors);
  return (
    <Doctors
      getAllDoctors={mappedDoctors}
      DoctorsSearchParams={{
        title: props.searchParams.title,
        examination_fee: props.searchParams.examination_fee,
        sorting: props.searchParams.sorting,
        specialty: props.searchParams.specialty,
        city: props.searchParams.city,
        search_name: props.searchParams.search_name,
      }}
    />
  );
}

// Metadata function
// export function generateMetadata(): Metadata {
//   return {
//     title: "Clinics",
//   };
// }
