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

const RegisterComponent: React.FC = () => {
  const initialStateImageFile = {
    showErrorMessageforAllowedFile: false,
    errorMessageforAllowedFile: "",
  };
  const [allowedImageFile, setAllowedImageFile] = useState(
    initialStateImageFile
  );
  const HandleUploadImageFile = (fileValue: string) => {
    const _extensions = [".png", ".jpg", ".jpeg"];
    if (fileValue !== null) {
      const allowedFile = _extensions.includes(fileValue.toString());
      if (!allowedFile) {
        setAllowedImageFile({
          showErrorMessageforAllowedFile: true,
          errorMessageforAllowedFile:
            "Only PNG , JPG and JPEG images are allowed.",
        });
      } else {
        setAllowedImageFile(initialStateImageFile);
      }
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
    },
    validationSchema: Yup.object().shape({
      Name: Yup.string().required("firstName is required"),
      phoneNumber: Yup.string().required("phoneNumber is required"),
      userName: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      confirmEmail: Yup.string()
        .required("Confirm email is required")
        .oneOf([Yup.ref("email"), ""], "Email must match"),
      role: Yup.string().required("Role is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      setSubmitButtonStatus({
        loading: true,
        submitButtonText: "loading...",
        isSubmitted: true,
      });
      setTimeout(() => {
        setSubmitButtonStatus({
          loading: false,
          submitButtonText: "submited successfully",
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
        console.log("Form data", values);
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
              ref={registerForm}
              className="frm"
              onSubmit={formik.handleSubmit}
            >
              <div className="grouping">
                <div className="each_in_grouping">
                  <label htmlFor="firstName">
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
                    name="firstName"
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
                  <label htmlFor="pass">ِAddres(optional):</label>
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
                    onChange={(event) => {
                      HandleUploadImageFile(event?.target.value);
                    }}
                    onBlur={(event) => {
                      HandleUploadImageFile(event?.target.value);
                    }}
                    type="file"
                    id="image"
                    name="image"
                    accept="image/jpeg, image/png, image/jpg"
                  />
                  {allowedImageFile.showErrorMessageforAllowedFile &&
                  allowedImageFile.errorMessageforAllowedFile ? (
                    <span className="errors">
                      {allowedImageFile.errorMessageforAllowedFile}
                    </span>
                  ) : null}
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
