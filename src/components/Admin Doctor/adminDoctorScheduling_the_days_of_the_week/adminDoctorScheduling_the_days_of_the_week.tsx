"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
const WEEK_DAYS_ORDER = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

function sortSchedule(schedule: Schedule): Schedule {
  const entries = Object.entries(schedule);

  const sortedEntries = entries.sort(([aKey], [bKey]) => {
    const [aWeek, aDay] = aKey.split("-");
    const [bWeek, bDay] = bKey.split("-");

    const aWeekNum = parseInt(aWeek.replace("Week", ""));
    const bWeekNum = parseInt(bWeek.replace("Week", ""));

    if (aWeekNum !== bWeekNum) {
      return aWeekNum - bWeekNum; // sort by week first
    }

    return (
      WEEK_DAYS_ORDER.indexOf(aDay) - WEEK_DAYS_ORDER.indexOf(bDay) // then by day order
    );
  });

  // Reconstruct sorted object
  const sortedSchedule: Schedule = {};
  for (const [key, value] of sortedEntries) {
    sortedSchedule[key] = value;
  }

  return sortedSchedule;
}
const todayScheduling = new Date();
const WEEK_DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

interface DaySchedule {
  dayOff: boolean;
  start: string;
  end: string;
  available: boolean;
  date?: string;
}

type Schedule = {
  [key: string]: DaySchedule; //This means the object can have any number of properties, as long as each key is a string.
};

type Props = {};

function AdminDoctorScheduling_the_days_of_the_week({}: Props) {
  const [duration, setDuration] = useState<string>("1");
  const [schedule, setSchedule] = useState<Schedule>({});
  const [newDate, setNewDate] = useState<Date>(new Date());

  const generateScheduleTemplate = (weeks: number): Schedule => {
    const template: Schedule = {};
    for (let week = 1; week <= weeks; week++) {
      WEEK_DAYS.forEach((day) => {
        const key = `Week${week}-${day}`;

        template[key] = {
          dayOff: false,
          start: "",
          end: "",
          available: false,
          date: "",
        };
      });
    }
    return template;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const weeks = Number(e.target.value);
    setDuration(e.target.value);
    setSchedule(generateScheduleTemplate(weeks));
  };

  const handleChange = (
    key: string,
    field: keyof DaySchedule,
    value: boolean | string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };
useEffect(()=>{},[handleChange]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sortedSchedule = sortSchedule(schedule);
    /*
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
    */
    /* start scheduling for one week */
    if (todayScheduling.getDay() === 0 && Object.keys(schedule).length === 7) {
      handleChange("Week1-Sunday", "date", todayScheduling.toString());
      handleChange(
        "Week1-Monday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Tuesday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 1 &&
      Object.keys(schedule).length === 7
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", todayScheduling.toString());
      handleChange(
        "Week1-Tuesday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 2 &&
      Object.keys(schedule).length === 7
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", new Date().toString());
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 3 &&
      Object.keys(schedule).length === 7
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange("Week1-Wednesday", "date", new Date().toString());
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 4 &&
      Object.keys(schedule).length === 7
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange("Week1-Wednesday", "date", "No Date");
      handleChange("Week1-Thursday", "date", new Date().toString());
      handleChange(
        "Week1-Friday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 5 &&
      Object.keys(schedule).length === 7
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange("Week1-Wednesday", "date", "No Date");
      handleChange("Week1-Thursday", "date", "No Date");
      handleChange("Week1-Friday", "date", new Date().toString());
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 6 &&
      Object.keys(schedule).length === 7
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange("Week1-Wednesday", "date", "No Date");
      handleChange("Week1-Thursday", "date", "No Date");
      handleChange("Week1-Friday", "date", "No Date");
      handleChange("Week1-Saturday", "date", new Date().toString());
    }
    /* end scheduling for one week */
    /* start scheduling for two weeks */
    if (todayScheduling.getDay() === 0 && Object.keys(schedule).length === 14) {
      handleChange("Week1-Sunday", "date", todayScheduling.toString());
      handleChange(
        "Week1-Monday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Tuesday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(11 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(12 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(13 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 1 &&
      Object.keys(schedule).length === 14
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange(
        "Week1-Monday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week1-Tuesday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(11 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(12 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 2 &&
      Object.keys(schedule).length === 14
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange(
        "Week1-Tuesday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(11 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 3 &&
      Object.keys(schedule).length === 14
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 4 &&
      Object.keys(schedule).length === 14
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange("Week1-Wednesday", "date", "No Date");
      handleChange(
        "Week1-Thursday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 5 &&
      Object.keys(schedule).length === 14
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange("Week1-Wednesday", "date", "No Date");
      handleChange(
        "Week1-Thursday",
        "date",
       "No Date"
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 6 &&
      Object.keys(schedule).length === 14
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange("Week1-Wednesday", "date", "No Date");
      handleChange(
        "Week1-Thursday",
        "date",
       "No Date"
      );
      handleChange(
        "Week1-Friday",
        "date",
        "No Date"
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    }
    /* End scheduling for two weeks */
    /* Start scheduling for four weeks */
    if (todayScheduling.getDay() === 0 && Object.keys(schedule).length === 28) {
      handleChange("Week1-Sunday", "date", todayScheduling.toString());
      handleChange(
        "Week1-Monday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Tuesday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(11 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(12 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(13 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Sunday",
        "date",
        new Date(14 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Monday",
        "date",
        new Date(15 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Tuesday",
        "date",
        new Date(16 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Wednesday",
        "date",
        new Date(17 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Thursday",
        "date",
        new Date(18 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Friday",
        "date",
        new Date(19 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Saturday",
        "date",
        new Date(20 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Sunday",
        "date",
        new Date(21 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Monday",
        "date",
        new Date(22 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Tuesday",
        "date",
        new Date(23 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Wednesday",
        "date",
        new Date(24 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Thursday",
        "date",
        new Date(25 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Friday",
        "date",
        new Date(26 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Saturday",
        "date",
        new Date(27 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 1 &&
      Object.keys(schedule).length === 28
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange(
        "Week1-Monday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week1-Tuesday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(11 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(12 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Sunday",
        "date",
        new Date(13 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Monday",
        "date",
        new Date(14 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Tuesday",
        "date",
        new Date(15 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Wednesday",
        "date",
        new Date(16 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Thursday",
        "date",
        new Date(17 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Friday",
        "date",
        new Date(18 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Saturday",
        "date",
        new Date(19 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Sunday",
        "date",
        new Date(20 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Monday",
        "date",
        new Date(21 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Tuesday",
        "date",
        new Date(22 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Wednesday",
        "date",
        new Date(23 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Thursday",
        "date",
        new Date(24 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Friday",
        "date",
        new Date(25 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Saturday",
        "date",
        new Date(26 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 2 &&
      Object.keys(schedule).length === 28
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange(
        "Week1-Tuesday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(11 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Sunday",
        "date",
        new Date(12 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Monday",
        "date",
        new Date(13 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Tuesday",
        "date",
        new Date(14 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Wednesday",
        "date",
        new Date(15 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Thursday",
        "date",
        new Date(16 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Friday",
        "date",
        new Date(17 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Saturday",
        "date",
        new Date(18 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Sunday",
        "date",
        new Date(19 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Monday",
        "date",
        new Date(20 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Tuesday",
        "date",
        new Date(21 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Wednesday",
        "date",
        new Date(22 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Thursday",
        "date",
        new Date(23 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Friday",
        "date",
        new Date(24 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Saturday",
        "date",
        new Date(25 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 3 &&
      Object.keys(schedule).length === 28
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange(
        "Week1-Wednesday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week1-Thursday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Sunday",
        "date",
        new Date(11 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Monday",
        "date",
        new Date(12 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Tuesday",
        "date",
        new Date(13 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Wednesday",
        "date",
        new Date(14 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Thursday",
        "date",
        new Date(15 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Friday",
        "date",
        new Date(16 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Saturday",
        "date",
        new Date(17 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Sunday",
        "date",
        new Date(18 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Monday",
        "date",
        new Date(19 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Tuesday",
        "date",
        new Date(20 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Wednesday",
        "date",
        new Date(21 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Thursday",
        "date",
        new Date(22 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Friday",
        "date",
        new Date(23 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Saturday",
        "date",
        new Date(24 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 4 &&
      Object.keys(schedule).length === 28
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange("Week1-Wednesday", "date", "No Date");
      handleChange(
        "Week1-Thursday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week1-Friday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Sunday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Monday",
        "date",
        new Date(11 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Tuesday",
        "date",
        new Date(12 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Wednesday",
        "date",
        new Date(13 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Thursday",
        "date",
        new Date(14 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Friday",
        "date",
        new Date(15 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Saturday",
        "date",
        new Date(16 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Sunday",
        "date",
        new Date(17 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Monday",
        "date",
        new Date(18 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Tuesday",
        "date",
        new Date(19 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Wednesday",
        "date",
        new Date(20 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Thursday",
        "date",
        new Date(21 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Friday",
        "date",
        new Date(22 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Saturday",
        "date",
        new Date(23 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 5 &&
      Object.keys(schedule).length === 28
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange("Week1-Wednesday", "date", "No Date");
      handleChange("Week1-Thursday", "date", "No Date");
      handleChange(
        "Week1-Friday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Sunday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Monday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Tuesday",
        "date",
        new Date(11 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Wednesday",
        "date",
        new Date(12 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Thursday",
        "date",
        new Date(13 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Friday",
        "date",
        new Date(14 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Saturday",
        "date",
        new Date(15 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Sunday",
        "date",
        new Date(16 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Monday",
        "date",
        new Date(17 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Tuesday",
        "date",
        new Date(18 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Wednesday",
        "date",
        new Date(19 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Thursday",
        "date",
        new Date(20 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Friday",
        "date",
        new Date(21 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Saturday",
        "date",
        new Date(22 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    } else if (
      todayScheduling.getDay() === 6 &&
      Object.keys(schedule).length === 28
    ) {
      handleChange("Week1-Sunday", "date", "No Date");
      handleChange("Week1-Monday", "date", "No Date");
      handleChange("Week1-Tuesday", "date", "No Date");
      handleChange("Week1-Wednesday", "date", "No Date");
      handleChange(
        "Week1-Thursday",
        "date",
       "No Date"
      );
      handleChange(
        "Week1-Friday",
        "date",
        "No Date"
      );
      handleChange(
        "Week1-Saturday",
        "date",
        new Date().toString()
      );
      handleChange(
        "Week2-Sunday",
        "date",
        new Date(1 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Monday",
        "date",
        new Date(2 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Tuesday",
        "date",
        new Date(3 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Wednesday",
        "date",
        new Date(4 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Thursday",
        "date",
        new Date(5 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Friday",
        "date",
        new Date(6 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week2-Saturday",
        "date",
        new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Sunday",
        "date",
        new Date(8 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Monday",
        "date",
        new Date(9 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Tuesday",
        "date",
        new Date(10 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Wednesday",
        "date",
        new Date(11 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Thursday",
        "date",
        new Date(12 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Friday",
        "date",
        new Date(13 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week3-Saturday",
        "date",
        new Date(14 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Sunday",
        "date",
        new Date(15 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Monday",
        "date",
        new Date(16 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Tuesday",
        "date",
        new Date(17 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Wednesday",
        "date",
        new Date(18 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Thursday",
        "date",
        new Date(19 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Friday",
        "date",
        new Date(20 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
      handleChange(
        "Week4-Saturday",
        "date",
        new Date(21 * 24 * 60 * 60 * 1000 + new Date().getTime()).toString()
      );
    }
    /* End scheduling for four weeks */
    console.log("Submitted Schedule:", { schedule, todayScheduling });

    try {
      // Example POST to backend
      const response = await fetch("/api/doctor-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule, todayScheduling }),
      });

      if (!response.ok) throw new Error("Failed to submit schedule");
      alert("Schedule saved successfully!");
    } catch (error) {
      console.error("Error submitting schedule:", error);
      alert("An error occurred while saving the schedule.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] mx-auto p-6 bg-white shadow-md rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Doctor Schedule Setup
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="text-gray-700 font-medium">Select Duration:</label>
        <select
          value={duration}
          onChange={handleDurationChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="1">1 Week</option>
          <option value="2">2 Weeks</option>
          <option value="4">1 Month (4 Weeks)</option>
        </select>
      </div>

      <div className="space-y-4">
        {Object.keys(schedule).map((key) => {
          const [weekLabel, day] = key.split("-");
          const dayData = schedule[key];

          return (
            <div
              key={key}
              className="p-4 border rounded-lg bg-gray-50 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  {weekLabel} - {day}
                </h3>
                <label className="flex items-center gap-2 text-sm text-red-600 font-medium">
                  <input
                    type="checkbox"
                    checked={dayData.dayOff}
                    onChange={(e) =>
                      handleChange(key, "dayOff", e.target.checked)
                    }
                    className="form-checkbox h-4 w-4 text-red-500"
                  />
                  Day Off
                </label>
              </div>

              {!dayData.dayOff && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={dayData.start}
                      onChange={(e) =>
                        handleChange(key, "start", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={dayData.end}
                      onChange={(e) => handleChange(key, "end", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-6 md:mt-0">
                    <input
                      type="checkbox"
                      checked={dayData.available}
                      onChange={(e) =>
                        handleChange(key, "available", e.target.checked)
                      }
                      className="form-checkbox h-5 w-5 text-green-500"
                    />
                    <span className="text-sm text-green-700 font-medium">
                      Available
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all"
        >
          Save Schedule
        </button>
      </div>
    </form>
  );
}

export default AdminDoctorScheduling_the_days_of_the_week;
