import Image from "next/image";
import Link from "next/link";
import logo from "@/app/images/aboma-logo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-aboma-blue text-white py-12 font-sans mt-auto">
      <div className="container mx-auto px-4 max-w-[1400px] flex flex-col items-center gap-8">
        <Image
          src={logo}
          alt="Aboma logo"
          className="brightness-0 invert h-14"
        />
        <p className="text-center text-sm">
          © Copyright {currentYear} - All Rights Reserved by -{" "}
          <Link
            href="https://aboma.nl/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Aboma
          </Link>{" "}
          Powered By{" "}
          <Link
            href="https://www.smartflowapps.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Smartflow
          </Link>
        </p>
      </div>
    </footer>
  );
}
