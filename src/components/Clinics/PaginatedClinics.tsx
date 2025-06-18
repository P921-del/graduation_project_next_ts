"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  patrik_hand,
  notoSansArabic,
  notoNaskhArabic,
} from "@/app/services/clinics/page";
import { FaLocationDot } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import { WiTime2 } from "react-icons/wi";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { clinics } from "@/app/services/clinics/page";
import ShowingClinics from "@/components/Clinics/ShowingClinics";
import { setnumberOfShowingClinics } from "@/lib/Slices/clinics/clinicIndexSlice";
import { useDispatch } from "react-redux";
interface clinicType {
  imageUrl: string;
  clinicName: string;
  clinicType: string;
  clinicLink: string;
  location: string;
  cost: string;
  waitingTime: string;
  specialties: string[];
}
type Props = {
  currentClinics: clinicType[];
};

function Clinics(props: Props) {
  return (
    <>
      {props.currentClinics &&
        props.currentClinics.map((item) => (
          <div
            className={
              patrik_hand.className +
              " bg-white w-[90%] mx-auto rounded-xl h-[1000px] lg:h-[820px] flex flex-col gap-y-5"
            }
            key={item.clinicName}
          >
            <div className="w-full h-40 flex items-center justify-center">
              <img
                className="w-40 h-40 rounded-full"
                src={item.imageUrl}
                alt={item.clinicName}
                title={item.clinicName}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-y-4">
              <a
                className={
                  notoSansArabic.className +
                  " hover:cursor-pointer flex flex-col gap-y-4"
                }
                href={item.clinicLink}
              >
                <h3 className="font-semibold text-4xl text-blue-900">
                  {item.clinicName}
                </h3>
                <h2 className="font-light text-xl text-gray-400 text-center">
                  {item.clinicType}
                </h2>
              </a>
              <div className="flex flex-row gap-x-1">
                <FaLocationDot className="text-4xl text-red-600" />
                <h4
                  className={
                    notoNaskhArabic.className +
                    " font-bold text-xl text-black flex items-center justify-center h-full"
                  }
                >
                  {item.location}
                </h4>
              </div>
              <div className="flex flex-row gap-x-1">
                <FaFlag className="text-4xl text-blue-600" />
                <h4
                  className={
                    patrik_hand.className +
                    " font-bold text-xl text-black flex flex-row items-center justify-center gap-x-2 h-full"
                  }
                >
                  <span className="">Cost</span>
                  {item.cost}
                </h4>
              </div>
              <div className="flex flex-row gap-x-1">
                <WiTime2 className="text-4xl text-blue-600" />
                <h4
                  className={
                    patrik_hand.className +
                    " font-normal text-3xl text-black flex items-center justify-center h-full"
                  }
                >
                  Avrage Waiting time: {item.waitingTime}
                </h4>
              </div>
            </div>
            {/* i write the configuration for writing arab words with english here */}
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-wrap justify-between items-center gap-y-4 w-[80%] mx-auto mb-10">
                {item.specialties.map((specialty) => (
                  <span
                    className={
                      notoSansArabic.className +
                      " font-light text-2xl text-center border border-gray-900 rounded-full py-4 px-4 inline-block"
                    }
                    style={{
                      direction: "rtl",
                      writingMode: "horizontal-tb",
                      whiteSpace: "nowrap",
                    }}
                    key={specialty}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-center h-16">
                <a
                  className={
                    patrik_hand.className +
                    " w-[20%] h-full rounded-full flex items-center justify-center gap-x-1 text-2xl bg-blue-900 text-white hover:cursor-pointer"
                  }
                  href={item.clinicLink}
                >
                  <IoIosArrowDown className="text-4xl text-white" />
                  Details
                </a>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
type PaginatedClinicsProps = {
  itemsPerPage: number;
};
function PaginatedClinics(props: PaginatedClinicsProps) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState<number>(props.itemsPerPage);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + props.itemsPerPage;
  const currentClinics = clinics.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(clinics.length / props.itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * props.itemsPerPage) % clinics.length;
    setItemOffset(newOffset);
    sessionStorage.setItem(
      "currentClinicsPage",
      JSON.stringify(event.selected)
    );
    dispatch(setnumberOfShowingClinics(newOffset));
  };
  const pathname = usePathname();
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-100 flex flex-col">
      <ShowingClinics
        numberOftotalClinics={clinics.length > 0 ? clinics.length : 0}
      />
      <div className="flex flex-col gap-y-20">
        <Clinics currentClinics={currentClinics} />
        <div className="flex items-center justify-center">
          <ReactPaginate
            initialPage={
              sessionStorage.getItem("currentClinicsPage")
                ? JSON.parse(
                    sessionStorage.getItem("currentClinicsPage") as string
                  )
                : 0
            }
            className="mb-5 h-10 flex flex-row gap-x-4"
            activeClassName="bg-blue-900 w-10 h-full flex items-center justify-center hover:cursor-text"
            activeLinkClassName="text-lg text-white"
            pageClassName="w-10 h-full flex items-center justify-center hover:bg-blue-900 hover:cursor-pointer"
            pageLinkClassName="text-lg text-gray-300"
            breakClassName="w-10 h-full bg-white flex items-center justify-center hover:bg-blue-900 hover:cursor-pointer"
            breakLinkClassName="text-lg text-gray-300"
            previousClassName="w-10 h-full bg-white flex items-center justify-center hover:bg-blue-900 hover:cursor-pointer"
            previousLinkClassName="text-lg text-gray-300"
            nextClassName="w-10 h-full bg-white flex items-center justify-center hover:bg-blue-900 hover:cursor-pointer"
            nextLinkClassName="text-lg text-gray-300"
            disabledClassName="w-10 h-full bg-red-600 flex items-center justify-center hover:bg-red-700 hover:cursor-not-allowed"
            disabledLinkClassName="text-lg text-gray-300 hover:cursor-not-allowed"
            breakLabel={<HiDotsHorizontal className="text-lg text-gray-300" />}
            nextLabel={
              <MdKeyboardDoubleArrowRight className="text-lg text-gray-300" />
            }
            onPageChange={handlePageClick}
            eventListener="onClick"
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel={
              <MdKeyboardDoubleArrowLeft className="text-lg text-gray-300" />
            }
            renderOnZeroPageCount={null}
            prevRel={
              itemOffset > 0 ? pathname.concat(`?page=${itemOffset}`) : null
            }
            nextRel={
              itemOffset < pageCount - 1
                ? pathname.concat(`?page=${itemOffset + 2}`)
                : null
            }
            selectedPageRel={pathname.concat(`?page=${itemOffset + 1}`)}
          />
        </div>
      </div>
    </div>
  );
}

export default PaginatedClinics;
