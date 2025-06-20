"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../../styles/register.css";
import { onlyNumbers } from "../../ExternalFunctions/AccountFunctions/HandelInput/HandelInputtyping";
import SubmitButton from "./submitButton";
import { useRouter } from "next/navigation";

interface RegisterModel {
  nameU: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}
const RegisterComponent: React.FC = () => {
  const validateUsername = async (value: string) => {
    try {
      //debugger;
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/citypulse.runasp.net/api/User/IsUserNameUnique?userName=${value}`,
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
        `https://cors-anywhere.herokuapp.com/citypulse.runasp.net/api/User/IsEmailUnique?email=${value}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      if (JSON.parse(data)) {
        return true; // Email is not unique
      } else {
        return false; // Email is unique
      }
    } catch (error) {
      console.error("Error checking email uniqueness:", error);
      return false; // Default to not unique
    }
  };
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
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const [submitButtonStatus, setSubmitButtonStatus] = useState(initialState);
  const router = useRouter();
  function HandleSubmitButton(arg: boolean) {
    if (arg === true) {
      registerForm.current?.dispatchEvent(new Event("submit"));
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      userName: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      userName: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      // .test("Email is already exists", validateEmail),
      confirmEmail: Yup.string()
        .required("Confirm email is required")
        .oneOf([Yup.ref("email"), ""], "Emails must match"),
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
    }),
    onSubmit: async (values) => {
      setSubmitButtonStatus({
        loading: true,
        submitButtonText: "Loading...",
        isSubmitted: true,
      });
      try {
        debugger;
        // إنشاء FormData وإضافة البيانات إليها
        // const formData = new FormData(
        //   registerForm.current !== null ? registerForm.current : undefined
        // );
        // formData.append("nameU", values.name);
        // formData.append("userName", values.userName);
        // formData.append("email", values.email);
        // formData.append("password", values.password);
        // formData.append("confirmPassword", values.confirmPassword);
        // formData.append("phoneNumber", values.phoneNumber);
        // formData.append("address", values.address);
        const user: RegisterModel = {
          nameU: values.name,
          userName: values.userName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
          address: values.address,
        };
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/citypulse.runasp.net/api/User/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        if (!response.ok) {
          if (response.status === 400) {
            const data = await response.json();

            if (data.errors.PhoneNumber.length > 0) {
              console.log(data.errors);
              formik.setFieldError("phoneNumber", data.errors.PhoneNumber[0]);
            }

            // SyntaxError: Unexpected token 'u', "userName i"... is not valid JSON
          }
          setSubmitButtonStatus({
            loading: false,
            submitButtonText: "Failed to register", //
            isSubmitted: true,
          });
          //console.log(formData);
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
          //console.log(formData);
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
        if (
          error instanceof SyntaxError &&
          error.message.includes(
            `Unexpected token 'u', "userName i"... is not valid JSON`
          )
        ) {
          formik.setFieldError("userName", "userName is already taken");
        }
        if (
          error instanceof SyntaxError &&
          error.message.includes(
            `Unexpected token 'E', "Email is a"... is not valid JSON`
          )
        ) {
          formik.setFieldError("email", "Email is already taken");
        }
        console.log("request failed");
        alert("Registration failed");
        console.log(`Fetch erro:`, error);
        console.log(error);
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
      } finally {
        setSubmitButtonStatus({
          loading: false,
          submitButtonText: "Register",
          isSubmitted: false,
        });
      }
    },
  });

  useEffect(() => {
    if (!isOpened) {
      formik.setErrors({
        name: "",
        phoneNumber: "",
        userName: "",
        email: "",
        password: "",
        confirmEmail: "",
        address: "",
      });
    }
  }, [isOpened]);

  return (
    <div
      className={
        isOpened
          ? "relative main show home flex justify-center items-center"
          : "relative main home flex justify-center items-center"
      }
      style={{ backgroundImage: "url('/assets/Images/homepage .png')" }}
    >
      <div className="absolute container pt-20 z-30">
        <form
          ref={registerForm}
          className="mt-40 frm flex flex-col justify-start gap-y-2 pb-5"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="block text-3xl font-bold text-center">Signup</h1>
          <div className="flex flex-col w-full pl-5">
            <div className="each_in_grouping mb-3">
              <label htmlFor="name">
                Name<span className="text-2xl text-red-500">*</span>:
              </label>
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="name"
                name="name"
              />
              {formik.touched.name && formik.errors.name ? (
                <span className="errors">{formik.errors.name}</span>
              ) : null}
            </div>

            <div className="each_in_grouping mb-3">
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
              <label htmlFor="phoneNumber">
                Phone Number<span className="text-2xl text-red-500">*</span>:
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

            <div className="each_in_grouping mb-3">
              <label htmlFor="address">
                Addrres<span className="text-2xl text-red-500">*</span>:
              </label>
              <textarea
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="address"
                name="address"
                rows={3}
              ></textarea>
              {formik.touched.address && formik.errors.address ? (
                <span className="errors">{formik.errors.address}</span>
              ) : null}
            </div>

            <div className="w-[95%] flex flex-row gap-x-4 mb-3">
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
                <label
                  id="confirmEmailLabel"
                  className="w-full"
                  htmlFor="ConfirmEmailAddress"
                >
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

            <div className="w-[95%] flex flex-row gap-x-4 mb-10">
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

            <SubmitButton
              submitButtonStatus={submitButtonStatus}
              HandleSubmitButton={HandleSubmitButton}
            />
          </div>
        </form>
        <div
          className="px-2 mt-4
                    flex items-center justify-center gap-2  col-span-2
                    bg-transparent h-[15%] md:h-[20%] mb-2
                    "
        >
          <div className="-translate-y-[110px] flex flex-row gap-x-4">
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
              onClick={() => {
                debugger;
                setIsOpened(false);
                formik.setTouched(formik.initialTouched);
                setTimeout(() => {
                  router.push("/login");
                }, 500);
              }}
            >
              Log in!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterComponent;
