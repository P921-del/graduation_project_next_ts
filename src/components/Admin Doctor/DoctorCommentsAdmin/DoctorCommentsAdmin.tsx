"use client";
import { store } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaStar, FaTrashAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

type Comment = {
  id: number;
  userName: string;
  doctorName: string;
  comment: string;
  rating: number;
  date: string;
};

interface userRatingModel {
  ratingId: number;
  nameU: string;
  ratingValue: number;
  review: string;
  ratingDate: string;
}
const initialComments: Comment[] = [
  {
    id: 1,
    userName: "Ahmed Salah",
    doctorName: "Dr. Mona Youssef",
    comment: "Very professional and kind!",
    rating: 5,
    date: "2025-06-15",
  },
  {
    id: 2,
    userName: "Sara Adel",
    doctorName: "Dr. Kareem Hassan",
    comment: "The appointment was delayed, but he explained everything well.",
    rating: 4,
    date: "2025-06-14",
  },
];

const DoctorCommentsAdmin = () => {
  const [userRatingsState, setUserRatingsState] = useState<userRatingModel[]>(
    []
  );
  const doctorId = 1;
  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        const response = await fetch(
          `http://citypulse.runasp.net/api/Clinic/AllDoctorRating /${doctorId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const userRatings: userRatingModel[] = data.$values.map(
            (userRating) => ({
              ratingId: userRating.ratingId,
              nameU: userRating.nameU,
              ratingValue: userRating.ratingValue,
              review: userRating.review,
              ratingDate: userRating.ratingDate,
            })
          );
          if (data.$values !== null) setUserRatingsState(userRatings);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, []);
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleDelete = (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirm) {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6 shadow-xl rounded-xl bg-blue-50 w-full md:w-[55%] pt-5 px-[1rem]">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Doctor Comments</h2>

      {comments.length === 0 && (
        <p className="text-center text-gray-500">No comments available.</p>
      )}

      {userRatingsState.map((userRating: userRatingModel) => (
        <div
          key={userRating.ratingId}
          className="border-b border-gray-200 pb-4 mb-4 flex gap-4"
        >
          <FaUserCircle className="text-4xl text-blue-600 mt-1" />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-semibold text-gray-800">
                {userRating.nameU} → Ahmed
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center text-yellow-500">
                  {[...Array(userRating.ratingValue)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(userRating.ratingId)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Comment"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-1">{userRating.review}</p>

            <div className="text-sm text-gray-400 flex items-center gap-1">
              <MdOutlineDateRange />
              {new Date(userRating.ratingDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCommentsAdmin;
