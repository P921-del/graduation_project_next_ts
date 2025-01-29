"use client";
import * as Yup from "yup";
import "@/app/register/register.css";
import { useFormik } from "formik";
export default function Registercomp() {
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      role: Yup.string().required("Role is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="main h-full mb-10">
      <div className=" pt-4 mb-6 bg-gray-50 ">
        <div className="registercont flex">
          <div className="img w-full relative">
            <img className="w-full" src="/assets/Images/register3.jpeg" />
            <div className="absolute w-[90%] mx-auto top-10 left-1/2 -translate-x-[40%]">
              <h2 className="text-4xl font-extrabold italic  font-serif text-gray-100 brightness-95">
                Welcome at Register Page
              </h2>
            </div>
          </div>
          <div className="regform ">
            <form className="frm" onSubmit={formik.handleSubmit}>
              <div className="lepinp">
                <label htmlFor="user">UserName</label>
                <input
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  id="user"
                  name="userName"
                />
              </div>
              <div className="lepinp">
                <label htmlFor="email">Email</label>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div className="lepinp">
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
              </div>
              <div className="lepinp">
                <label htmlFor="pass">Password</label>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  id="pass"
                  name="password"
                />
              </div>
              <div className="lepinp">
                <label htmlFor="confirmPassword">confirmPassword</label>
                <input
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                />
              </div>
              <button
                className="translate-x-1/4 py-3 px-4 bg-blue-700 w-[50%] mx-auto rounded-md hover:brightness-90 text-white font-bold"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
