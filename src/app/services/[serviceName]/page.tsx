import Restaurants from "@/components/Restaurants/Restaurants";
import Schools from "@/components/Schools/Schools";
import { Metadata } from "next";

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
  const { serviceName } = params;
  return {
    title: `${serviceName}`,
  };
}

// Page Component
export default function Service({ params }: Props) {
  const { serviceName } = params;
  if (serviceName === ServiceType.Restaurants) {
    return (
      <div>
        <Restaurants />
      </div>
    );
  } else if (serviceName === ServiceType.Schools) {
    return (
      <div>
        <Schools />
      </div>
    );
  }
}
