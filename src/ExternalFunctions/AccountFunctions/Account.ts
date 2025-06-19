import { ActionType } from "@/Reducers/loginReducer/loginReducer";
import { actionTypes } from "../../Reducers/loginReducer/loginActionTypes";
import { backendURL } from "../../lib/Slices/auth/authRules";
import { login, userObject } from "@/utils/types";

export type checkCredentialsExistInSystemType = {
  checked: boolean;
  Token: string | null;
  user: userObject | null;
};

// التحقق من وجود البريد الإلكتروني في النظام
const checkEmailExistInSystem = async (
  emailOruserName: string | undefined
): Promise<boolean | undefined> => {
  if (emailOruserName) {
    const response = await fetch(
      `${backendURL}/api/User/findUserByEmail/${emailOruserName}`
    );
    const data = await response.json();
    return Boolean(data); // أو: return !!data;
  }
  return false;
};

// التحقق من صحة بيانات تسجيل الدخول وإرجاع التوكن والمستخدم
export const checkCredentialsExistInSystem = async (
  emailOruserName: string | undefined,
  password: string | undefined
): Promise<checkCredentialsExistInSystemType> => {
  const user: login = {
    username: emailOruserName,
    password: password,
  };

  if (emailOruserName && password) {
    try {
      const response = await fetch(`${backendURL}/api/User/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        const token: string | null = data?.authService?.token || null;
        const userObj: userObject | null = data?.user || null;

        localStorage.setItem("userId", JSON.stringify(data.id));
        localStorage.setItem("Token", data.token);

        return {
          checked: true,
          Token: token,
          user: userObj,
        };
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return {
    checked: false,
    Token: null,
    user: null,
  };
};

// تغيير كلمة المرور (روابط غير مكتملة حالياً)
export const changePasswordUsingUserNameAndPassword = async (
  userName: string,
  password: string
): Promise<boolean> => {
  const response = await fetch("link");
  const data = await response.json();
  return Boolean(data);
};

export const changePasswordUsingEmailAndPassword = async (
  email: string,
  password: string
): Promise<boolean> => {
  const response = await fetch("link");
  const data = await response.json();
  return Boolean(data);
};

// تنفيذ عملية تسجيل الدخول
export const HandelLoginSubmitButton = async (
  emailOrusernameValue: string | undefined,
  passwordValue: string | undefined,
  dispatch: React.Dispatch<ActionType>
) => {
  if (emailOrusernameValue && passwordValue) {
    const checkCredentials = await checkCredentialsExistInSystem(
      emailOrusernameValue,
      passwordValue
    );

    if (checkCredentials.checked) {
      dispatch({
        type: actionTypes.CHECKED_PASSWORD,
        payload: {
          email: emailOrusernameValue,
          password: passwordValue,
        },
      });
    } else {
      dispatch({
        type: actionTypes.ERROR_CHECK_PASSWORD,
        payload: {
          email: "",
          password: "",
        },
      });
    }
  } else {
    dispatch({
      type: actionTypes.CHECKED_CREDIENTIALS_NOT_EMPTY,
      payload: {
        email: "",
        password: "",
      },
    });
  }
};
