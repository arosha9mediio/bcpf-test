"use client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
type Props = {
  children: React.ReactNode;
};

const DateLocalProvider = ({ children }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </LocalizationProvider>
  );
};

export default DateLocalProvider;
