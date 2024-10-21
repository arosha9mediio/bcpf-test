import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const CustomTextField = styled(
  (props: TextFieldProps & { isFocused: boolean }) => <TextField {...props} />,
)(({ isFocused }) => ({
  width: "100%",
  "& .MuiInput-underline:before": {
    borderBottom: `1px solid rgb(148, 163, 184)`,
  },
  "& .MuiInput-underline:hover:before": {
    borderBottom: `1px solid rgb(148, 163, 184)`,
  },
  "& .MuiInput-underline:after": {
    borderBottom: isFocused
      ? "2px solid black"
      : "1px solid rgb(148, 163, 184)",
  },
}));

const CustomDatePicker = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <DatePicker
      format="yyyy-MM-dd"
      value={value}
      onChange={onChange}
      slots={{
        textField: params => (
          <CustomTextField
            {...params}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isFocused={isFocused}
          />
        ),
      }}
    />
  );
};

export default CustomDatePicker;
