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
interface ManageRestoProviderProps {
    children:ReactNode
}
interface ManageRestoType{
    counter:number;
    cartItems:Meal[]
    menuItems:Meal[]
    setID:Dispatch<SetStateAction<any>>;
    addItemToCart: (meal: Meal) => void;
    removeItemFromCart: (mealId: number,restId:number) => void;
    clearCart: () => void;
}

export const ManageRestoContext = createContext<ManageRestoType>({
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
    const [cartItems, setCartItems] = useState<Meal[]>(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const[counter,setCounter] = useState<number>(cartItems.length);
    
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
        const fetchData = async () => {
            console.log("id",id)
            if(!id) return
        try{
                const response = await fetch(`http://citypulse.runasp.net/api/Restaurant/AllMeals/${id}`);
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