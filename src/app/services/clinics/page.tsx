import { Patua_One, Atkinson_Hyperlegible } from "next/font/google";
import {
  Patrick_Hand,
  Noto_Sans_Arabic,
  Noto_Naskh_Arabic,
} from "next/font/google";
import CityDropDownSelect from "@/components/Clinics/CityDropDownSelect";
import { GiPlainCircle } from "react-icons/gi";
import Link from "next/link";
import RegionDropDownSelect from "@/components/Clinics/RegionDropDownSelect";
import SpecialtyDropDownSelect from "@/components/Clinics/SpecialtyDropDownSelect";
import SearchByClinicName from "@/components/Clinics/SearchByClinicName";
import PaginatedClinics from "@/components/Clinics/PaginatedClinics";
// Example clinics, to simulate fetching from another resources.
export const clinics = [
  {
    imageUrl:
      "https://www.otlobtabib.com/uploads/clinics/58/gallery/58-137607822320220119014836.jpeg",
    clinicName: "عيادات د / أيمن حتحوت التخصصية",
    clinicType: "عيادة باطنة",
    clinicLink:
      "https://www.otlobtabib.com/en/clinics/view/58-%D8%B9%D9%8A%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1-%D8%A3%D9%8A%D9%85%D9%86-%D8%AD%D8%AA%D8%AD%D9%88%D8%AA",
    location: "مصر - الاسكندرية - المندرة بحري/قبلي",
    cost: "150 EGP",
    waitingTime: "30 minutes",
    specialties: [
      "كشف طبي لأمراض الباطنة والقلب",
      "رسم قلب عادي ومستمر 24 ساعة",
      "قياس ضغط الدم",
      "إيكو القلب",
      "أشعة صوتية على البطن والحوض",
      "مناظير جهاز هضمي",
      "دوبلر ملون",
      "معمل تحاليل بأحدث الأجهزة",
    ],
  },
  {
    imageUrl:
      "https://www.otlobtabib.com/uploads/clinics/62/gallery/62-32862697620220123013938.jpeg",
    clinicName: "عيادة د / أماني إسماعيل",
    clinicType: "عيادة أسنان",
    clinicLink:
      "https://www.otlobtabib.com/en/clinics/view/62-%D8%B9%D9%8A%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9-%D8%A3%D9%85%D8%A7%D9%86%D9%8A-%D8%A5%D8%B3%D9%85%D8%A7%D8%B9%D9%8A%D9%84-%D9%84%D9%84%D8%A3%D8%B3%D9%86%D8%A7%D9%86",
    location: "مصر - الاسكندرية - محرم بيك",
    cost: "50 EGP",
    waitingTime: "30 minutes",
    specialties: [
      "تبييض الأسنان",
      "تقويم الأسنان",
      "الحشوات التجميلية",
      "تنظيف اللثة",
      "تنظيف الجير",
      "دعامات الأسنان",
      "خلع الأسنان",
      "علاج الفك والأسنان",
      "حشو الأسنان",
      "التركيبات الثابتة والمتحركة",
      "علاج الجذور والأعصاب",
    ],
  },
  {
    imageUrl:
      "https://www.otlobtabib.com/uploads/clinics/65/gallery/65-105345908620220123034009.jpeg",
    clinicName: "عيادة د / وليد الشافعي",
    clinicType: "عيادة عظام",
    clinicLink:
      "https://www.otlobtabib.com/en/clinics/view/65-%D8%B9%D9%8A%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1-%D9%88%D9%84%D9%8A%D8%AF-%D8%B3%D8%B9%D9%8A%D8%AF-%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D9%8A-%D8%AF%D9%83%D8%AA%D9%88%D8%B1-%D8%B9%D8%B8%D8%A7%D9%85",
    location: "مصر - الاسكندرية - محطة الرمل",
    cost: "200 EGP",
    waitingTime: "40 minutes",
    specialties: [
      "الخلايا الجذعية للعظام",
      "العلاج الحراري",
      "عمليات تبديل مفصل الورك",
      "عملية تغيير مفصل الركبة",
      "عملية مفصل الكوع",
      "عمليات الكسور",
      "تسليك العصب",
      "عمليات زراعة الرباط الصليبي بالمنظار",
      "عملية الغضروف الهلالي",
    ],
  },
];

for (let i = 0; i < 97; i++) {
  clinics.push({
    imageUrl: `https://www.otlobtabib.com/uploads/clinics/${i + 100}/gallery/${
      i + 100
    }-image.jpeg`,
    clinicName: `عيادة د / Clinic ${i + 1}`,
    clinicType: `عيادة تخصص ${
      i % 3 === 0 ? "باطنة" : i % 3 === 1 ? "أسنان" : "عظام"
    }`,
    clinicLink: `https://www.otlobtabib.com/en/clinics/view/${
      i + 100
    }-clinic-link`,
    location: `مصر - الاسكندرية - موقع ${i + 1}`,
    cost: `${50 + (i % 3) * 50} EGP`,
    waitingTime: `${20 + (i % 3) * 10} minutes`,
    specialties: [
      `تخصص رقم ${i + 1}`,
      `خدمة رقم ${i + 2}`,
      `خدمة رقم ${i + 3}`,
    ],
  });
}

type Props = {
  params: {
    serviceName: string;
  };
};
//<Clinics />
// Page Component
export const patua = Patua_One({ subsets: ["latin"], weight: "400" });
export const Atkinson_Hyperlegiblefont = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
export const patrik_hand = Patrick_Hand({ subsets: ["latin"], weight: "400" });
export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["600", "300", "500"],
});
export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
});

export default async function Clinic({ params }: Props) {
  return (
    <div>
      <div className="ml-28 mt-4 mb-6 flex flex-col gap-10">
        <h2
          className={patua.className + " font-semibold text-xl text-slate-500"}
        >
          Your fast and most home healthcare
        </h2>
        <div
          className={
            patrik_hand.className +
            " font-base text-2xl text-gray-950 flex flex-row gap-4"
          }
        >
          <Link href="/" className="cursor-default hover:cursor-pointer">
            Main Page
          </Link>
          <ul className="flex flex-row gap-3 cursor-default hover:cursor-text">
            <GiPlainCircle className="text-[10px] text-sky-600 h-full flex items-center justify-center" />
            <li className="text-pink-500">CityGuide - Clinics</li>
          </ul>
        </div>
      </div>

      <div className="w-[95%] mx-auto lg:h-60 flex flex-col gap-2 mb-10">
        <div className="bg-white lg:h-20 grid grid-cols-1 gap-y-2 lg:gap-y-0 lg:grid-cols-3 lg:gap-x-8">
          <div className="w-full h-full bg-white pl-0 lg:pl-3 flex flex-col gap-2">
            <label
              className={
                patrik_hand.className +
                " text-gray-700 text-lg selection:bg-blue-900 selection:text-white"
              }
              htmlFor="city"
            >
              City
            </label>
            <CityDropDownSelect />
          </div>
          <div className="w-full h-full bg-white flex flex-col gap-2">
            <label
              className={
                patrik_hand.className +
                " text-gray-700 text-lg selection:bg-blue-900 selection:text-white"
              }
              htmlFor="region"
            >
              Region
            </label>
            <RegionDropDownSelect />
          </div>
          <div className="w-full h-full bg-white flex flex-col gap-2">
            <label
              className={
                patrik_hand.className +
                " text-gray-700 text-lg selection:bg-blue-900 selection:text-white"
              }
              htmlFor="specialty"
            >
              Specialty
            </label>
            <SpecialtyDropDownSelect />
          </div>
        </div>
        <div className="bg-white h-[182px] lg:h-20 flex flex-col gap-12 lg:flex-row lg:gap-9 z-0 relative">
          <div className="w-full h-20 lg:h-full bg-white pl-0 lg:pl-3 flex flex-col gap-2 hover:cursor-pointer">
            <label
              className={
                patrik_hand.className +
                " text-gray-700 text-lg selection:bg-blue-900 selection:text-white"
              }
              htmlFor="clinic_name"
            >
              Search by clinic name
            </label>
            <SearchByClinicName />
          </div>
          <div className="lg:w-[30%] h-14 lg:h-[70%] lg:mt-auto bg-white flex items-center justify-center hover:cursor-pointer lg:translate-y-3">
            <button
              className={
                patrik_hand.className +
                " h-full w-[95%] mx-auto lg:mx-0 lg:w-full rounded-md text-xl bg-blue-900 text-white hover:cursor-pointer"
              }
              type="button"
            >
              Search now
            </button>
          </div>
        </div>
      </div>
      <div className="bg-transparent flex flex-col gap-y-20">
        <PaginatedClinics itemsPerPage={2} />
      </div>
    </div>
  );
}

// Metadata function
// export function generateMetadata(): Metadata {
//   return {
//     title: "Clinics",
//   };
// }
