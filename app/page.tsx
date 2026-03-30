// app/page.tsx

import ClientPage from "./ClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Antimicrobial Dog Blanket for Allergies & Itching | Rx Clinical Pet Blanket",
  description:
    "Relieve dog allergies, itching, and hot spots with a clinical-grade antimicrobial pet blanket. Made in the USA and Canada. Ships from Canada.",
  keywords: [
    "dog allergies relief",
    "antimicrobial dog blanket",
    "dog itching solution",
    "dog hot spots remedy",
    "clinical pet blanket",
    "hypoallergenic dog bedding",
  ],
  openGraph: {
    title:
      "Antimicrobial Dog Blanket for Allergies & Itching | Rx Clinical Pet Blanket",
    description:
      "Clinical-grade antimicrobial dog blanket designed to reduce itching, allergens, and hot spots.",
    url: "https://sleephygienicsltd.com",
    siteName: "Sleep Hygienics Ltd.",
    images: [
      {
        url: "https://sleephygienicsltd.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Antimicrobial Dog Blanket",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Antimicrobial Dog Blanket for Allergies & Itching | Rx Clinical Pet Blanket",
    description:
      "Reduce allergens, itching, and hot spots with a clinical antimicrobial blanket.",
    images: ["https://sleephygienicsltd.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sleephygienicsltd.com",
  },
};

export default function Page() {
  return <ClientPage />;
}
