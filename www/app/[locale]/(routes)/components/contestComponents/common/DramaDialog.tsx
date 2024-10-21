"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";

function DramaDialog({ contest }) {
  const router = useRouter();
  const t = useTranslations();

  return (
    <AlertDialog defaultOpen={true} onOpenChange={null} open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("edit_contest_title")}</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex justify-center mt-8">
          <table className="divide-y w-full divide-gray-200">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="hidden md:block px-4 py-3 font-bold text-slate-500 uppercase tracking-wider text-left  w-[12rem]">
                  {t("column_createdAt")}
                </th>
                <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider text-left  w-[30rem] ">
                  {t("forms_ph_programTitle")}
                </th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider text-right w-[60px]"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {contest?.findContest?.Application.map((applicant, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 border-b border-gray-200 cursor-pointer">
                  <td className="hidden md:block px-4 py-4 whitespace-nowrap text-left  w-[12rem]">
                    <DateTimeFormatter
                      date={applicant?.createdAt}
                      format="yyyy-MM-dd HH:mm"
                    />
                  </td>
                  <td className="px-4 py-4 text-left  w-[30rem] ">
                    {applicant?.programTitle}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap flex justify-end w-[60px]">
                    <Edit
                      onClick={() =>
                        router.push(
                          `/contest/${contest?.findContest?.id}/${applicant.id}`,
                        )
                      }
                      // className="ml-4"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DramaDialog;
