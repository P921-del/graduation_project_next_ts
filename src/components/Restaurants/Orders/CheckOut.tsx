import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai"; // استيراد أيقونة الإغلاق
import "@/components/Restaurants/Orders/style.css";
import { Dispatch, SetStateAction } from "react";
import { Toast } from "@/sweetAlert2";
interface Meal{
    quantity:number,
    mealName:string,
    price:number
}
interface props{
    totalPrice:number,
    filterd:Meal[],
    setCheckoutClick:Dispatch<SetStateAction<boolean>>,
    restoId:any
}
export default function CheckoutService({ setCheckoutClick,filterd ,restoId,totalPrice}:props) {
    const token=localStorage.getItem("Token");
    const formik = useFormik({
        initialValues: {
            name: "",
            phoneNumber: "",
            address: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("This field is required"),
            phoneNumber: Yup.string()
                .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
                .required("This field is required"),
            address: Yup.string().required("This field is required"),
        }),
        onSubmit: async (values) => {
            console.log("token", token);
        
            const userId = localStorage.getItem("userId");
            if (!token || !userId) {
                console.log("Error: Missing token or userId");
                return;
            }
        
            try {
                const res = await fetch("http://citypulse.runasp.net/api/Restaurant/CreateOrder", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        restaurantId: restoId,
                        totalPrice: totalPrice,
                        location: values.address,
                        phoneNumber: values.phoneNumber,
                        orderDetails: filterd.map(item => ({
                            mealName: item.mealName,
                            quantity: item.quantity,
                            subTotalPrice: item.price * item.quantity
                        }))
                    })
                });
        
                if (res.ok) {
                    Toast.fire({
                        title: "تم انشاء الطلب  بنجاح",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setCheckoutClick(false);
                } else {
                    const errorMessage = await res.text();
                    console.log("Server Error:", errorMessage);
                    Toast.fire({
                        title: "هناك مشكله اثناء اتمام الطلب حاول مره اخرى",
                        icon: "warning",
                        showConfirmButton: true,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.log("Error", error);
            }
        }
        
    });

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-lg z-50">
            <div className="relative bg-white/90 shadow-lg rounded-lg p-8 w-[400px] backdrop-blur-lg border border-gray-200">
                
                {/* زر الإغلاق (X) */}
                <AiOutlineClose
                    className="absolute top-3 right-3 text-gray-700 text-2xl cursor-pointer hover:text-red-500 transition"
                    onClick={() => setCheckoutClick(false)}
                />

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Checkout</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    
                    {/* Name Field */}
                    <div className="formField">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Your Name"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="errorField">{formik.touched.name && formik.errors.name}</p>
                    </div>

                    {/* Phone Number Field */}
                    <div className="formField">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            id="phoneNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="errorField">{formik.touched.phoneNumber && formik.errors.phoneNumber}</p>
                    </div>

                    {/* Address Field */}
                    <div className="formField">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Your Address"
                            name="address"
                            id="address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="errorField">{formik.touched.address && formik.errors.address}</p>
                    </div>

                    {/* Submit Button */}
                    <button className="submit-button" type="submit">
                        CheckOut
                    </button>
                </form>
            </div>
        </div>
    );
}
