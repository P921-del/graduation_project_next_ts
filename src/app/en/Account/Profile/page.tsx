"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HiUser } from "react-icons/hi";
import { backendURL } from "@/lib/Slices/auth/authRules";
import { useFormik } from "formik";
import * as Yup from "yup";
import SaveButton from "@/components/Account Pages/saveButton";
import Link from "next/link";

const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png"];
const validateFile = (value: any) => {
  if (value instanceof File) {
    const fileExtension = value.name.split(".").pop();
    return SUPPORTED_FORMATS.includes(`.${fileExtension?.toLowerCase()}`);
  }
  return false;
};

export default function UserProfileCard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [userObject, setUserObject] = useState({
    nameU: "",
    profileImage: "ProfileImage",
  });

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("Token"));
  }, []);

  const [saveButtonStatus, setSaveButtonStatus] = useState({
    loading: false,
    saveButtonText: "Save",
    isSubmitted: false,
  });

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
      setSaveButtonStatus({ loading: true, saveButtonText: "Loading...", isSubmitted: true });

      const formData = new FormData(formRef.current ?? undefined);
      formData.append("name", values.name);
      if (values.profileImage !== null) {
        formData.append("image", values.profileImage);
      }

      try {
        const response = await fetch(`${backendURL}/api/User/EditUser/${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) throw new Error("Failed");

        setSaveButtonStatus({ loading: false, saveButtonText: "Saved", isSubmitted: true });
        setTimeout(() => {
          setShowForm(false);
          window.location.reload();
        }, 1000);
      } catch (error) {
        alert("Failed to update profile");
        setSaveButtonStatus({ loading: false, saveButtonText: "Failed", isSubmitted: true });
      }
    },
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${backendURL}/api/User/GetUserById/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUserObject(data);
        formik.setFieldValue("name", data.nameU);
      }
    }

    if (userId && token) fetchData();
  }, [userId, token]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Profile Image */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100 mb-4">
          {userObject.profileImage === "ProfileImage" ? (
            <HiUser className="w-full h-full text-blue-600" />
          ) : (
            <img
              src={`${backendURL}/${userObject.profileImage}`}
              alt={userObject.nameU}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Name */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{userObject.nameU}</h2>

        {/* Edit Button */}
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-blue-600 text-white px-4 py-1.5 text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1 mx-auto"
        >
          Edit ✏️
        </button>

        {/* Action Buttons in a Row */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <button
            onClick={() => router.push("/en/Account/Profile/orders")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            View Orders
          </button>
          <button
            onClick={() => router.push("/en/Account/Profile/appointments")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            View Appointments
          </button>
        </div>

        {/* Service Icons */}
      <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-3 mt-2">
      <Link href="/services/Schools" className="hover:underline hover:text-blue-600 transition">🏫 Schools</Link>
      <Link href="/services/hospitals" className="hover:underline hover:text-blue-600 transition">🏥 Hospitals</Link>
      <Link href="/services/Restaurants" className="hover:underline hover:text-blue-600 transition">🍽️ Restaurants</Link>
      <Link href="/doctors" className="hover:underline hover:text-blue-600 transition">🩺 Clinics</Link>
</div>

      </div>

      {/* Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">
              Edit Profile
            </h3>
            <form ref={formRef} onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-4 py-2 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  name="profileImage"
                  type="file"
                  onChange={(e) =>
                    formik.setFieldValue("profileImage", e.currentTarget.files?.[0])
                  }
                  onBlur={formik.handleBlur}
                  className="w-full border px-4 py-2 rounded-md bg-gray-50"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <SaveButton
                  saveButtonStatus={saveButtonStatus}
                  HandleSaveButton={(arg) =>
                    arg && formRef.current?.dispatchEvent(new Event("submit"))
                  }
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
