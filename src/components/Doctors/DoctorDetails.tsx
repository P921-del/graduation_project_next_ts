"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { patua } from "@/app/services/clinics/page";
import { redirect, useRouter } from "next/navigation";
import { DoctorsContext } from "@/app/doctors/layout";
import { FaInfo } from "react-icons/fa";
import { RiStarHalfLine } from "react-icons/ri";
import { SiComma } from "react-icons/si";
import { FaMoneyBillWave } from "react-icons/fa";
import { WiTime2 } from "react-icons/wi";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarCheckFill } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaBriefcaseMedical } from "react-icons/fa";
import { DoctorStars } from "./PaginatedDoctors";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import DoctorAppointemnetscardForCheckOut, {
  convertTime,
} from "./DoctorAppointemnetscardForCheckOut";
import styled, { keyframes } from "styled-components";
import { slideInLeft, slideInRight } from "react-animations";
import { BsPersonCircle } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import * as Yup from "yup";
import { useFormik } from "formik";
import { DoctorModel } from "./Doctors";
import { store } from "@/lib/store";
import { toast } from "react-hot-toast";
const SlideInLeft = styled.div`
  animation: 1s ${keyframes`${slideInLeft}`} ease-in-out;
`;

const SlideInRight = styled.div`
  animation: 1s ${keyframes`${slideInRight}`} ease-in-out;
`;

type Props = {
  DoctorObject: DoctorModel;
};
interface userRatingModel {
  ratingId: number;
  nameU: string;
  ratingValue: number;
  review: string;
  ratingDate: string;
}
interface ServiceProvidedByDoctor {
  id: number;
  price: number;
  serviceName: string;
}
interface AppointmentDetailsModel {
  subTotalPrice: number;
  servicesId: number;
}
interface CreateAppointmentModel {
  workingHourId: number;
  userId: number | undefined;
  clinicId: number;
  totalPrice: number;
  patientName: string;
  patientAddress: string;
  appointmentDetails: AppointmentDetailsModel[];
}
interface CreateDoctorRating {
  userId: number | undefined;
  serviceID: number;
  review: string;
  value: number;
}
const DoctorDetailsClientComponent = (props: Props) => {
  const [createAppointmentButtonClick, setCreateAppointmentButtonClick] =
    useState<createAppointmentButtonClickModel>({
      clicked: false,
      workingHourID: 0,
      doctorId: 0,
      userId: 0,
    });
  useEffect(() => {
    if (
      createAppointmentButtonClick.clicked &&
      createAppointmentButtonClick.userId !== 0
    ) {
      fetchData();
    }
    async function fetchData() {
      try {
        const secondResponse = await fetch(
          `http://citypulse.runasp.net/api/Clinic/${props.DoctorObject.clinicId}/services`
        );
        const fetchedData = await secondResponse.json();
        const doctorServices: ServiceProvidedByDoctor[] =
          fetchedData.$values.map((data) => {
            return {
              id: data.id,
              price: data.price,
              serviceName: data.serviceName,
            };
          });
        console.log(doctorServices);
        setDoctorServices(doctorServices);
      } catch (error) {
        console.log(error);
      }
    }
  }, [createAppointmentButtonClick]);
  function sendFromChild(workingHourID: number) {
    if (store.getState().auth.userToken !== null) {
      setCreateAppointmentButtonClick({
        clicked: true,
        workingHourID: workingHourID,
        doctorId: props.DoctorObject.doctorId,
        userId: store.getState().auth.user?.id,
      });
    }
  }
  const router = useRouter();

  const { SearchDoctors, setSearchDoctors } = useContext(DoctorsContext);
  const [changeOpacity, setChangeOpacity] = useState<boolean>(false);
  const [doctorServices, setDoctorServices] = useState<
    ServiceProvidedByDoctor[]
  >([]);
  const [chooseServices, setChooseServices] = useState<boolean>(false);
  const [selectServices, setSelectServices] = useState<
    ServiceProvidedByDoctor[]
  >([]);
  const [totalPrice, setTotalPrice] = useState<number>(
    props.DoctorObject.price
  );
  const [appointmentDetails, setAppointmentDetails] = useState<
    AppointmentDetailsModel[]
  >([]);
  useEffect(() => {
    if (selectServices.length > 0) {
      for (let i = 0; i < selectServices.length; i++) {
        setAppointmentDetails([
          ...appointmentDetails,
          {
            subTotalPrice: selectServices[i].price,
            servicesId: selectServices[i].id,
          },
        ]);
      }
    }
  }, [selectServices]);
  useEffect(() => {
    if (appointmentDetails.length > 0) {
      const servicesTotal = appointmentDetails.reduce(
        (sum, selectService) => sum + selectService.subTotalPrice,
        props.DoctorObject.price
      );
      setTotalPrice(servicesTotal);
    } else {
      setTotalPrice(props.DoctorObject.price);
    }
  }, [appointmentDetails, props.DoctorObject.price]);
  useEffect(() => {
    async function fetchData() {
      try {
        const firstResponse = await fetch(
          `http://citypulse.runasp.net/api/Clinic/DoctorsByClinicId?clinicId=${props.DoctorObject.clinicId}`
        );
        const data = await firstResponse.json();
        if (Array.isArray(data?.workingHour?.$values)) {
          const workingHourObject = data.workingHour.$values.find(
            (hour) => String(hour.workingHourID) === String(props.workingHourID)
          );
          console.log(workingHourObject);
          const doctorworkingHour: DoctorWorkingHour[] =
            data.workingHour.$values.map((data) => {
              return {
                workingHourID: data.workingHourID,
                workingDate: data.workingDate,
                workingDay: data.workingDay,
                startTime: data.startTime,
                endTime: data.endTime,
                waitingHours: data.waitingHours,
                status: data.status,
                appointmentCount: data.appointmentCount,
                maxAppointments: data.maxAppointments,
              };
            });
          const secondResponse = await fetch(
            `http://citypulse.runasp.net/api/Clinic/${props.DoctorObject.clinicId}/services`
          );
          const fetchedData = await secondResponse.json();
          const doctorServices: ServiceProvidedByDoctor[] =
            fetchedData.$values.map((data) => {
              return {
                id: data.id,
                price: data.price,
                serviceName: data.serviceName,
              };
            });
          const doctorReservation: DoctorModel = {
            doctorId: data.doctorId,
            clinicId: data.clinicId,
            experienceYears: data.experienceYears,
            profileImage: data.profileImage,
            description: data.description,
            doctorName: data.doctorName,
            price: data.price,
            academicDegree: data.academicDegree,
            retaing: data.retaing,
            city: data.city,
            addressLine1: data.addressLine1,
            specialization: data.specialization,
            workingHour: doctorworkingHour,
            services: data.services.$values.map((data) => {
              return {
                idService: data.id,
                serviceName: data.serviceName,
                clinicId: data.id,
                description: data.description,
                price: data.price,
              };
            }),
          };
          console.log(doctorServices);
          setDoctorServices(doctorServices);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const patientNameSection = useRef<HTMLDivElement>(null);
  const AddressSection = useRef<HTMLDivElement>(null);
  const formik = useFormik({
    initialValues: {
      patient_name: "",
      address: "",
    },
    validationSchema: Yup.object().shape({
      patient_name: Yup.string().required("Patient Name is required"),
      address: Yup.string().required("Patient Address is required"),
    }),
    onSubmit: async (values) => {
      try {
        debugger;
        if (
          createAppointmentButtonClick.clicked &&
          createAppointmentButtonClick.userId !== null
        ) {
          const createAppointment: CreateAppointmentModel = {
            workingHourId: createAppointmentButtonClick.workingHourID,
            userId: createAppointmentButtonClick.userId,
            clinicId: props.DoctorObject.clinicId,
            totalPrice: totalPrice > props.DoctorObject.price ? totalPrice : 0,
            patientName: values.patient_name,
            patientAddress: values.address,
            appointmentDetails: appointmentDetails,
          };
          const response = await fetch(
            `http://citypulse.runasp.net/api/Clinic/CreateAppointment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.getState().auth.userToken}`,
              },
              body: JSON.stringify(createAppointment),
            }
          );
          if (response.ok) {
            const data = response;
            console.log(data);
            window.location.assign("/doctors");
            toast.success(
              `You have an appointment with ${props.DoctorObject.doctorName}!`
            ); // Display a success message
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const [userRatingsState, setUserRatingsState] = useState<userRatingModel[]>(
    []
  );
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://citypulse.runasp.net/api/Clinic/AllDoctorRating /${props.DoctorObject.doctorId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const userRatings: userRatingModel[] = data.$values.map(
            (userRating) => ({
              ratingId: userRating.ratingId,
              nameU: userRating.nameU,
              ratingValue: userRating.ratingValue,
              review: userRating.review,
              ratingDate: userRating.ratingDate,
            })
          );
          if (data.$values !== null) setUserRatingsState(userRatings);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, []);
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (store.getState().auth.userToken === null) {
      router.push("/login");
    }
    debugger;
    try {
      if (
        store.getState().auth.user?.id !== null &&
        comment.trim() !== "" &&
        rating > 0
      ) {
        const createDoctorRating: CreateDoctorRating = {
          userId: store.getState().auth.user?.id,
          serviceID: props.DoctorObject.doctorId,
          review: comment,
          value: rating,
        };
        const response = await fetch(
          `http://citypulse.runasp.net/api/Clinic/CreateDoctorRating`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.getState().auth.userToken}`,
            },
            body: JSON.stringify(createDoctorRating),
          }
        );
        if (response.ok) {
          setRating(0);
          setComment("");
          toast.success("Your comment send to the doctor");
        } else {
          window.location.assign("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [toggleClickOnFirstStar, setToggleClickOnFirstStar] =
    useState<boolean>(false);
  const [toggleClickOnSecondStar, setToggleClickOnSecondStar] =
    useState<boolean>(false);
  const [toggleClickOnThirdStar, setToggleClickOnThirdStar] =
    useState<boolean>(false);
  const [toggleClickOnFourStar, setToggleClickOnFourStar] =
    useState<boolean>(false);
  const [toggleClickOnFiveStar, setToggleClickOnFiveStar] =
    useState<boolean>(false);
  useEffect(() => {
    if (toggleClickOnFirstStar) setRating(1);
    else setRating(0);
  }, [toggleClickOnFirstStar]);
  useEffect(() => {
    if (toggleClickOnSecondStar) setRating(2);
    else setRating(0);
  }, [toggleClickOnSecondStar]);
  useEffect(() => {
    if (toggleClickOnThirdStar) setRating(3);
    else setRating(0);
  }, [toggleClickOnThirdStar]);
  useEffect(() => {
    if (toggleClickOnFourStar) setRating(4);
    else setRating(0);
  }, [toggleClickOnFourStar]);
  useEffect(() => {
    if (toggleClickOnFiveStar) setRating(5);
    else setRating(0);
  }, [toggleClickOnFiveStar]);
  return (
    <div className={patua.className + " bg-blue-50 w-full flex flex-row"}>
      <section
        className={
          changeOpacity
            ? "w-[60%] mr-auto bg-transparent h-full opacity-50 z-10"
            : "w-[60%] mr-auto bg-transparent h-full opacity-100 z-10"
        }
        onClick={() => setChangeOpacity(false)}
      >
        <div className="ml-auto w-[95%] h-full bg-transparent">
          <h3 className="ml-4 text-gray-400 text-sm flex flex-row items-center justify-start h-[4%] mb-4 mt-1">
            <span
              className="text-blue-500 hover:underline hover:cursor-pointer"
              onClick={() => router.push("/")}
            >
              City Guide
            </span>
            <span className="ml-2 mr-4"> / </span>
            <span
              className="text-blue-500 hover:underline hover:cursor-pointer"
              onClick={() => {
                setSearchDoctors({
                  ...SearchDoctors,
                  specialty: props.DoctorObject.specialization,
                });
              }}
            >
              {props.DoctorObject.specialization} in Egypt
            </span>
            <span className="ml-2 mr-4"> / </span>
            <p>
              <span className="mr-1">Doctor</span>
              {props.DoctorObject.doctorName.split(" ")[0] ? (
                <span className="mr-1">
                  {props.DoctorObject.doctorName.split(" ")[0]}
                </span>
              ) : null}
              {props.DoctorObject.doctorName.split(" ")[1] ? (
                <span>{props.DoctorObject.doctorName.split(" ")[1]}</span>
              ) : null}
              {props.DoctorObject.doctorName.split(" ")[2] ? (
                <span className="ml-1">
                  {props.DoctorObject.doctorName.split(" ")[2]}
                </span>
              ) : null}
            </p>
          </h3>
          <section className="bg-transparent h-[96%] flex flex-col gap-y-5">
            <section className="h-[25%] rounded-2xl bg-white flex flex-row gap-x-2">
              <div className="w-[30%] h-full flex items-center justify-center">
                <img
                  className="w-40 h-40 border border-gray-300 rounded-full"
                  src={props.DoctorObject.profileImage}
                  alt={props.DoctorObject.doctorName}
                  title={props.DoctorObject.doctorName}
                />
              </div>
              <div className="w-[70%] h-[70%] my-auto">
                <h3 className="text-gray-500 font-sans font-normal text-3xl flex flex-row items-center justify-start h-[4%] mb-8">
                  <span className="mr-1">Doctor</span>
                  {props.DoctorObject.doctorName.split(" ")[0] ? (
                    <span className="mr-1">
                      {props.DoctorObject.doctorName.split(" ")[0]}
                    </span>
                  ) : null}
                  {props.DoctorObject.doctorName.split(" ")[1] ? (
                    <span>{props.DoctorObject.doctorName.split(" ")[1]}</span>
                  ) : null}
                  {props.DoctorObject.doctorName.split(" ")[2] ? (
                    <span className="ml-1">
                      {props.DoctorObject.doctorName.split(" ")[2]}
                    </span>
                  ) : null}
                </h3>
                <h4 className="text-gray-600 text-xl font-sans font-bold mb-5">
                  <span className="mr-1">
                    {props.DoctorObject.specialization}
                  </span>
                  <span>consultant</span>
                  <span className="mx-1.5">-</span>
                  {props.DoctorObject.city ? (
                    props.DoctorObject.city.split(" ")[0] ? (
                      <span className="mr-1">
                        {props.DoctorObject.city.split(" ")[0]}
                      </span>
                    ) : null
                  ) : null}
                  {props.DoctorObject.addressLine1 ? (
                    props.DoctorObject.addressLine1.split(" ")[1] ? (
                      <span>
                        {props.DoctorObject.addressLine1.split(" ")[1]}
                      </span>
                    ) : null
                  ) : null}
                  {props.DoctorObject.city ? (
                    props.DoctorObject.city.split(" ")[2] ? (
                      <span className="ml-1">
                        {props.DoctorObject.city.split(" ")[2]}
                      </span>
                    ) : null
                  ) : null}
                </h4>
                <p className="font-sans text-lg font-semibold">
                  <span className="mr-1 text-blue-600 hover:cursor-pointer hover:underline">
                    {props.DoctorObject.specialization}
                  </span>
                  <span className="text-gray-400 mx-1">Specialized In</span>
                  {props.DoctorObject.specialization}
                  {/* {props.DoctorObject.specialty
                    ? props.DoctorObject.specialty.map((item, index) => {
                        if (index === 0) {
                          return null;
                        } else if (
                          index !== props.DoctorObject.specialty.length - 1 &&
                          index < 4
                        ) {
                          return (
                            <span
                              className="mr-1 text-blue-600 hover:cursor-pointer hover:underline"
                              key={item}
                            >
                              <span>{item}</span>
                              <span className="text-gray-400">,</span>
                            </span>
                          );
                        } else {
                          return (
                            <span
                              key={"MoreParent"}
                              className="inline"
                              ref={MoreSpecialities}
                              onClick={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            >
                              <span
                                key={"More"}
                                className=" text-blue-600 hover:cursor-pointer hover:underline"
                              >
                                ...More
                              </span>
                            </span>
                          );
                        }
                      })
                    : null} */}
                  {/* {MoreSpecialities.current?.style.display === "none" &&
                  props.DoctorObject.specialty &&
                  props.DoctorObject.specialty.length > 4
                    ? props.DoctorObject.specialty.map((item, index) => {
                        if (index >= 0 && index <= 3) {
                          return null;
                        } else if (
                          index ===
                          props.DoctorObject.specialty.length - 1
                        ) {
                          <span
                            className="mr-1 text-blue-600 hover:cursor-pointer hover:underline flex flex-row gap-x-0.5"
                            key={item}
                          >
                            <span>{item}</span>
                            <span
                              className="text-gray-400"
                              onClick={(event) => {
                                event.currentTarget.parentElement?.parentElement?.childNodes.forEach(
                                  (element, index) => {
                                    if (index === 0 || index === 1) {
                                      return;
                                    }
                                    element.remove();
                                  }
                                );
                                if (props.DoctorObject.specialty) {
                                  for (
                                    let i = 1;
                                    i <= props.DoctorObject.specialty.length;
                                    i++
                                  ) {
                                    if (
                                      i !==
                                        props.DoctorObject.specialty.length &&
                                      event.currentTarget.parentElement
                                        ?.parentElement
                                    ) {
                                      event.currentTarget.parentElement.parentElement.innerHTML += `<span
                                                    className="mr-1 text-blue-600 hover:cursor-pointer hover:underline"
                                                    key=${props.DoctorObject.specialty[i]}
                                                  >
                                                    <span>${props.DoctorObject.specialty[i]}</span>
                                                    <span className="text-gray-400">
                                                      ,
                                                    </span>
                                                  </span>`;
                                    } else {
                                      if (
                                        event.currentTarget.parentElement
                                          ?.parentElement
                                      ) {
                                        event.currentTarget.parentElement.parentElement.innerHTML += `<span
                                                    key={"LessParent"}
                                                    className="inline"
                                                    ref=${MoreSpecialities}
                                                    onClick={(event) => {
                                                      event.currentTarget.style.display =
                                                        "inline";
                                                    }}
                                                  >
                                                    <span
                                                      key={"Less"}
                                                      className=" text-blue-600 hover:cursor-pointer hover:underline"
                                                    >
                                                      ...Less
                                                    </span>
                                                  </span>`;
                                      }
                                    }
                                  }
                                }
                              }}
                            >
                              Less
                            </span>
                          </span>;
                        } else if (
                          index >= 4 &&
                          index !== props.DoctorObject.specialty.length - 1
                        ) {
                          return (
                            <span
                              className="mr-1 text-blue-600 hover:cursor-pointer hover:underline"
                              key={item}
                            >
                              <span>{item}</span>
                              <span className="text-gray-400">,</span>
                            </span>
                          );
                        }
                      })
                    : null} */}
                </p>
                <div className="mt-10 flex flex-row gap-x-1 font-sans text-4xl">
                  {DoctorStars(props.DoctorObject.retaing).map((item) => item)}
                </div>
              </div>
            </section>
            <section className="h-[10%] rounded-xl bg-white pl-10 py-10 pr-5 flex flex-col gap-y-2">
              <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                <div>
                  <label className="block font-medium">Rating (1-5)</label>
                  <div className="font-sans flex flex-row justify-center items-center space-x-2 text-4xl">
                    <IoMdStar
                      onClick={() =>
                        setToggleClickOnFirstStar(!toggleClickOnFirstStar)
                      }
                      className={rating >= 1 ? "text-yellow-500" : ""}
                    />
                    <IoMdStar
                      onClick={() =>
                        setToggleClickOnSecondStar(!toggleClickOnSecondStar)
                      }
                      className={rating >= 2 ? "text-yellow-500" : ""}
                    />
                    <IoMdStar
                      onClick={() =>
                        setToggleClickOnThirdStar(!toggleClickOnThirdStar)
                      }
                      className={rating >= 3 ? "text-yellow-500" : ""}
                    />
                    <IoMdStar
                      onClick={() =>
                        setToggleClickOnFourStar(!toggleClickOnFourStar)
                      }
                      className={rating >= 4 ? "text-yellow-500" : ""}
                    />
                    <IoMdStar
                      onClick={() =>
                        setToggleClickOnFiveStar(!toggleClickOnFiveStar)
                      }
                      className={rating === 5 ? "text-yellow-500" : ""}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit Feedback
                </button>
              </form>
            </section>
            <section className="h-[10%] rounded-xl bg-white pl-10 py-10 pr-5 flex flex-col gap-y-2">
              <h4 className="text-blue-600 text-3xl flex flex-row gap-x-3">
                <FaInfo className="relative after:content-[''] after:w-[50%] after:mx-auto after:h-2 after:absolute after:top-20 after:bg-red-600 after:z-10" />
                <h5 className="font-sans font-semibold text-gray-600 text-xl h-full flex justify-center items-center">
                  About The Doctor
                </h5>
              </h4>
              <p className="ml-11 text-gray-500 font-sans font-medium text-lg">
                {props.DoctorObject.description}
              </p>
            </section>
            <section className="h-[55%] rounded-xl bg-gray-100 flex flex-col mb-24">
              <section className="pl-10 h-[45%] mb-auto rounded-tr-xl rounded-tl-xl bg-white">
                <h4 className="text-blue-600 text-3xl flex flex-row gap-x-5 mt-12">
                  <RiStarHalfLine className="relative after:content-[''] after:w-[50%] after:mx-auto after:h-2 after:absolute after:top-20 after:bg-red-600 after:z-10" />
                  <h5 className="font-sans font-semibold text-gray-600 text-xl h-full flex flex-row items-center">
                    <span>Patients</span>
                    <SiComma className="text-[7px] mr-1" />
                    <span className="mr-1">Reviews</span>
                    <span className="font-sans font-bold text-xl">:</span>
                  </h5>
                </h4>
                <div className="mt-4 flex flex-row justify-center gap-x-5 font-sans text-4xl">
                  {DoctorStars(props.DoctorObject.retaing).map((item) => item)}
                </div>
                <h4 className="font-sans font-medium text-gray-600 text-xl flex flex-row justify-center gap-x-2 mt-3">
                  <span>Overall</span>
                  <span>Rating</span>
                </h4>
                <button className="w-20 h-10 mx-auto mt-3 rounded-lg bg-blue-600 text-white text-2xl flex flex-row justify-center items-center hover:cursor-text">
                  <span className="text-4xl mr-1">
                    {parseFloat(props.DoctorObject.retaing.toFixed(1))}
                  </span>
                  <span>/</span>
                  <span>5</span>
                </button>
                <h4 className="font-sans font-medium text-gray-600 text-md flex flex-row justify-center gap-x-2 mt-2">
                  <span>Doctor</span>
                  <span>Rating</span>
                </h4>
              </section>

              <section className="h-[50%] rounded-br-xl rounded-bl-xl bg-white flex flex-col ">
                {userRatingsState.map((userRating) => {
                  const ratingDate = new Date(userRating.ratingDate);
                  return (
                    <section
                      key={userRating.ratingId}
                      className="h-40 p-5 pr-28 border-t-2 border-gray-200 flex flex-row justify-between"
                    >
                      <section>
                        <div className="flex flex-row justify-start gap-x-2 font-sans text-2xl">
                          {DoctorStars(userRating.ratingValue).map(
                            (item) => item
                          )}
                        </div>
                        <h5 className="font-sans font-medium text-gray-600 text-lg flex flex-row justify-start gap-x-2 mt-2">
                          <span>overall</span>
                          <span>Rating</span>
                        </h5>
                        <h6 className="font-sans font-medium text-gray-600 text-lg flex flex-row justify-start gap-x-2 mt-1">
                          &#39;{userRating.review}&#39;
                        </h6>
                        <h6 className="font-sans font-thin text-gray-600 text-sm flex flex-row justify-start gap-x-2 mt-1">
                          {userRating.nameU}
                        </h6>

                        <h6 className="font-sans font-semibold text-gray-700 text-sm flex flex-row justify-start gap-x-[2px]">
                          <span className="mr-1">
                            {ratingDate.getDate() === 0
                              ? "Sunday"
                              : ratingDate.getDate() === 1
                              ? "Monday"
                              : ratingDate.getDate() === 2
                              ? "Tuesday"
                              : ratingDate.getDate() === 3
                              ? "Wednesday"
                              : ratingDate.getDate() === 4
                              ? "Thursday"
                              : ratingDate.getDate() === 5
                              ? "Friday"
                              : ratingDate.getDate() === 6
                              ? "Saturday"
                              : null}
                            ,
                          </span>
                          <span className="mr-0.5">
                            {(ratingDate.getMonth() + 1).toString()}
                          </span>
                          <span>
                            {ratingDate.getMonth() === 0
                              ? "January"
                              : ratingDate.getMonth() === 1
                              ? "February"
                              : ratingDate.getMonth() === 2
                              ? "March"
                              : ratingDate.getMonth() === 3
                              ? "April"
                              : ratingDate.getMonth() === 4
                              ? "May"
                              : ratingDate.getMonth() === 5
                              ? "June"
                              : ratingDate.getMonth() === 6
                              ? "July"
                              : ratingDate.getMonth() === 7
                              ? "August"
                              : ratingDate.getMonth() === 8
                              ? "September"
                              : ratingDate.getMonth() === 9
                              ? "October"
                              : ratingDate.getMonth() === 10
                              ? "November"
                              : ratingDate.getMonth() === 11
                              ? "December"
                              : null}
                          </span>
                          <span className="mr-2">
                            {ratingDate.getFullYear().toString()}
                          </span>

                          <span className="space-x-0.5">
                            {convertTime(ratingDate.toLocaleString())}
                          </span>
                        </h6>
                      </section>
                      <section className="flex flex-col gap-y-4 pt-5">
                        <button className="w-12 h-14 mx-auto rounded-lg bg-blue-600 text-white text-2xl flex flex-row justify-center items-center hover:cursor-text">
                          <span className="text-3xl">
                            {parseFloat(userRating.ratingValue.toFixed(1))}
                          </span>
                        </button>
                        <h4 className="font-sans font-medium text-gray-600 text-md flex flex-row justify-center gap-x-2">
                          <span>Doctor</span>
                          <span>Rating</span>
                        </h4>
                      </section>
                    </section>
                  );
                })}
                <section className="h-40 p-5 pr-28 border-t-2 border-gray-200 flex flex-row justify-between">
                  <section>
                    <div className="flex flex-row justify-start gap-x-2 font-sans text-2xl">
                      {DoctorStars(props.DoctorObject.retaing).map(
                        (item) => item
                      )}
                    </div>
                    <h5 className="font-sans font-medium text-gray-600 text-lg flex flex-row justify-start gap-x-2 mt-2">
                      <span>overall</span>
                      <span>Rating</span>
                    </h5>
                    <h6 className="font-sans font-medium text-gray-600 text-lg flex flex-row justify-start gap-x-2 mt-1">
                      &#39;الدكتور مميز&#39;
                    </h6>
                    <h6 className="font-sans font-thin text-gray-600 text-sm flex flex-row justify-start gap-x-2 mt-1">
                      محمد م.
                    </h6>
                    <h6 className="font-sans font-semibold text-gray-700 text-sm flex flex-row justify-start gap-x-[2px]">
                      <span className="mr-1">Tuesday,</span>
                      <span className="mr-0.5">4</span>
                      <span>February</span>
                      <span className="mr-0.5">2025</span>
                      <span>11</span>
                      <span>:</span>
                      <span className="mr-0.5">30</span>
                      <span>AM</span>
                    </h6>
                  </section>
                  <section className="flex flex-col gap-y-4 pt-5">
                    <button className="w-12 h-14 mx-auto rounded-lg bg-blue-600 text-white text-2xl flex flex-row justify-center items-center hover:cursor-text">
                      <span className="text-3xl">5</span>
                    </button>
                    <h4 className="font-sans font-medium text-gray-600 text-md flex flex-row justify-center gap-x-2">
                      <span>Doctor</span>
                      <span>Rating</span>
                    </h4>
                  </section>
                </section>
                <section className="h-40 p-5 pr-28 border-t-2 border-gray-200 flex flex-row justify-between">
                  <section>
                    <div className="flex flex-row justify-start gap-x-2 font-sans text-2xl">
                      {DoctorStars(props.DoctorObject.retaing).map(
                        (item) => item
                      )}
                    </div>
                    <h5 className="font-sans font-medium text-gray-600 text-lg flex flex-row justify-start gap-x-2 mt-2">
                      <span>overall</span>
                      <span>Rating</span>
                    </h5>
                    <h6 className="font-sans font-medium text-gray-600 text-lg flex flex-row justify-start gap-x-2 mt-1">
                      &#39;الدكتور مميز&#39;
                    </h6>
                    <h6 className="font-sans font-thin text-gray-600 text-sm flex flex-row justify-start gap-x-2 mt-1">
                      محمد م.
                    </h6>
                    <h6 className="font-sans font-semibold text-gray-700 text-sm flex flex-row justify-start gap-x-[2px]">
                      <span className="mr-1">Tuesday,</span>
                      <span className="mr-0.5">4</span>
                      <span>February</span>
                      <span className="mr-0.5">2025</span>
                      <span>11</span>
                      <span>:</span>
                      <span className="mr-0.5">30</span>
                      <span>AM</span>
                    </h6>
                  </section>
                  <section className="flex flex-col gap-y-4 pt-5">
                    <button className="w-12 h-14 mx-auto rounded-lg bg-blue-600 text-white text-2xl flex flex-row justify-center items-center hover:cursor-text">
                      <span className="text-3xl">5</span>
                    </button>
                    <h4 className="font-sans font-medium text-gray-600 text-md flex flex-row justify-center gap-x-2">
                      <span>Doctor</span>
                      <span>Rating</span>
                    </h4>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </div>
      </section>
      <section
        className={
          changeOpacity
            ? "w-[39.1%] bg-transparent pt-5 opacity-100"
            : "w-[39.1%] bg-transparent pt-5 opacity-100"
        }
        onClick={() => setChangeOpacity(true)}
      >
        <h3 className="h-10 bg-blue-600 rounded-tr-md rounded-tl-lg font-sans font-medium text-xl text-white flex flex-row gap-x-1 justify-center items-center">
          <span>Booking</span>
          <span>information</span>
        </h3>
        <h4 className="h-20 flex flex-col justify-center items-center bg-white border-b-2 border-gray-500 font-sans font-medium text-xl text-gray-500">
          <span className="hover:cursor-pointer">Book</span>
          <span className="text-2xl text-blue-600 hover:cursor-pointer">
            Examination
          </span>
        </h4>
        <h4 className="h-24 px-20 flex flex-row justify-between items-center bg-white border-b-2 border-gray-500 font-sans font-medium text-md text-gray-500">
          <div className="w-40 flex flex-col gap-y-3 justify-center items-center h-full">
            <FaMoneyBillWave className="text-blue-600 text-4xl" />
            <span className="flex flex-row gap-x-1 hover:cursor-text">
              <span>Fees</span>
              <span className="text-gray-600 font-bold">
                {props.DoctorObject.price}
              </span>
              <span className="text-gray-600 font-bold">EGP</span>
            </span>
          </div>
          <div className="w-52 flex flex-col gap-y-3 justify-center items-center h-full">
            <WiTime2 className="text-green-500 text-4xl" />
            <span className="flex flex-row items-center gap-x-1 text-green-300 hover:cursor-text">
              <span>Waiting</span>
              <span>Time</span>
              <span className="text-xl">:</span>
              <span>{props.DoctorObject.workingHour[0].waitingHours * 60}</span>
            </span>
          </div>
        </h4>
        {!createAppointmentButtonClick.clicked ? (
          <SlideInLeft className="overflow-hidden">
            <h4 className="bg-white h-20 py-2 pl-10 border-b-2 border-gray-500 flex flex-col gap-y-1">
              <h5 className="flex flex-row gap-x-1 items-center">
                <FaLocationDot className="text-blue-600 text-3xl" />
                <p className="font-sans font-medium text-lg text-gray-500">
                  {props.DoctorObject.addressLine1}
                </p>
              </h5>
              <p className="ml-9 font-sans font-bold text-sm text-gray-600">
                Book now to receive the clinic&#39;s address details and phone
                number
              </p>
            </h4>
            <h4 className="bg-white h-24 flex justify-center items-center font-sans font-semibold text-2xl text-black">
              Choose your appointment
            </h4>
            <DoctorAppointemnetscardForCheckOut
              doctorId={props.DoctorObject.doctorId}
              clinicId={props.DoctorObject.clinicId}
              DoctorAppointements={props.DoctorObject.workingHour}
              pageName="doctor-details"
              sendFromChildToSecondParent={sendFromChild}
            />
            <h4 className="bg-white h-16 flex justify-center items-center font-sans font-normal text-lg text-gray-500 border-y-2 border-gray-400 hover:cursor-text">
              Appointment reservation
            </h4>
            <section className="px-28 h-32 bg-white rounded-bl-lg rounded-br-lg flex flex-row items-center gap-x-5">
              <BsCalendarCheckFill className="text-5xl text-green-400" />
              <div className="flex flex-col gap-y-2">
                <p className="text-gray-700 flex flex-row gap-x-1 hover:cursor-text">
                  <span>Book</span>
                  <span>online</span>
                  <span>-</span>
                  <span>Pay</span>
                  <span>at</span>
                  <span>the</span>
                  <span>clinic!</span>
                </p>
                <p className="font-sans font-normal text-gray-500 flex flex-row gap-x-1 hover:cursor-text">
                  <span>Doctor</span>
                  <span>requires</span>
                  <span>reservations!</span>
                </p>
              </div>
              {/* <button
                className="bg-green-600 font-sans font-bold text-white text-xl border border-white rounded-full"
                onClick={() => setChangeLayout(true)}
              >
                I select appointment by Salem Issa
              </button> */}
            </section>
          </SlideInLeft>
        ) : (
          <SlideInRight>
            <h4 className="bg-white h-20 py-2 pl-10 border-b-2 border-gray-500 flex flex-col gap-y-1">
              <h5 className="flex flex-row gap-x-1 items-center">
                <FaLocationDot className="text-blue-600 text-3xl" />
                <p className="font-sans font-medium text-lg text-gray-500">
                  {props.DoctorObject.addressLine1}
                </p>
              </h5>
              <p className="ml-9 font-sans font-bold text-sm text-gray-600">
                Book now to receive the clinic&#39;s address details and phone
                number
              </p>
            </h4>
            <h4 className="bg-white h-12 flex justify-center items-center font-sans font-semibold text-xl text-gray-500">
              Enter Your Info.
            </h4>

            {props.DoctorObject.workingHour.map((hour) => {
              if (
                hour.workingHourID ===
                createAppointmentButtonClick.workingHourID
              ) {
                return (
                  <h4
                    key={hour.workingHourID}
                    className="bg-white h-12 flex justify-center items-center font-sans font-semibold text-lg text-gray-500 space-x-3"
                  >
                    {hour.workingDate} - {hour.workingDay} - From{" "}
                    {convertTime(hour.startTime)} - To{" "}
                    {convertTime(hour.endTime)}
                  </h4>
                );
              }
            })}

            <form className="h-full w-full md:h-[47%] md:mb-auto bg-white rounded-bl-md lg:rounded-bl-xl flex flex-col gap-y-4">
              <section
                className="md:mt-10 md:mb-10 w-[85%] mx-auto h-[20%] border-b border-gray-300 flex flex-row gap-x-5 p-0 relative"
                ref={patientNameSection}
              >
                <BsPersonCircle className="mb-3 text-3xl text-gray-500 h-full flex justify-center items-centerx" />
                <input
                  placeholder="Patient name (who visits doctor)"
                  className="h-full mb-3 text-md text-gray-600 border-none outline-none focus:border-none w-full placeholder:text-gray-600 placeholder:text-md placeholder:font-sans selection:bg-blue-900 selection:text-white"
                  value={formik.values.patient_name}
                  onChange={formik.handleChange}
                  onFocus={(event) => {
                    if (event.target.parentElement) {
                      event.target.parentElement.style.borderBottomWidth =
                        "1px";
                      event.target.parentElement.style.borderColor = "blue";
                    }
                  }}
                  onBlur={(event) => {
                    if (event.target.parentElement) {
                      event.target.parentElement.style.borderBottomWidth = "";
                      event.target.parentElement.style.borderColor = "";
                    }
                  }}
                  type="text"
                  id="patient_name"
                  name="patient_name"
                  required
                />
                {formik.touched.patient_name && formik.errors.patient_name ? (
                  <span className="text-red-500 font-sans font-semibold absolute top-[100%] mt-1 z-10">
                    {formik.errors.patient_name}
                  </span>
                ) : null}
              </section>
              <div className="w-[85%] mx-auto flex flex-row gap-x-4">
                <section className="flex flex-col justify-center w-[80%] mx-auto my-5 hover:cursor-pointer relative">
                  <div
                    className="flex flex-row items-center justify-between mb-5"
                    onClick={() => setChooseServices(!chooseServices)}
                  >
                    <div className="flex flex-row gap-x-[0.3rem] text-center">
                      <FaBriefcaseMedical className="text-3xl w-[70px] h-[70px] flex justify-center items-center" />
                      <h4 className="space-x-3 h-full pt-2">
                        Choose Services Provided By Doctor{" "}
                        {props.DoctorObject.doctorName}
                      </h4>
                      {chooseServices ? (
                        <IoMdArrowDropdown className="text-3xl w-[70px] h-[70px] pt-1" />
                      ) : (
                        <IoMdArrowDropright className="text-3xl w-[70px] h-[70px] pt-1" />
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      chooseServices
                        ? "flex flex-col gap-y-4 opacity-100 max-h-32 transition-all duration-500 ease-in-out"
                        : "flex flex-col gap-y-4 opacity-0 max-h-0 transition-all duration-500 ease-in-out"
                    }
                  >
                    {doctorServices.map((service) => {
                      const selectServicesNames = selectServices.map(
                        (service) => service.serviceName
                      );
                      const isChecked = selectServicesNames.includes(
                        service.serviceName
                      );
                      const toggleService = () => {
                        if (isChecked) {
                          const filteredData = selectServices.filter(
                            (selectService) =>
                              selectService.serviceName !== service.serviceName
                          );
                          setSelectServices(filteredData);
                        } else {
                          setSelectServices((prev) => [
                            ...prev,
                            {
                              id: service.id,
                              price: service.price,
                              serviceName: service.serviceName,
                            },
                          ]);
                        }
                      };
                      return (
                        <div
                          key={service.id}
                          onClick={toggleService}
                          className="flex flex-row items-center"
                        >
                          <input
                            id={service.serviceName}
                            type="checkbox"
                            value={service.serviceName}
                            checked={isChecked}
                            onChange={toggleService} // onChange is better for checkboxes
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={service.serviceName}
                            className="ms-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                            onClick={toggleService}
                          >
                            {service.serviceName}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  {selectServices.length === 0 ? (
                    <span className="text-purple-500 font-sans font-semibold absolute top-[100%] mt-1 z-10 space-x-2">
                      please, select service !!!
                    </span>
                  ) : null}
                </section>
                <section
                  className="md:mb-7 w-[80%] md:w-[60%] lg:w-[80%] h-[20%] md:h-[7%] border-b border-gray-300 mx-auto flex flex-row gap-x-5 p-0 relative"
                  ref={AddressSection}
                >
                  <TfiEmail className=" mb-3 text-3xl text-gray-500 h-full flex justify-center items-center" />
                  <input
                    placeholder="Address"
                    className="h-full mb-3 text-md text-gray-600 border-none outline-none focus:border-none w-full placeholder:text-gray-600 placeholder:text-md placeholder:font-sans selection:bg-blue-900 selection:text-white"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onFocus={(event) => {
                      if (event.target.parentElement) {
                        event.target.parentElement.style.borderBottomWidth =
                          "1px";
                        event.target.parentElement.style.borderColor = "blue";
                      }
                    }}
                    onBlur={(event) => {
                      if (event.target.parentElement) {
                        event.target.parentElement.style.borderBottomWidth = "";
                        event.target.parentElement.style.borderColor = "";
                      }
                    }}
                    type="text"
                    id="address"
                    name="address"
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <span className="text-red-500 font-sans font-semibold absolute top-[100%] mt-1 z-10">
                      {formik.errors.address}
                    </span>
                  ) : null}
                </section>
              </div>
              <section className="mb-12 md:w-[60%] lg:w-[80%] md:mx-auto md:h-14 md:flex md:flex-row md:gap-x-5 ">
                <button
                  type="submit"
                  className="w-[60%] h-full flex justify-center items-center bg-red-600 text-white hover:cursor-pointer rounded-md font-sans font-medium text-xl"
                  onClick={(event) => {
                    debugger;
                    event.preventDefault();
                    if (selectServices.length > 0) {
                      if (
                        patientNameSection.current &&
                        formik.values.patient_name === ""
                      ) {
                        patientNameSection.current.style.borderBottomWidth =
                          "1px";
                        patientNameSection.current.style.borderBottomColor =
                          "red";
                      }

                      if (
                        AddressSection.current &&
                        formik.values.address === ""
                      ) {
                        AddressSection.current.style.borderBottomWidth = "1px";
                        AddressSection.current.style.borderBottomColor = "red";
                      }
                      formik.submitForm();
                    }
                  }}
                >
                  Book
                </button>
                <button
                  type="button"
                  className="w-[40%] h-full text-gray-600 flex justify-center items-center border border-gray-400 hover:cursor-pointer rounded-md font-sans font-medium text-xl"
                  onClick={() => redirect("/doctors")}
                >
                  Cancel
                </button>
              </section>
            </form>
          </SlideInRight>
        )}
      </section>
    </div>
  );
};

export default DoctorDetailsClientComponent;
