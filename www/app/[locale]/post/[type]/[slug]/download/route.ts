import { isProd } from "@/lib/utils";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  const slug = decodeURIComponent(params.slug);

  const backendUrl = `${process.env.NEXT_PUBLIC_API}/post/press/${slug}`;

  try {
    const response = await fetch(backendUrl, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return response;
  } catch (error) {
    console.error("Error fetching file:", error.message);
  }
}
