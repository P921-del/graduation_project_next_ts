"use client"
import { Toast } from "@/sweetAlert2";
import { createContext, Dispatch, ReactNode, SetStateAction,useState,useEffect } from "react";
interface Meal{
    id:number;
    quantity:number;
    mealId: number;
    mealName: string;
    description: string;
    price: number;
    mealImage: string;
    restaurantId:number
}
interface order{
    userId:number;
    orderId: number;
    restaurantId:number;
    totalPrice: number;
    status:string;
    location:string;
    phoneNumber:string;
    orderDetails:orderedMeals[];
    
}
interface AppointmentDetail {
  subTotalPrice: number;
  servicesId: number;
}

interface Appointment {
appointmentId: number;
workingHourId: number;
userId: number;
clinicId: number;
totalPrice: number;
status: string;
patientName: string;
patientAddress: string;
appointmentDetails: AppointmentDetail[];
}

interface orderedMeals{
    mealName:string;
    quantity: number;
    subTotalPrice:number;
}
interface ManageRestoProviderProps {
    children:ReactNode
}
interface ManageRestoType{
    appointments:Appointment[];
    orders: order[];
    counter:number;
    cartItems:Meal[]
    menuItems:Meal[]
    setID:Dispatch<SetStateAction<any>>;
    addItemToCart: (meal: Meal) => void;
    removeItemFromCart: (mealId: number,restId:number) => void;
    clearCart: () => void;
}

export const ManageRestoContext = createContext<ManageRestoType>({
    appointments:[],
    orders: [],
    counter:0,
    menuItems: [],
    cartItems: [],
    setID:()=>{},
    addItemToCart: (item:Meal) => {},
    removeItemFromCart: (mealId:number,restId:number) => {},
    clearCart: () => {},
    

})
export const ManageRestoProvider :React.FC<ManageRestoProviderProps>=({children})=>{
    const [menuItems, setMenuItems] = useState<Meal[]>([]);
    const[id,setID]=useState<any>();
    const[userId,setUserId]=useState(localStorage.getItem("userId"));
    const[token,setToken]=useState(localStorage.getItem("Token"))
    const [cartItems, setCartItems] = useState<Meal[]>(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const[counter,setCounter] = useState<number>(cartItems.length);
        const [orders, setOrders] = useState<order[]>([]);
        const [appointments, setAppointment] = useState<Appointment[]>([]);


    
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cartItems));
        setCounter(cartItems.length);
        console.log(cartItems.length)
    },[cartItems])
    
    const addItemToCart = (meal: Meal) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((item) => (item.mealId === meal.mealId && item.restaurantId === meal.restaurantId));

            if (existingItem) {
                Toast.fire({
                    title: "هذه الوجبه موجوة بالفعل ",
                    icon: "warning",
                    showConfirmButton: true,
                    timer: 1500,
                });
                return prevCart.map((item) =>
                    item.mealId === meal.mealId ? { ...item, quantity: item.quantity+1 } : item
                );
            } else {
                Toast.fire({
                    title: "تم اضافه الوجبه للسله بنجاح",
                    icon: "success",
                    showConfirmButton: true,
                    timer: 1500,
                });
                return [...prevCart, { ...meal, quantity: 1 }];
            }
        });
    };
    
    const removeItemFromCart = (mId: number,restId:number) => {
        Toast.fire({
            title: "تم حذف الوجبه  بنجاح",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
        });
        const updateLocal = cartItems.filter((item) => (item.mealId !== mId ));
        localStorage.setItem("cart",JSON.stringify(updateLocal));
        setCartItems(updateLocal);
    }
    const clearCart = () => {}
    useEffect(()=>{
        setToken(localStorage.getItem("Token"))
        setUserId(localStorage.getItem("userId"))
        const fetchedOrders =async()=>{
            try{
                const response = await fetch(`https://citypulse.runasp.net/api/User/AllOrdersByUserID?UserId=${userId}`,{
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                const formattedOrders = data?.$values?.map((order: any) => ({
                    userId: order.userId,
                    orderId: order.orderId,
                    restaurantId: order.restaurantId,
                    totalPrice: order.totalPrice,
                    status: order.status,
                    location: order.location,
                    phoneNumber: order.phoneNumber,
                    orderDetails: order.orderDetails?.$values || []
                })) || [];
                console.log("orders",data)
                setOrders(formattedOrders);
                
            }catch(e){
                console.error('An error occurred while fetching orders',e)
            }
        }
         const fetchedAppointments =async()=>{
            try{
                const response = await fetch(`https://citypulse.runasp.net/api/User/AllAppointmentsByUserID?UserId=${userId}`,{
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                const formattedAppointments = data?.$values?.map((appoint:any) => ({
                    appointmentId:appoint.appointmentId ,
                    workingHourId: appoint.workingHourId,
                    userId:appoint.userId ,
                    clinicId:appoint.clinicId ,
                    totalPrice: appoint.totalPrice,
                    status:appoint.status ,
                    patientName:appoint.patientName ,
                    patientAddress:appoint.patientAddress ,
                    appointmentDetails:appoint.appointmentDetails?.$values ||[],
                })) || [];
                console.log("appointments",data)
                setAppointment(formattedAppointments);
                
            }catch(e){
                console.error('An error occurred while fetching appointments',e)
            }
        }
        fetchedAppointments()
        fetchedOrders()
    },[])
    
    useEffect(()=>{
        const fetchData = async () => {
            console.log("id",id)
            if(!id) return
        try{
                const response = await fetch(`https://citypulse.runasp.net/api/Restaurant/AllMeals/${id}`);
                const data = await response.json();
                if(response.ok){
                setMenuItems(data.$values);
                console.log(id);
                    console.log("data fetched",data)
            }
            else
                console.log("there is an error")
            
        }
        catch(e){
            console.log("error",e);
        }
    }
    fetchData();
        console.log("Menu",menuItems);
    },[id])
    return(
        <ManageRestoContext.Provider value={{
            appointments,
            orders,
            menuItems,
            setID,
            cartItems,
            addItemToCart,
            removeItemFromCart,
            clearCart,
            counter,
        }}>
        
        {children}
        
        </ManageRestoContext.Provider>
    )
}