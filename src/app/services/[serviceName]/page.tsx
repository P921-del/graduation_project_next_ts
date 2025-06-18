import Clinics from "@/components/Clinics/Clinics";
import Hospitals from "@/components/Hospitals/Hospitals";
import Restaurants from "@/components/Restaurants/Restaurants";
import Schools from "@/components/Schools/Schools";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    serviceName: string;
  };
};
enum ServiceType {
  Schools = "schools",
  Hospitals = "hospitals",
  Restaurants = "restaurants",
  Clinics = "clinics",
}
// Metadata function
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceName } = await params;
  return {
    title: `${serviceName}`,
  };
}

// Page Component
export default async function Service({ params }: Props) {

  const { serviceName } = await params;
  if (serviceName === ServiceType.Restaurants) {
    return <Restaurants />;
  } else if (serviceName === ServiceType.Schools) {
    return <Schools />;
  } else if (serviceName === ServiceType.Hospitals) {
    return <Hospitals />;
  } else if (serviceName === ServiceType.Clinics) {

    return (
      <div>
        <Clinics />
      </div>
    );
  } else {
    notFound();
  }
}
