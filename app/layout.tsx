import "./globals.css";
import type { Metadata } from "next";
export const metadata:Metadata={title:"Hyderabad Branch Manager",description:"Multi-user branch management dashboard"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body>{children}</body></html>}
