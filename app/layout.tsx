import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Pantry AI",
  description: "AI recipe planner and visual shelf-life tracker",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-bg text-white antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
