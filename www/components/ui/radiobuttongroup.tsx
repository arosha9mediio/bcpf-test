import * as RadioGroup from "@radix-ui/react-radio-group";
import React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

interface RadioButtonProps {
  className?: string;
  fields: { id: string; value: string; label: string }[]; // Assuming fields is a string array
  value: string;
  onChange: (checked: boolean) => void;
}

const RadioButton = React.forwardRef<
  React.ElementRef<typeof RadioGroup.Root>,
  RadioButtonProps
>(({ className, fields, value, onChange, ...props }, ref) => {
  const { register, setValue } = useForm();

  // Update handleRadioChange to get the selected value from the event
  const handleRadioChange = value => {
    // console.log("Selected value:", value);
    onChange(value); // Update "radioGroupValue" in form state
  };
  return (
    <div className="space-y-4">
      <RadioGroup.Root
        ref={ref}
        className="grid grid-cols-5 gap-4"
        defaultValue={value}
        aria-label="View density"
        onValueChange={handleRadioChange} // Use onValueChange instead of onChange
      >
        {fields?.map((field, i) => {
          return (
            <div className="flex" key={field.id || i}>
              <div className="flex items-center">
                <RadioGroup.Item
                  value={field.id}
                  id={field.id}
                  className="aspect-square h-6 w-6 rounded-full border border-slate-600 hover:bg-violet3 focus:border-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none cursor-pointer"
                  {...register("radioGroupValue")}>
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3 after:h-3 after:rounded-[50%] after:bg-black dark:after:bg-white" />
                </RadioGroup.Item>
                <label className="text-md leading-none pl-2" htmlFor={field.id}>
                  {field.label}
                </label>
              </div>
            </div>
          );
        })}

        {/* <div className="flex items-center">
          <RadioGroup.Item
            value="comf"
            id="r2"
            className="bg-white w-[20px] h-[20pxRadioButton
          </label>
        </div> */}
      </RadioGroup.Root>
    </div>
  );
});

RadioButton.displayName = "RadioButton";

export { RadioButton };
