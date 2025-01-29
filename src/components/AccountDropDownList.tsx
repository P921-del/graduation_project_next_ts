import Link from "next/link";
export const AccountDropDownList = () => {
  return (
    <div className="absolute top-[10%] right-[8%] z-50">
      <div className="Lis bg-white  rounded-xl  w-40 overflow-hidden ">
        <ul className="p-0.5 ">
          <li className="pl-2 py-2  border-b border-gray-400  duration-500 ease-in-out hover:brightness-95 mb-1 bg-gray-50 hover:text-gray-600   text-gray-400 text-xl font-serif ">
            <Link
              className=" hover:translate-x-4 duration-500 ease-in-out inline-block"
              href={"/login"}
            >
              Login
            </Link>
          </li>
          <li className="pl-2 py-2  border-b border-gray-400  duration-500 ease-in-out hover:brightness-95 mb-1 bg-gray-50 hover:text-gray-600   text-gray-400 text-xl font-serif ">
            <Link
              className=" hover:translate-x-4 duration-500 ease-in-out inline-block"
              href={"#"}
            >
              Logout
            </Link>
          </li>
          <li className="pl-2 py-2   duration-500 ease-in-out hover:brightness-95 mb-1 bg-gray-50  hover:text-gray-600   text-gray-400 text-xl font-serif ">
            <Link
              href="/register"
              className=" hover:translate-x-4 duration-500 ease-in-out inline-block"
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
