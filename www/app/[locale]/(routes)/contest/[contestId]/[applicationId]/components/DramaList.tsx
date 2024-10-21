"use client";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";

function DramaList({ contest }) {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className="w-dvw h-dvh bg-slate-500/30 flex justify-center items-center">
      <div className="bg-background">
        <div className="text-center">
          <h2>{t("edit_contest_title")}</h2>
        </div>

        <div className="flex justify-center mt-8">
          <table className=" divide-y w-[800px] divide-gray-200 mb-[400px]">
            <thead className="bg-gray-50 ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold font-medium text-slate-500 uppercase tracking-wider text-left">
                  {t("forms_ph_programTitle")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold font-medium text-slate-500 uppercase tracking-wider text-left">
                  {t("column_name")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-bold font-medium text-slate-500 uppercase tracking-wider text-right">
                  {t("admin_button_edit")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {contest?.findContest?.Application.map((applicant, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 border-b border-gray-200 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    {applicant?.programTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    {applicant?.applier1Name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-end">
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
      </div>
    </div>
  );
}

export default DramaList;
