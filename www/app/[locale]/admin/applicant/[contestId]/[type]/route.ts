import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function GET(
  _: Request,
  {
    params,
  }: { params: { slug: string; contestId: string; type: "excel" | "zip" } },
) {
  const { user } = await getServerSession(authOptions);

  const url = new URL(_.url);
  const searchParams = new URLSearchParams(url?.searchParams);
  searchParams.append("contestId", params.contestId);
  const queryString = searchParams.toString();

  const backendUrl = `${process.env.NEXT_PUBLIC_API}/application/${params?.type}?${queryString}`;

  const ERROR_SUPRESS_URL = "/admin/applicant/" + params?.contestId;

  try {
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    if (!response.ok) {
      // const errorDetails = await response.text(); // Get the response body
      // throw new Error(
      //   `Failed to fetch: ${response.status} ${response.statusText} - ${errorDetails}`,
      // );

      return redirect(ERROR_SUPRESS_URL);
    }

    const disposition = response.headers.get("Content-Disposition");
    const filename = (() => {
      const matches = disposition?.match(
        /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
      );
      return matches && matches[1]
        ? decodeURIComponent(matches[1].replace(/['"]/g, ""))
        : "default-filename.zip";
    })();

    const contentDisposition = `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`;
    const readableStream = response.body;

    return new Response(readableStream, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": contentDisposition,
      },
    });
  } catch (error) {
    // console.error("Error fetching file:", error);
    // return new Response(null, { status: 200 });

    return redirect(ERROR_SUPRESS_URL);
  }
}
