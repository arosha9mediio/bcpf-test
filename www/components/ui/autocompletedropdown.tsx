// CustomSelect.tsx
import React from "react";
import Select, { Props as SelectProps } from "react-select";
import { useTheme } from "next-themes";

type CustomSelectProps = SelectProps & {
  borderColor?: string;
  fontSize?: string;
};

const AutoCompleteSelect: React.FC<CustomSelectProps> = ({
  borderColor = "grey",
  fontSize = "14px",
  ...props
}) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const customStyles = {
    control: provided => ({
      ...provided,
      borderColor: isDarkTheme ? "#64748B" : "#e8ecf4",
      backgroundColor: isDarkTheme ? "#020817" : "#fff",
      "&:hover": {
        borderColor: "#e8ecf4",
      },
      boxShadow: "none",
      fontSize: fontSize,
      color: isDarkTheme ? "#8896AA" : "#A0ADC0",
    }),
    menu: provided => ({
      ...provided,
      fontSize: fontSize,
      border: `1px solid ${isDarkTheme ? "#596577" : "#e8ecf4"}`,
      backgroundColor: isDarkTheme ? "#1C2438" : "#fff",
      borderColor: isDarkTheme ? "#fff" : "#e8ecf4",
      color: isDarkTheme ? "#fff" : "#000",
    }),
    singleValue: provided => ({
      ...provided,
      fontSize: fontSize,
      color: isDarkTheme ? "#fff" : "#000",
    }),
    input: provided => ({
      ...provided,
      fontSize: fontSize,
      color: isDarkTheme ? "#fff" : "#000",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? isDarkTheme
          ? "#020817" // Dark theme hover color
          : "#f0f0f0" // Light theme hover color
        : isDarkTheme
          ? "#1C2438"
          : "#fff", // Default background color for options
      color: isDarkTheme ? "#fff" : "#000", // Text color for options
      "&:hover": {
        backgroundColor: isDarkTheme ? "#020817" : "#e6e6e6", // Custom hover color
      },
    }),
  };

  return <Select styles={customStyles} {...props} />;
};

export default AutoCompleteSelect;
