import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RoutePaths } from "@/constants/route";
import { Metadata } from "next";
import RequestPhoneNumberDialog from "@/components/modals/phone-modal";
import { isProd } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "",
  description: "",
  openGraph: {
    images: [
      {
        url: "/images/opengraph-image.png",

        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
};
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect(RoutePaths.signIn.value);
  }
  const needPhoneVerification =
    session?.user?.role !== "ADMIN" && !session?.user?.phone;

  return (
    <>
      <RequestPhoneNumberDialog open={needPhoneVerification} />
      {children}
    </>
  );
}
