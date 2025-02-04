"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import loginReducer, {
  initialState,
} from "../../Reducers/loginReducer/loginReducer";
import {
  checkCredentialsExistInSystem,
  HandelLoginSubmitButton,
} from "../../ExternalFunctions/AccountFunctions/Account";
import ErrorMessageForLoginPage from "./ErrorMessageForLoginPage";
import { stage } from "./ErrorMessageForLoginPage";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../lib/Slices/auth/authSlice";
function Login() {
  const dispatchStore = useDispatch();
  console.log("render LoginPage");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<false | boolean>(false);
  const [loginState, dispatch] = useReducer(loginReducer, initialState);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const loginForm = useRef<HTMLFormElement>(null);
  const [stageAnimations, setStageAnimations] = useState<
    stage.first | stage.second
  >(stage.first);
  const [ErrorMessageShowed, setErrorMessageShowed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [disableSubmmitButton, setDisableSubmmitButton] = useState<
    boolean | undefined
  >(false);
  useEffect(() => {
    if (Number(localStorage.getItem("number_of_failed_trials")) >= 5) {
      setDisableSubmmitButton(true);
      const timer = setTimeout(() => {
        setDisableSubmmitButton(false);
        //reset the value of number_of_failed_trials in the state
        loginState.number_of_failed_trials.value = 0;
        //reset value for existing field in local storage
        localStorage.setItem("number_of_failed_trials", "0");
        localStorage.removeItem("number_of_failed_trials");
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [loginState.number_of_failed_trials.value]);
  useEffect(() => {
    if (ErrorMessageShowed && loginState.errors.value !== "") {
      setErrorMessage(loginState.errors?.value);
    }
  }, [ErrorMessageShowed, loginState.errors]);

  return (
    <div className="relative bg-blue-500 w-full h-[600px] md:h-[590px] flex flex-wrap items-center justify-center z-0">
      <div
        className="w-[85%] lg:w-1/3
             h-[60%]
              my-auto mx-auto
               bg-[#F5F5F5]"
      >
        <h1 className="h-1/6 bg-blue-950 flex items-center justify-center text-white font-sans font-bold ">
          Login
        </h1>
        <form
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              console.log("login form submmited successfully");
              loginForm.current?.submit();
            }
          }}
          ref={loginForm}
          className="h-[83%]"
          onSubmit={async (event) => {
            event.preventDefault(); //Prevent the default from submission behavior
            await HandelLoginSubmitButton(
              emailInputRef.current?.value,
              passwordInputRef.current?.value,
              dispatch
            );
            if (
              !loginState.loggedIn.value &&
              loginState.number_of_failed_trials.value < 5
            ) {
              setErrorMessageShowed(true);
              setStageAnimations(stage.first);
              setTimeout(() => {
                setStageAnimations(stage.second);
                setTimeout(() => {
                  setErrorMessageShowed(false);
                }, 500);
              }, 2000);
            } else {
              const checkCredentials = checkCredentialsExistInSystem(
                loginState.email.value,
                loginState.password.value
              );
              if ((await checkCredentials).checked) {
                dispatchStore(
                  setCredentials(
                    ((await checkCredentials).data,
                    (await checkCredentials).data?.userToken)
                  )
                );
              }
              console.log("submmitted successfully");
            }
          }}
        >
          <div
            className="px-2 
                    flex flex-col md:flex-row md:items-center 
                    sm:gap-0 md:gap-10 
                    bg-transparent h-[60%] md:h-1/2 my-3 md:my-0  
                     border-b border-b-slate-300"
          >
            <div className="sm:w-full lg:w-[50%]">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-sans font-medium text-gray-900 dark:text-white"
              >
                User Name:
              </label>
              <input
                id="username"
                type="text"
                className="bg-white
                            w-full p-2.5
                             border border-gray-300
                             text-gray-900 text-sm font-sans 
                             rounded-md
                             focus:ring-blue-400
                             focus:border-blue-400
                              dark:bg-gray-700 dark:border-gray-600
                              dark:text-white dark:placeholder-text-gray-400
                              dark:focus:ring-blue-400 dark:focus:border-blue-400
                              placeholder:text-md placeholder:text-gray-500 placeholder:font-sans placeholder:font-normal md:placeholder:text-lg
                             "
                placeholder="Usually your username"
                ref={emailInputRef}
                autoComplete="false"
              />
            </div>
            <div className="relative sm:w-full lg:w-[50%]">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-sans font-medium text-gray-900 dark:text-white"
              >
                Password:
              </label>
              {!showPassword ? (
                <FaEye
                  className=" w-6 h-6 absolute right-[5%] md:right-[5%] z-10 top-[54.5%] "
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEyeSlash
                  className=" w-6 h-6 absolute right-[5%] top-[54.5%] md:top-[54.5%] md:right-[5%] lg:top-[54.5%] lg:right-[6%] z-10"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className=" bg-white
                            w-full p-2.5
                             border border-gray-300
                             text-gray-900 text-sm font-sans 
                             rounded-md
                             focus:ring-blue-400
                             focus:border-blue-400
                              dark:bg-gray-700 dark:border-gray-600
                              dark:text-white dark:placeholder-text-gray-400
                              dark:focus:ring-blue-400 dark:focus:border-blue-400
                             "
                ref={passwordInputRef}
                autoComplete="false"
              />
            </div>
          </div>
          <div
            className="px-2 
                    flex items-center justify-center gap-2 
                    bg-transparent h-[15%] md:h-[20%]"
          >
            <h3
              className="text-gray-500 text-sm md:text-md font-sans font-bold cursor-default "
              style={{ userSelect: "none" }}
            >
              Do&apos;t have an account?
            </h3>
            <Link
              href={"/register"}
              onClick={(event) => {
                event.preventDefault();
                router.push("/register");
              }}
            >
              <button
                className="text-blue-700 text-sm md:text-mds
                         font-sans font-bold
                          hover:underline hover:text-blue-300
                           flex items-center justify-center
                          "
              >
                Sign up!
              </button>
            </Link>
          </div>
          <div className="px-2 flex items-center gap-2 bg-transparent h-[15%] md:h-[20%] my-auto">
            <div className="px-2 flex gap-2 bg-transparent h-[90%] my-auto w-3/4">
              <Link
                href={"/forgot-password"}
                onClick={(event) => {
                  event.preventDefault();
                  router.push("/forgot-password");
                }}
              >
                <button
                  className="w-[95%] p-2 h-full rounded-md text-white text-[14px] sm:text-[18px] md:text-[14px] lg:text-[12px] xl:text-[17px]
                             bg-red-600 hover:bg-red-700
                              font-sans font-bold
                              flex items-center justify-center
                              "
                >
                  Forgot Password ?
                </button>
              </Link>
              <Link
                href={"/register"}
                onClick={(event) => {
                  event.preventDefault();
                  router.push("/login");
                }}
              >
                <button className="w-[95%] p-2 h-full rounded-md  bg-red-600 hover:bg-red-700 font-sans font-bold text-white text-[14px] sm:text-[18px] md:text-[14px] lg:text-[12px] xl:text-[17px]">
                  Forgot Username ?
                </button>
              </Link>
            </div>

            <button
              className={
                disableSubmmitButton
                  ? "h-[90%] my-auto md:my-0 mt-1 ml-auto mr-1 md:mr-2 w-[20%] md:w-[17%] xl:w-[21%] rounded-md text-white sm:text-[17px] md:text-2xl lg:text-[16px] xl:text-lg font-sans font-bold flex items-center justify-center bg-red-800 hover:bg-red-900"
                  : "h-[90%] my-auto md:my-0 mt-1 ml-auto mr-1 md:mr-2 w-[20%] md:w-[17%] xl:w-[21%] rounded-md text-white sm:text-[17px] md:text-2xl lg:text-[16px] xl:text-lg font-sans font-bold flex items-center justify-center bg-blue-800 hover:bg-blue-900"
              }
              type="submit"
              disabled={disableSubmmitButton}
            >
              <IoLogInOutline className="text-2xl md:text-xl xl:text-2xl inline-block" />
              <span className="mb-1">Login</span>
            </button>
          </div>
        </form>
      </div>
      <div className="z-20 absolute bottom-5 left-4">
        <ErrorMessageForLoginPage
          ErrorMessageShowed={ErrorMessageShowed}
          errorMessage={errorMessage}
          stageAnimations={stageAnimations}
        />
      </div>
    </div>
  );
}
export default Login;
