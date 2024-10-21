import { cn } from "@/lib/utils";
import * as React from "react";

export interface ChipsInputProps {
  value: string[];
  onChange: (chips: string[]) => void;
  placeholder?: string;
}

const ChipsInput: React.FC<ChipsInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
      e.preventDefault();
    }
  };

  const handleRemoveChip = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap items-center border border-input rounded-md p-2 dark:border-slate-500 hover:border-slate-500 focus-visible:border-slate-500 focus-visible-border-2 dark:focus-visible:border-white dark:focus-visible:border-2">
      {value?.map((chip, index) => (
        <div
          key={index}
          className="flex items-center m-1 bg-gray-200 px-2 py-1 rounded-full text-sm">
          {chip}
          <button
            type="button"
            className="ml-1 text-xs text-red-500"
            onClick={() => handleRemoveChip(index)}>
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        className={cn("flex-grow border-none outline-none bg-transparent px-2")}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

export { ChipsInput };
