"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TbMessageReportFilled } from "react-icons/tb";
import { PiUsersThreeFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { HiUser } from "react-icons/hi";
import SaveButton from "@/components/Account Pages/saveButton";
import { backendURL } from "@/lib/Slices/auth/authRules";
type Props = {};

const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png"];
const validateFile = (value: any) => {
  if (value instanceof File) {
    const fileExtension = value.name.split(".").pop(); // Get the file extension
    if (SUPPORTED_FORMATS.includes(`.${fileExtension?.toLowerCase()}`)) {
      return true; // File type is valid
    }
    return false; // Invalid file type
  }
};
interface userModel {
  address: string;
  email: string;
  nameU: string;
  phoneNumber: string;
  profileImage: string;
  userName: string;
}
interface EditUserModel {
  name: string;
  profileImage: File | null;
}
export default function UserProfilePage({}: Props) {
  const router = useRouter();
  const userProfileForm = useRef<HTMLFormElement>(null);
  const initialState = {
    loading: false,
    saveButtonText: "Save",
    isSubmitted: false,
  };
  //const [isOpened, setIsOpened] = useState<boolean>(true);
  const [saveButtonStatus, setSaveButtonStatus] = useState(initialState);
  function HandleSaveButton(arg: boolean) {
    if (arg === true) {
      console.log(true);
      userProfileForm.current?.dispatchEvent(new Event("submit"));
      // userProfileForm.current?.addEventListener("submit", (e) =>
      //   e.preventDefault()
      // );
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      profileImage: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      profileImage: Yup.mixed()
        .required("Please, Upload your avatar!!!")
        .test(
          "file-type",
          "File must be an image (jpg, jpeg, png)",
          validateFile
        ),
    }),
    onSubmit: async (values) => {
      console.log("submmitted by salem");
      debugger;
      setSaveButtonStatus({
        loading: true,
        saveButtonText: "Loading...",
        isSubmitted: true,
      });
      //إنشاء FormData وإضافة البيانات إليها
      const formData = new FormData(
        userProfileForm.current !== null ? userProfileForm.current : undefined
      );
      formData.append("name", values.name);
      if (values.profileImage !== null)
        formData.append("image", values.profileImage);
      try {
        debugger;
        const response = await fetch(
          `http://citypulse.runasp.net/api/User/EditUser/${
            store.getState().auth.user?.id
          }`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${store.getState().auth.userToken}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          // if (response.status === 400) {
          //   const data = await response.json();

          //   if (data.errors.PhoneNumber.length > 0) {
          //     console.log(data.errors);
          //     formik.setFieldError("phoneNumber", data.errors.PhoneNumber[0]);
          //   }

          //   // SyntaxError: Unexpected token 'u', "userName i"... is not valid JSON
          // }
          console.log(response);
          setSaveButtonStatus({
            loading: false,
            saveButtonText: "Failed to edit your profile", //
            isSubmitted: true,
          });
          //console.log(formData);
          setTimeout(() => {
            setSaveButtonStatus({
              loading: false,
              saveButtonText: "Save",
              isSubmitted: false,
            });
            formik.resetForm();
          }, 2000);
          throw new Error("Failed to edit your profile");
        } else {
          console.log(response);
          setSaveButtonStatus({
            loading: false,
            saveButtonText: "submited successfully", //
            isSubmitted: true,
          });
          //console.log(formData);
          setTimeout(() => {
            setSaveButtonStatus({
              loading: false,
              saveButtonText: "Save",
              isSubmitted: false,
            });
          }, 2000);
          alert("EditProfile successful!");
          console.log(response);
        }
      } catch (error) {
        console.log("request failed");
        alert("EditProfile failed");
        console.log(`Fetch erro:`, error);
        console.log(error);
        setSaveButtonStatus({
          loading: false,
          saveButtonText: "Failed to edit your profile", //
          isSubmitted: true,
        });
        setTimeout(() => {
          setSaveButtonStatus({
            loading: false,
            saveButtonText: "Save",
            isSubmitted: false,
          });
          formik.resetForm();
        }, 2000);
      } finally {
        setSaveButtonStatus({
          loading: false,
          saveButtonText: "Save",
          isSubmitted: false,
        });
      }
    },
  });

  const [userObject, setUserObject] = useState<userModel>({
    address: "",
    email: "",
    nameU: "",
    phoneNumber: "",
    profileImage: "",
    userName: "",
  });
  const NameInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://citypulse.runasp.net/api/User/GetUserById/${
            store.getState().auth.user?.id
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${store.getState().auth.userToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserObject({
            address: data.address,
            email: data.email,
            nameU: data.nameU,
            phoneNumber: data.phoneNumber,
            profileImage: data.profileImage,
            userName: data.userName,
          });
          if (NameInput.current !== null)
            NameInput.current.value = userObject.nameU;
          console.log(data);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, [store.getState().auth.user?.id]);
  useEffect(() => {
    if (userObject.nameU !== "") {
      formik.setFieldValue("name", userObject.nameU);
    }
    if (userObject.profileImage === "ProfileImage") {
      formik.setFieldValue("profileImage", "");
    }
  }, [userObject]);

  return (
    <div className="font-sans text-white bg-blue-50 flex flex-row justify-between pl-10 pr-10 2xl:pl-48 2xl:pr-80 pt-10 pb-12">
      <div className="h-40 bg-white rounded-2xl flex flex-col gap-y-1 font-normal text-white w-[23%]">
        <div
          className="border-b border-gray-300 bg-blue-700 flex flex-row items-center justify-center 2xl:justify-start 2xl:pl-20 space-x-1 rounded-tl-2xl rounded-tr-2xl h-10 hover:cursor-pointer"
          onClick={() => router.push("/en/Account/Profile")}
        >
          <TbMessageReportFilled className="text-3xl" />{" "}
          <h2 className="text-lg">Profile</h2>
        </div>
        <div className="text-gray-500 border-b border-gray-300 bg-white flex flex-row items-center justify-center 2xl:justify-start 2xl:pl-20 space-x-2 h-12">
          <PiUsersThreeFill className="text-3xl" />{" "}
          <h2 className="text-lg space-x-1">Change Password</h2>
        </div>
        <div></div>
      </div>
      <div className="h-[600px] bg-white rounded-2xl flex flex-col gap-y-1 font-sans font-normal text-white w-[75%]">
        <h2 className=" bg-blue-700 text-white text-2xl flex flex-row justify-center items-center space-x-2 rounded-tl-2xl rounded-tr-2xl h-9">
          Manage Profile
        </h2>
        <form
          ref={userProfileForm}
          className="h-auto py-10 pl-10 pr-5"
          onSubmit={formik.handleSubmit}
        >
          <div
            className={
              formik.errors.name && formik.errors.name
                ? "flex flex-row items-center mb-1"
                : "flex flex-row items-center mb-10"
            }
          >
            <label
              className="text-gray-600 text-2xl space-x-1 w-[30%]"
              htmlFor="name"
            >
              Your Name<span className="text-2xl text-red-500 ml-0.5">*</span>:
            </label>
            <input
              ref={NameInput}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="name"
              name="name"
              className="text-gray-800 w-[70%] bg-slate-100 border-b rounded-lg pl-7 py-3 focus:shadow-md focus:shadow-blue-400 focus:border-blue-600"
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <span className="mb-10 pl-[30%] text-red-600">
              {formik.errors.name}
            </span>
          ) : null}
          <div className={"flex flex-row items-center mb-14"}>
            <label
              className="text-gray-600 text-2xl space-x-1 w-[30%]"
              htmlFor="profileImage"
            >
              Upload Your Image here
              <span className="text-2xl text-gray-700 ml-0.5 space-x-2">
                ( optional )
              </span>
              :
            </label>
            <input
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                formik.setFieldValue("profileImage", file);
              }}
              onBlur={formik.handleBlur}
              type="file"
              id="profileImage"
              name="profileImage"
              className="text-gray-800 w-[70%] bg-slate-100 border-b rounded-lg pl-7 py-3 focus:shadow-md focus:shadow-blue-400 focus:border-blue-600"
            />
          </div>
          {formik.touched.profileImage && formik.errors.profileImage ? (
            <span className="mb-1 pl-[30%] text-red-600">
              {formik.errors.profileImage}
            </span>
          ) : null}
          <div className="flex flex-row justify-center items-center mb-14">
            <div className="flex flex-row justify-center items-center bg-gray-100 w-52 h-40 rounded-md">
              {userObject.profileImage === "ProfileImage" ? (
                <HiUser className="w-24 h-24 text-blue-600" />
              ) : (
                <img
                  src={backendURL + "/" + userObject.profileImage}
                  alt={userObject.nameU}
                  className="w-full h-full rounded-md"
                />
              )}
            </div>
          </div>
          <div className="flex flex-row items-center mb-10 pl-[30%]">
            <div className="bg-white flex flex-row gap-x-12">
              <SaveButton
                saveButtonStatus={saveButtonStatus}
                HandleSaveButton={HandleSaveButton}
              />
              <button
                type="button"
                className="font-normal text-black bg-gray-100 flex justify-center items-center w-40 px-10 py-3 rounded-md hover:cursor-pointer"
                onClick={() => router.push("/")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
{
  /*(
                
                <img
                  src={userObject.profileImage}
                  alt={userObject.nameU}
                  className="w-full h-full"
                />
              ) */
}
