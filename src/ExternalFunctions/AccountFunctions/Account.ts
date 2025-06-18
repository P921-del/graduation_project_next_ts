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

// التحقق من وجود البريد الإلكتروني في النظام
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
  return false;
};

// التحقق من صحة بيانات تسجيل الدخول وإرجاع التوكن إذا كان صحيحًا
export const checkCredentialsExistInSystem: (
  emailOruserName: string | undefined,
  password: string | undefined
) => Promise<checkCredentialsExistInSystemType> = async (
  emailOruserName,
  password
) => {
  const user: login = {
    userName: emailOruserName,
    password: password,
  };

  if (emailOruserName !== undefined && password !== undefined) {
    const response = await fetch("http://citypulse.runasp.net/api/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data :", data);
      
      localStorage.setItem("userId",JSON.stringify(data.id))
      localStorage.setItem("Token",data.token)
        console.log("token :", JSON.stringify(data.token));
      // استخراج التوكن والتحقق من وجوده
      const Token: string | null = data?.authService?.token || null;
      return { checked: true, Token };

    }
  } catch (e) {
    console.log(e);
  }
  
  // تأكد من إرجاع قيمة افتراضية في حالة فشل الطلب
  return { checked: false, Token: null };
};

// تغيير كلمة المرور باستخدام اسم المستخدم وكلمة المرور القديمة
export const changePasswordUsingUserNameAndPassword: (
  userName: string,
  password: string
) => Promise<boolean> = async (userName, password) => {
  const response = await fetch("link");
  const data = await response.json();
  const changePassword: boolean = JSON.parse(JSON.stringify(data));
  return changePassword;
};

// تغيير كلمة المرور باستخدام البريد الإلكتروني وكلمة المرور القديمة
export const changePasswordUsingEmailAndPassword: (
  userName: string,
  password: string
) => Promise<boolean> = async (userName, password) => {
  const response = await fetch("link");
  const data = await response.json();
  const changePassword: boolean = JSON.parse(JSON.stringify(data));
  return changePassword;
};

// تنفيذ عملية تسجيل الدخول ومعالجة الاستجابة
export const HandelLoginSubmitButton = async (
  emailOrusernameValue: string | undefined,
  passwordValue: string | undefined,
  dispatch: React.Dispatch<ActionType>
) => {
  if (emailOrusernameValue !== "" && passwordValue !== "") {
    // انتظار نتيجة التحقق من بيانات المستخدم
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
