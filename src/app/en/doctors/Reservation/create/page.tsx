import DoctorReservation from "@/components/Doctors/DoctorReservation";

type Props = {
  searchParams: {
    workingHourID: number;
    doctorId: number;
    clinicId: number;
    userId?: number;
  };
};

function FirstReservationAppointmentPage(props: Props) {
  return (
    <DoctorReservation
      workingHourID={props?.searchParams?.workingHourID}
      doctorId={props?.searchParams?.doctorId}
      clinicId={props?.searchParams?.clinicId}
      userId={props?.searchParams?.userId}
    />
  );
}

export default FirstReservationAppointmentPage;
