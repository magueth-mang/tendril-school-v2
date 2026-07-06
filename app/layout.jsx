import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata = {
  title: "Tendril School — L'école 3D du luxe",
  description:
    "La 1ère école 3D spécialisée pour le luxe, mode & hardware. Bootcamps intensifs de 4 mois à Paris.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
