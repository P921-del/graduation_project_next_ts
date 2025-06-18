import ClinicCard from "./ClinicCard";
interface Specialty_clinic {
  id: number;
  name: string;
  image: string;
}
enum Specialty_clinics_availableNames {
  Andrology = "Andrology",
  Audiology_Or_Phoniatrics = "Audiology / Phoniatrics",
  Cardiothoracic = "Cardiothoracic",
  Cardiovascular = "Cardiovascular",
  Dermatology_Or_Lasers = "Dermatology/Lasers",
  Ear_Or_Nose_And_Throat = "Ear, Nose & Throat",
  Endocrinology = "Endocrinology",
  Gastroenterology_Or_Hepatology = "Gastroenterology / Hepatology",
  General_Surgery = "General Surgery",
  Hematology = "Hematology",
  Homeopathy_Or_Alternative_Medicine = "Homeopathy / Alternative Medicine",
  Internal_Medicine = "Internal Medicine",
  Nephrology = "Nephrology",
  Neurology = "Neurology",
  Neurosurgery = "Neurosurgery",
  Nutrition = "Nutrition",
  Obstetrics_And_Gynecology = "Obstetrics & Gynecology",
  Oncology_Or_Chemotherapy = "Oncology / Chemotherapy",
  Oncosurgery = "Oncosurgery",
  Ophthalmology = "Ophthalmology",
  Orthopedics = "Orthopedics",
  Pain_Clinic = "Pain Clinic",
  Pediatric_Surgery = "Pediatric Surgery",
  Pediatrics = "Pediatrics",
  Physiotherapy = "Physiotherapy",
  Plastic_Surgery = "Plastic Surgery",
  Psychiatry = "Psychiatry",
  Psychology = "Psychology",
  Pulmonology_Chest = "Pulmonology (Chest)",
  Rheumatology = "Rheumatology",
  Traditional_Chinese_Medicine = "Traditional Chinese Medicine",
  Urology = "Urology",
  Vascular_Surgery = "Vascular Surgery",
}
const Specialty_clinics_available: Specialty_clinic[] = [
  {
    id: 1,
    name: Specialty_clinics_availableNames.Andrology,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Andrology.jfif",
  },
  {
    id: 2,
    name: Specialty_clinics_availableNames.Audiology_Or_Phoniatrics,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Audiology_Or_Phoniatrics.jfif",
  },
  {
    id: 3,
    name: Specialty_clinics_availableNames.Cardiothoracic,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Cardiothoracic.jfif",
  },
  {
    id: 3,
    name: Specialty_clinics_availableNames.Cardiovascular,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Cardiovascular.jfif",
  },
  {
    id: 4,
    name: Specialty_clinics_availableNames.Dermatology_Or_Lasers,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Dermatology_Or_Lasers.jfif",
  },
  {
    id: 5,
    name: Specialty_clinics_availableNames.Ear_Or_Nose_And_Throat,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Ear_Or_Nose_And_Throat.jfif",
  },
  {
    id: 6,
    name: Specialty_clinics_availableNames.Endocrinology,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Endocrinology.jfif",
  },
  {
    id: 7,
    name: Specialty_clinics_availableNames.Gastroenterology_Or_Hepatology,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Gastroenterology_Or_Hepatology.jfif",
  },
  {
    id: 8,
    name: Specialty_clinics_availableNames.General_Surgery,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Cardiothoracic.jfif",
  },
  {
    id: 9,
    name: Specialty_clinics_availableNames.Hematology,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Hematology.jfif",
  },
  {
    id: 10,
    name: Specialty_clinics_availableNames.Homeopathy_Or_Alternative_Medicine,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Homeopathy_Or_Alternative_Medicine.jfif",
  },
  {
    id: 11,
    name: Specialty_clinics_availableNames.Internal_Medicine,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Internal_Medicine.jfif",
  },
  {
    id: 12,
    name: Specialty_clinics_availableNames.Nephrology,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Nephrology.jfif",
  },
  {
    id: 13,
    name: Specialty_clinics_availableNames.Neurology,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Neurology.jfif",
  },
  {
    id: 14,
    name: Specialty_clinics_availableNames.Neurosurgery,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Neurosurgery.jfif",
  },
  {
    id: 15,
    name: Specialty_clinics_availableNames.Nutrition,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Nutrition.jfif",
  },
  {
    id: 16,
    name: Specialty_clinics_availableNames.Obstetrics_And_Gynecology,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Obstetrics_And_Gynecology.jfif",
  },
  {
    id: 17,
    name: Specialty_clinics_availableNames.Oncology_Or_Chemotherapy,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Oncology_Or_Chemotherapy.jfif",
  },
  {
    id: 18,
    name: Specialty_clinics_availableNames.Oncosurgery,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Oncosurgery.jfif",
  },
  {
    id: 19,
    name: Specialty_clinics_availableNames.Ophthalmology,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Ophthalmology.jfif",
  },
  {
    id: 20,
    name: Specialty_clinics_availableNames.Orthopedics,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Orthopedics.jfif",
  },
  {
    id: 21,
    name: Specialty_clinics_availableNames.Pain_Clinic,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Pain_Clinic.jfif",
  },
  {
    id: 22,
    name: Specialty_clinics_availableNames.Pediatric_Surgery,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Pediatric_Surgery.jfif",
  },
  {
    id: 23,
    name: Specialty_clinics_availableNames.Pediatrics,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Pediatrics.jfif",
  },
  {
    id: 24,
    name: Specialty_clinics_availableNames.Physiotherapy,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Physiotherapy.jfif",
  },
  {
    id: 25,
    name: Specialty_clinics_availableNames.Plastic_Surgery,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Plastic_Surgery.jfif",
  },
  {
    id: 26,
    name: Specialty_clinics_availableNames.Psychiatry,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Psychiatry.jfif",
  },
  {
    id: 27,
    name: Specialty_clinics_availableNames.Psychology,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Psychology.jfif",
  },
  {
    id: 28,
    name: Specialty_clinics_availableNames.Pulmonology_Chest,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Pulmonology_Chest.jfif",
  },
  {
    id: 29,
    name: Specialty_clinics_availableNames.Rheumatology,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Rheumatology.jfif",
  },
  {
    id: 30,
    name: Specialty_clinics_availableNames.Traditional_Chinese_Medicine,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Traditional_Chinese_Medicine.jfif",
  },
  {
    id: 31,
    name: Specialty_clinics_availableNames.Urology,
    image: "/assets/Clinics/Specialty_clinics_availableImages/Urology.jfif",
  },
  {
    id: 32,
    name: Specialty_clinics_availableNames.Vascular_Surgery,
    image:
      "/assets/Clinics/Specialty_clinics_availableImages/Vascular_Surgery.jfif",
  },
];
function Clinics() {
  return (
    <div className="flex flex-col bg-slate-100">
      <h1 className="flex items-center text-black text-3xl font-sans font-semibold tracking-wide h-40 ml-16 md:ml-20 lg:ml-24 xl:ml-32">
        Clinics
      </h1>
      <div className="w-[90%] mx-auto mb-20">
        <div className="z-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Specialty_clinics_available.map((Clinic: Specialty_clinic) => (
            <ClinicCard key={Clinic.id} {...Clinic} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Clinics;
