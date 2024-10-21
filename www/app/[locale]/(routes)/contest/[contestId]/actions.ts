"use server";

import { client } from "@/lib/client";

const getContest = async (id: string) => {
  return await client.findContest({
    id,
  });
};

const getApplicationByContest = async (id: string) => {
  return await client.getApplicationByContest({
    id,
  });
};

const getApplication = async (id: string) => {
  return await client.findApplication({
    id,
  });
};
export { getApplication, getContest, getApplicationByContest };
