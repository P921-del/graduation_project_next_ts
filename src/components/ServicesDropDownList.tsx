import Link from "next/link";
import { redirect } from "next/navigation";
export const ServicesDropDownList = () => {
  return (
    <div className="absolute top-[10%] right-[50%] z-50">
      <div className="Lis bg-white  rounded-xl  w-48 overflow-hidden ">
        <ul className="p-0.5 ">
          <li
            onClick={() => redirect("/services/schools")}
            className="pl-2 py-2  border-b border-gray-400  duration-500 ease-in-out hover:brightness-95 mb-1 bg-gray-50 hover:text-gray-600   text-gray-400 text-xl font-serif "
          >
            <span className=" hover:translate-x-4 duration-500 ease-in-out inline-block">
              Schools
            </span>
          </li>
          <li
            onClick={() => redirect("/services/hospital")}
            className="pl-2 py-2  border-b border-gray-400  duration-500 ease-in-out hover:brightness-95 mb-1 bg-gray-50 hover:text-gray-600   text-gray-400 text-xl font-serif "
          >
            <span className=" hover:translate-x-4 duration-500 ease-in-out inline-block">
              Hospitals
            </span>
          </li>
          <li
            onClick={() => redirect("/services/clinc")}
            className="pl-2 py-2  border-b border-gray-400  duration-500 ease-in-out hover:brightness-95 mb-1 bg-gray-50 hover:text-gray-600   text-gray-400 text-xl font-serif "
          >
            <span className=" hover:translate-x-4 duration-500 ease-in-out inline-block">
              Clincs
            </span>
          </li>
          <li
            onClick={() => redirect("/services/restaurants")}
            className="pl-2 py-2   duration-500 ease-in-out hover:brightness-95 mb-1 bg-gray-50  hover:text-gray-600   text-gray-400 text-xl font-serif "
          >
            <span className=" hover:translate-x-4 duration-500 ease-in-out inline-block">
              Restuarant
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
