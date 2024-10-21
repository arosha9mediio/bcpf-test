import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // Allow passing an icon component as a prop
  dropdown?: React.ReactNode; // Allow passing a dropdown component as a prop
}

const DropDownNew = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, dropdown, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="flex">
          {icon && (
            <div className="flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
              icon ? "pl-10" : "", // Adjust padding if icon is present
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {dropdown && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {dropdown}
          </div>
        )}
      </div>
    );
  },
);

DropDownNew.displayName = "Input";

export { DropDownNew };
