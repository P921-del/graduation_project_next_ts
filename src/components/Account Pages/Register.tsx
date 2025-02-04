"use client";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../../Styles/register.css";
import {
  onlyAlphabetical,
  onlyNumbers,
} from "../../ExternalFunctions/AccountFunctions/HandelInput/HandelInputtyping";
import SubmitButton from "./submitButton";
import { useRouter } from "next/navigation";
import { register } from "@/utils/types";

const RegisterComponent: React.FC = () => {
  const validateUsername = async (value: string) => {
    try {
      //debugger;
      const response = await fetch(
        `http://citypulse.runasp.net/api/User/IsUserNameUnique?userName=${value}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      console.log(data);
      if (JSON.parse(data)) {
        return false; // Username is not unique
      } else {
        return true; // Username is unique
      }
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      return false; // Default to not unique
    }
  };
  const validateEmail = async (value: string) => {
    try {
      const response = await fetch(
        `http://citypulse.runasp.net/api/User/IsEmailUnique?email=${value}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      if (JSON.parse(data)) {
        return false; // Email is not unique
      } else {
        return true; // Email is unique
      }
    } catch (error) {
      console.error("Error checking email uniqueness:", error);
      return false; // Default to not unique
    }
  };
  const inputFile = useRef<HTMLInputElement>(null);
  const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png"];
  const validateFile = (value: any) => {
    if (value) {
      const fileExtension = value.split(".").pop(); // Get the file extension
      console.log(fileExtension);
      if (SUPPORTED_FORMATS.includes(`.${fileExtension}`)) {
        return true; // File type is valid
      }
      return false; // Invalid file type
    }
  };
  const registerForm = useRef<HTMLFormElement>(null);
  const initialState = {
    loading: false,
    submitButtonText: "Register",
    isSubmitted: false,
  };
  const [submitButtonStatus, setSubmitButtonStatus] = useState(initialState);
  const router = useRouter();
  function HandleSubmitButton(arg: boolean) {
    if (arg === true) {
      registerForm.current?.dispatchEvent(new Event("submit"));
    }
  }

  const formik = useFormik({
    initialValues: {
      Name: "",
      phoneNumber: "",
      userName: "",
      email: "",
      confirmEmail: "",
      role: "",
      password: "",
      confirmPassword: "",
      address: "",
      profileImage: undefined,
    },
    validationSchema: Yup.object().shape({
      Name: Yup.string().required("Name is required"),
      phoneNumber: Yup.string().required("phoneNumber is required"),
      userName: Yup.string()
        .required("Username is required")
        .test("unique-username", "Username is already taken", validateUsername),
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
        .test("unique-email", "Email is already taken", validateEmail),
      confirmEmail: Yup.string()
        .required("Confirm email is required")
        .oneOf([Yup.ref("email"), ""], "Email must match"),
      role: Yup.string().required("Role is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Password must contain at least one special character (@$!%*?&)"
        ),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
      address: Yup.string().required("Address is required"),
      profileImage: Yup.mixed()
        .required("Profile image is required")
        .test(
          "file-type",
          "File must be an image (jpg, jpeg, png)",
          validateFile
        ),
    }),
    onSubmit: (values) => {
      setSubmitButtonStatus({
        loading: true,
        submitButtonText: "loading...",
        isSubmitted: true,
      });
      setTimeout(() => {
        if (
          formik.values.Name !== "" &&
          formik.values.phoneNumber !== "" &&
          formik.values.email !== "" &&
          formik.values.userName !== "" &&
          formik.values.password &&
          formik.values.confirmPassword &&
          formik.values.address &&
          formik.values.profileImage !== undefined
        ) {
          const user: register = {
            NameU: formik.values.Name,
            UserName: formik.values.userName,
            Email: formik.values.email,
            Password: formik.values.password,
            ConfirmPassword: formik.values.confirmPassword,
            PhoneNumber: formik.values.phoneNumber,
            Address: formik.values.address,
            ProfileImage: formik.values.profileImage,
          };
          // إنشاء FormData وإضافة البيانات إليها
          const formData = new FormData(
            registerForm.current !== null ? registerForm.current : undefined
          );
          const uploadToAPI = async (user: register) => {
            formData.append("NameU", user.NameU);
            formData.append("UserName", user.UserName);
            formData.append("email", user.Email);
            formData.append("password", user.Password);
            formData.append("confirmPassword", user.ConfirmPassword);
            formData.append("phoneNumber", user.PhoneNumber);
            formData.append("address", user.Address);
            formData.append("ProfileImage", user.ProfileImage);
            debugger;
            console.log(formData.get("NameU"));
            try {
              const response = await fetch(
                "http://citypulse.runasp.net/api/User/register",
                {
                  method: "POST",
                  // Adding body or contents to send
                  body: formData,
                }
              );
              console.log(response.json());
              if (!response.ok) {
                setSubmitButtonStatus({
                  loading: false,
                  submitButtonText: "Failed to register", //
                  isSubmitted: true,
                });
                setTimeout(() => {
                  setSubmitButtonStatus({
                    loading: false,
                    submitButtonText: "Register",
                    isSubmitted: false,
                  });
                  formik.resetForm();
                }, 2000);
                throw new Error("Failed to register");
              } else {
                setSubmitButtonStatus({
                  loading: false,
                  submitButtonText: "submited successfully", //
                  isSubmitted: true,
                });
                setTimeout(() => {
                  setSubmitButtonStatus({
                    loading: false,
                    submitButtonText: "Register",
                    isSubmitted: false,
                  });
                  formik.resetForm();
                  router.push("/login");
                }, 2000);
                console.log("Registration successful:", response.status);
                alert("Registration successful!");
                const result = await response.json();
                console.log(result);
              }
            } catch (error) {
              console.log(`Fetch erro:`, error);
              setSubmitButtonStatus({
                loading: false,
                submitButtonText: "Failed to register", //
                isSubmitted: true,
              });
              setTimeout(() => {
                setSubmitButtonStatus({
                  loading: false,
                  submitButtonText: "Register",
                  isSubmitted: false,
                });
                formik.resetForm();
              }, 2000);
            }
          };
          uploadToAPI(user);
        }
      }, 3000);
    },
  });
  return (
    <div className="main">
      <div className=" pt-4 mb-6 bg-gray-50 ">
        <div className="registercont flex">
          <div className="img">
            <img
              className="w-full h-full"
              src="/assets/Images/register3.jpeg"
              alt="signUpBackground_Image"
            />
          </div>
          <div className="regform">
            <form
              id="register-form"
              ref={registerForm}
              className="frm"
              onSubmit={formik.handleSubmit}
              action={"http://citypulse.runasp.net/api/User/register"}
              method="POST"
            >
              <div className="grouping">
                <div className="each_in_grouping">
                  <label htmlFor="Name">
                    Name<span className="text-2xl text-red-500">*</span>:
                  </label>
                  <input
                    value={formik.values.Name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={(event) => {
                      onlyAlphabetical(event);
                    }}
                    type="text"
                    id="Name"
                    name="Name"
                  />
                  {formik.touched.Name && formik.errors.Name ? (
                    <span className="errors">{formik.errors.Name}</span>
                  ) : null}
                </div>
                <div className="each_in_grouping">
                  <label htmlFor="phoneNumber">
                    Phone Number<span className="text-2xl text-red-500">*</span>
                    :
                  </label>
                  <input
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={(event) => {
                      onlyNumbers(event);
                    }}
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <span className="errors">{formik.errors.phoneNumber}</span>
                  ) : null}
                </div>
              </div>
              <div className="grouping">
                <div className="each_in_grouping">
                  <label htmlFor="email">
                    Email Address
                    <span className="text-2xl text-red-500">*</span>:
                  </label>
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    id="email"
                    name="email"
                    onCopy={(event) => event.preventDefault()}
                    onPaste={(event) => event.preventDefault()}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span className="errors">{formik.errors.email}</span>
                  ) : null}
                </div>
                <div className="each_in_grouping">
                  <label htmlFor="ConfirmEmailAddress">
                    Confirm Email Address
                    <span className="text-2xl text-red-500">*</span>:
                  </label>
                  <input
                    value={formik.values.confirmEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    id="ConfirmEmailAddress"
                    name="confirmEmail"
                    onCopy={(event) => event.preventDefault()}
                    onPaste={(event) => event.preventDefault()}
                  />
                  {formik.touched.confirmEmail && formik.errors.confirmEmail ? (
                    <span className="errors">{formik.errors.confirmEmail}</span>
                  ) : null}
                </div>
              </div>
              <div className="grouping">
                <div className="each_in_grouping">
                  <label htmlFor="user">
                    UserName<span className="text-2xl text-red-500">*</span>:
                  </label>
                  <input
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    id="user"
                    name="userName"
                  />
                  {formik.touched.userName && formik.errors.userName ? (
                    <span className="errors">{formik.errors.userName}</span>
                  ) : null}
                </div>
                <div className="each_in_grouping">
                  <label htmlFor="role">
                    User Kind<span className="text-2xl text-red-500">*</span>:
                  </label>
                  <select
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="role"
                    name="role"
                  >
                    <option value=" ">Select user type please</option>
                    <option value="nUser">Normal User</option>
                    <option value="doctor">Doctor</option>
                    <option value="restaurantOwner">Restaurant Owner</option>
                  </select>
                  {formik.touched.role && formik.errors.role ? (
                    <span className="errors">{formik.errors.role}</span>
                  ) : null}
                </div>
              </div>
              <div className="grouping pb-6">
                <div className="each_in_grouping">
                  <label htmlFor="pass">
                    Password<span className="text-2xl text-red-500">*</span>:
                  </label>
                  <input
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    id="pass"
                    name="password"
                    onCopy={(event) => event.preventDefault()}
                    onPaste={(event) => event.preventDefault()}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <span className="errors">{formik.errors.password}</span>
                  ) : null}
                </div>
                <div className="each_in_grouping">
                  <label htmlFor="confirmPassword">
                    confirmPassword
                    <span className="text-2xl text-red-500">*</span>:
                  </label>
                  <input
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onCopy={(event) => event.preventDefault()}
                    onPaste={(event) => event.preventDefault()}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <span className="errors">
                      {formik.errors.confirmPassword}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="grouping pb-6 border-b border-b-slate-300 ">
                <div className="each_in_grouping">
                  <label htmlFor="pass">
                    ِAddres<span className="text-2xl text-red-500">*</span>:
                  </label>
                  <input
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    id="address"
                    name="address"
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <span className="errors">{formik.errors.address}</span>
                  ) : null}
                </div>
                <div className="each_in_grouping">
                  <label htmlFor="image">
                    Upload Your Image here (optional):
                  </label>
                  <input
                    value={formik.values.profileImage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={inputFile}
                    type="file"
                    id="v"
                    name="profileImage"
                    accept="image/jpeg, image/png, image/jpg"
                  />
                  {formik.errors.profileImage &&
                    formik.touched.profileImage && (
                      <div style={{ color: "red" }}>
                        {typeof formik.errors.profileImage === "string"
                          ? formik.errors.profileImage
                          : null}
                      </div>
                    )}
                </div>
              </div>
              <div
                className="px-2 
                    flex items-center justify-center gap-2 
                    bg-transparent h-[15%] md:h-[20%] mb-2"
              >
                <h3
                  className="text-gray-500 text-base md:text-md font-sans font-bold cursor-default"
                  style={{ userSelect: "none" }}
                >
                  Already have an account?
                </h3>
                <button
                  className="text-blue-700 text-base md:text-md
                         font-sans font-bold
                          hover:underline hover:text-blue-300
                           flex items-center justify-center
                          "
                  onClick={() => router.push("/login")}
                >
                  Log in!
                </button>
              </div>
              <SubmitButton
                submitButtonStatus={submitButtonStatus}
                HandleSubmitButton={HandleSubmitButton}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterComponent;
