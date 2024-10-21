"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";
import { useTranslations } from "next-intl";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;

  label?: string;
  hLabel?: string;
  mLabel?: string;
  icon?: boolean;
}

export function TimePickerDemo({
  date,
  setDate,
  label,
  hLabel,
  mLabel,
  icon,
}: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  const t = useTranslations();

  return (
    <div>
      <Label htmlFor="t-picker" className="text-xs">
        {t(label || "time")}
      </Label>
      <div id="t-picker" className="flex items-center gap-1">
        <div className="grid gap-1 text-center">
          {hLabel && (
            <Label htmlFor="hours" className="text-xs">
              {t(hLabel)}
            </Label>
          )}
          <TimePickerInput
            picker="hours"
            date={date}
            setDate={setDate}
            ref={hourRef}
            onRightFocus={() => minuteRef.current?.focus()}
          />
        </div>

        <div className="text-lg">
          <span className="text-pink-500">:</span>
        </div>

        <div className="grid gap-1 text-center">
          {mLabel && (
            <Label htmlFor="minutes" className="text-xs">
              {t(mLabel)}
            </Label>
          )}
          <TimePickerInput
            picker="minutes"
            date={date}
            setDate={setDate}
            ref={minuteRef}
            onLeftFocus={() => hourRef.current?.focus()}
            // onRightFocus={() => secondRef.current?.focus()}
          />
        </div>

        {icon && (
          <div className="flex h-10 items-center">
            <Clock className="ml-2 h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}
