import { ActionType } from "@/Reducers/loginReducer/loginReducer";
import { actionTypes } from "../../Reducers/loginReducer/loginActionTypes";
import { backendURL } from "../../Redux Toolkit/Slices/auth/authRules";
const checkEmailExistInSystem: () => Promise<boolean> = async () => {
  const response = await fetch("link");
  const data = await response.json();
  const existingEmail: boolean = JSON.parse(JSON.stringify(data));
  return existingEmail;
};
const checkCredentialsExistInSystem: () => Promise<boolean> = async () => {
  const response = await fetch("link2");
  const data = await response.json();
  const existingCredentials: boolean = JSON.parse(JSON.stringify(data));
  return existingCredentials;
};
export const setCredentialsExistInSystem: (
  email: string | undefined
) => Promise<object> = async (email) => {
  const response = await fetch(backendURL + email);
  const data = await response.json();
  const dataWithToken: object = JSON.parse(JSON.stringify(data));
  return dataWithToken;
};
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
    if (await checkEmailExistInSystem()) {
      if (await checkCredentialsExistInSystem()) {
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
