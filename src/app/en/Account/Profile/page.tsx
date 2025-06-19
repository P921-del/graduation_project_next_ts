"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { HiUser } from "react-icons/hi";
import { store } from "@/lib/store";
import SaveButton from "@/components/Account Pages/saveButton";
import { backendURL } from "@/lib/Slices/auth/authRules";

const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png"];
const validateFile = (value: any) => {
  if (value instanceof File) {
    const fileExtension = value.name.split(".").pop();
    return SUPPORTED_FORMATS.includes(`.${fileExtension?.toLowerCase()}`);
  }
  return false;
};

interface userModel {
  address: string;
  email: string;
  nameU: string;
  phoneNumber: string;
  profileImage: string;
  userName: string;
}

export default function UserProfilePage() {
  const[userId,setUserId]=useState(localStorage.getItem("userId"));
  const[token,setToken]=useState(localStorage.getItem("Token"))
  const router = useRouter();
  const userProfileForm = useRef<HTMLFormElement>(null);
  const NameInput = useRef<HTMLInputElement>(null);

  const [saveButtonStatus, setSaveButtonStatus] = useState({
    loading: false,
    saveButtonText: "Save",
    isSubmitted: false,
  });

  const [userObject, setUserObject] = useState<userModel>({
    address: "",
    email: "",
    nameU: "",
    phoneNumber: "",
    profileImage: "",
    userName: "",
  });

  const HandleSaveButton = (arg: boolean) => {
    if (arg === true) {
      userProfileForm.current?.dispatchEvent(new Event("submit"));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      profileImage: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      profileImage: Yup.mixed()
        .required("Please upload an image")
        .test("file-type", "Only JPG, JPEG, PNG allowed", validateFile),
    }),
    onSubmit: async (values) => {
      setSaveButtonStatus({
        loading: true,
        saveButtonText: "Loading...",
        isSubmitted: true,
      });

      const formData = new FormData(userProfileForm.current ?? undefined);
      formData.append("name", values.name);
      if (values.profileImage !== null) {
        formData.append("image", values.profileImage);
      }

      try {
        const response = await fetch(
          `http://citypulse.runasp.net/api/User/EditUser/${userId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to edit profile");
        }

        setSaveButtonStatus({
          loading: false,
          saveButtonText: "Submitted successfully",
          isSubmitted: true,
        });

        setTimeout(() => {
          setSaveButtonStatus({
            loading: false,
            saveButtonText: "Save",
            isSubmitted: false,
          });
        }, 2000);

        alert("Profile updated successfully!");
      } catch (error) {
        alert("Failed to update profile");
        setSaveButtonStatus({
          loading: false,
          saveButtonText: "Failed to edit",
          isSubmitted: true,
        });
        setTimeout(() => {
          setSaveButtonStatus({
            loading: false,
            saveButtonText: "Save",
            isSubmitted: false,
          });
        }, 2000);
      }
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://citypulse.runasp.net/api/User/GetUserById/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserObject(data);
          if (NameInput.current) NameInput.current.value = data.nameU;
        }
      } catch (e) {
        console.log("Error fetching user data", e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (userObject.nameU !== "") {
      formik.setFieldValue("name", userObject.nameU);
    }
    if (userObject.profileImage === "ProfileImage") {
      formik.setFieldValue("profileImage", "");
    }
  }, [userObject]);

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Profile Edit Form - Left */}
        <div className="bg-white rounded-2xl shadow-md w-full lg:w-1/2 p-8">
          <h2 className="text-blue-700 text-2xl font-semibold mb-6 text-center">
            Edit Profile
          </h2>
          <form ref={userProfileForm} onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="mb-5">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={NameInput}
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="mb-5">
              <label htmlFor="profileImage" className="block text-gray-700 font-medium mb-1">
                Profile Image <span className="text-gray-500 text-sm">(JPG, PNG)</span>
              </label>
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                onChange={(e) =>
                  formik.setFieldValue("profileImage", e.currentTarget.files?.[0])
                }
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border"
              />
              {formik.touched.profileImage && formik.errors.profileImage && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.profileImage}
                </p>
              )}
            </div>

            {/* Profile Preview */}
            <div className="flex justify-center items-center my-6">
              <div className="w-40 h-40 rounded-lg bg-gray-100 flex justify-center items-center overflow-hidden">
                {userObject.profileImage === "ProfileImage" ? (
                  <HiUser className="w-20 h-20 text-blue-600" />
                ) : (
                  <img
                    src={backendURL + "/" + userObject.profileImage}
                    alt={userObject.nameU}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Save/Cancel */}
            <div className="flex flex-row justify-between mt-4">
              <SaveButton
                saveButtonStatus={saveButtonStatus}
                HandleSaveButton={HandleSaveButton}
              />
              <button
                type="button"
                className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200"
                onClick={() => router.push("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Action Buttons - Right */}
        <div className="bg-white rounded-2xl shadow-md w-full lg:w-1/2 p-8 flex flex-col justify-center items-center gap-10">
          <h2 className="text-xl font-semibold text-gray-700">Quick Actions</h2>

          <button
            onClick={() => router.push("/en/Account/Profile/orders")}
            className="w-full max-w-sm bg-blue-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View Orders
          </button>

          <button
            onClick={() => router.push("/en/Account/Profile/appointments")}
            className="w-full max-w-sm bg-green-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-green-700 transition"
          >
            View Appointments
          </button>
        </div>
      </div>
    </div>
  );
}
