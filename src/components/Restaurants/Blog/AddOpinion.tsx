import React, { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Toast } from '@/sweetAlert2';
import StarRating from '@/components/StarRating';
import { AiOutlineClose } from "react-icons/ai"; // استيراد أيقونة الإغلاق
interface props{
    restoId:any,
    setAc:Dispatch<SetStateAction<boolean>>;
}
const ReviewForm = ({restoId,setAc}:props) => {
    const formik = useFormik({
        initialValues: {
            value: 0,
            reviews: '',
        },
        validationSchema: Yup.object({
            value: Yup.number()
                .min(1, 'يجب أن يكون التقييم 1 على الأقل')
                .max(5, 'يجب ألا يتجاوز التقييم 5')
                .required('التقييم مطلوب'),
            reviews: Yup.string()
            .min(10, 'يجب أن يحتوي الرأي على 10 أحرف على الأقل')
            .required('يرجى كتابة رأيك'),
        }),
        onSubmit: async (values) => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("Token");
        
            if (!userId || !restoId || !values.value || !values.reviews) {
                console.error("بعض القيم غير صالحة، تحقق من البيانات قبل الإرسال.");
                return;
            }
        
            console.log('Submitted data:', values);
        
            const data = {
                userId: userId ,
                serviceID: restoId, 
                value: values.value,
                review: values.reviews 
            };
        
            const res = await fetch(`http://citypulse.runasp.net/api/Restaurant/CreateRestaurantRating`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                Toast.fire({
                    icon: 'success',
                    title: 'تم التقييم بنجاح',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                const errorMessage = await res.text();
                console.error('فشل في إرسال التقييم:', errorMessage);
            }
        },        
        
    });
    return (
        <div className="fixed inset-0 flex justify-center  items-center backdrop-blur-lg bg-black/5 z-50">
            <div className="relative bg-white shadow-lg backdrop-blur-lg rounded-lg p-8 max-w-md w-full">
            <AiOutlineClose
                    className="absolute top-3 right-3 text-gray-700 text-2xl cursor-pointer hover:text-red-500 transition"
                    onClick={() => setAc(false)}
                />
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">تقييم المنتج</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* تقييم النجوم */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">التقييم:</label>
                        <StarRating value={formik.values.value} onChange={(newValue) => formik.setFieldValue("value", newValue)} />
                        {formik.touched.value && formik.errors.value && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.value}</div>
                        )}
                    </div>

                    {/* الرأي */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">رأيك:</label>
                        <textarea
                            {...formik.getFieldProps("reviews")}
                            className="w-full text-black/55  p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={4}
                        />
                        {formik.touched.reviews && formik.errors.reviews && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.reviews}</div>
                        )}
                    </div>

                    {/* زر الإرسال */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        إرسال التقييم
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;
