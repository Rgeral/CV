import type { Metadata } from "next"
import "./print.css"

export const metadata: Metadata = {
  title: "CV - Version Impression",
}

export default function CVPrintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
