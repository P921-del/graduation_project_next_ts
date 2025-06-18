import { ActionType } from "@/Reducers/loginReducer/loginReducer";
import { actionTypes } from "../../Reducers/loginReducer/loginActionTypes";
import { backendURL } from "../../lib/Slices/auth/authRules";
import { login, userObject } from "@/utils/types";
import { ExecException } from "child_process";
export type checkCredentialsExistInSystemType = {
  checked: boolean;
  Token: string | null;
  user: userObject | null;
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
  try {
    const user: login = {
      username: emailOruserName,
      password: password,
    };
    if (emailOruserName !== undefined && password !== undefined) {
      debugger;
      const response = await fetch(
        "http://citypulse.runasp.net/api/User/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        debugger;
        const data = await response.json();
        const Token: string = data.token;
        const user: userObject = {
          id: data.id,
          roles: data.roles,
        };
        if (Token !== null) {
          return { checked: true, Token: Token, user };
        }
        return { checked: true, Token: null, user: null };
      } else {
        return { checked: false, Token: null, user: null };
      }
    }
  } catch (e) {
    console.log(e);
  }
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
      type: actionTypes.CHECKED_CREDIENTIALS_NOT_EMPTY,
      payload: { email: "", password: "" },
    });
  }
};
