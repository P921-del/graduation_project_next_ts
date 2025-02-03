import { ActionType } from "@/Reducers/loginReducer/loginReducer";
import { actionTypes } from "../../Reducers/loginReducer/loginActionTypes";
import { backendURL } from "../../lib/Slices/auth/authRules";
export interface userWithToken {
  NameU: string;
  UserName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  PhoneNumber: string;
  Address: string;
  ProfileImage: File | null;
  userToken: string;
}
export type checkCredentialsExistInSystemType = {
  checked: boolean;
  data: userWithToken | null;
};
const checkEmailExistInSystem: (
  emailOruserName: string | undefined
) => Promise<boolean | undefined> = async (emailOruserName) => {
  if (emailOruserName !== "" && emailOruserName !== undefined) {
    const response = await fetch(
      "http://citypulse.runasp.net/api/User/findUserByEmail/" + emailOruserName
    );
    const data = await response.json();
    const existingEmail: boolean = JSON.parse(JSON.stringify(data));
    return existingEmail;
  }
};
export const checkCredentialsExistInSystem: (
  emailOruserName: string | undefined,
  password: string | undefined
) => Promise<checkCredentialsExistInSystemType> = async (
  emailOruserName,
  password
) => {
  const response = await fetch(
    "http://citypulse.runasp.net/api/User/login/userName=?" +
      emailOruserName +
      "&" +
      "password=?" +
      password
  );
  const data = await response.json();
  const dataWithToken: userWithToken = JSON.parse(JSON.stringify(data));
  if (dataWithToken !== null) {
    return { checked: true, data: dataWithToken };
  }
  return { checked: true, data: null };
};
// export const setCredentialsExistInSystem: (
//   email: string | undefined
// ) => Promise<object> = async (email) => {
//   const response = await fetch(backendURL + email);
//   const data = await response.json();
//   const dataWithToken: object = JSON.parse(JSON.stringify(data));
//   localStorage.setItem("userToken", JSON.stringify(dataWithToken));
//   return dataWithToken;
// };
export const changePasswordUsingUserNameAndPassword: (
  userName: string,
  password: string
) => Promise<boolean> = async (userName, password) => {
  const response = await fetch("link");
  const data = await response.json();
  const changePassword: boolean = JSON.parse(JSON.stringify(data));
  return changePassword;
};
export const changePasswordUsingEmailAndPassword: (
  userName: string,
  password: string
) => Promise<boolean> = async (userName, password) => {
  const response = await fetch("link");
  const data = await response.json();
  const changePassword: boolean = JSON.parse(JSON.stringify(data));
  return changePassword;
};
export const HandelLoginSubmitButton = async (
  emailOrusernameValue: string | undefined,
  passwordValue: string | undefined,
  dispatch: React.Dispatch<ActionType>
) => {
  if (emailOrusernameValue !== "" && passwordValue !== "") {
    // Await the result of the function call
    if (await checkEmailExistInSystem(emailOrusernameValue)) {
      const checkCredentials = await checkCredentialsExistInSystem(
        emailOrusernameValue,
        passwordValue
      );
      if (checkCredentials.checked === true) {
        dispatch({
          type: actionTypes.CHECKED_PASSWORD,
          payload: { email: emailOrusernameValue, password: passwordValue },
        });
      } else {
        dispatch({
          type: actionTypes.ERROR_CHECK_PASSWORD,
          payload: { email: "", password: "" },
        });
      }
    } else {
      dispatch({
        type: actionTypes.ERROR_CHECK_EMAIL,
        payload: { email: "", password: "" },
      });
    }
  } else {
    dispatch({
      type: actionTypes.CHECKED_CREDIENTIALS_NOT_EMPTY,
      payload: { email: "", password: "" },
    });
  }
};
