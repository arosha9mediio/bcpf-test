import { client } from "@/lib/client";

export const getPage = async (slugOrId: string) => {
  try {
    const page = await client.findPost({ id: slugOrId });
    return page.findPost;
  } catch (e) {
    return null;
  }
};
