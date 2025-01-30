"use client";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../../Styles/register.css";
import { onlyAlphabetical } from "../../ExternalFunctions/AccountFunctions/HandelInput/HandelInputtyping";
import SubmitButton from "./submitButton";
import { useRouter } from "next/router";
const Register: React.FC = () => {
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
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      confirmEmail: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("firstName is required"),
      lastName: Yup.string().required("lastName is required"),
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
              src="../../../assests/signUpBackground.webp"
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
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={(event) => {
                      onlyAlphabetical(event);
                    }}
                    type="text"
                    id="firstName"
                    name="firstName"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <span className="errors">{formik.errors.firstName}</span>
                  ) : null}
                </div>
                <div className="each_in_grouping">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={(event) => {
                      onlyAlphabetical(event);
                    }}
                    type="text"
                    id="lastName"
                    name="lastName"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <span className="errors">{formik.errors.lastName}</span>
                  ) : null}
                </div>
              </div>
              <div className="grouping">
                <div className="each_in_grouping">
                  <label htmlFor="email">Email Address:</label>
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
                    Confirm Email Address:
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
                  <label htmlFor="user">UserName</label>
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
                  <label htmlFor="role">User Kind</label>
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
              <div className="grouping pb-6 border-b border-b-slate-300 ">
                <div className="each_in_grouping">
                  <label htmlFor="pass">Password</label>
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
                  <label htmlFor="confirmPassword">confirmPassword</label>
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
export default Register;
