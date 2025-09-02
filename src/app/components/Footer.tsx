import Image from "next/image";
import Link from "next/link";
import logo from "@/app/images/aboma-logo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-aboma-blue mt-auto py-12 font-sans text-white">
      <div className="container mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-4">
        <Image
          src={logo}
          alt="Aboma logo"
          className="h-14 brightness-0 invert"
        />
        <p className="text-center text-sm">
          © Copyright {currentYear} - All Rights Reserved by -{" "}
          <Link
            href="https://aboma.nl/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            Aboma
          </Link>{" "}
          - powered by{" "}
          <Link
            href="https://www.smartflowapps.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            Smartflow
          </Link>
        </p>
      </div>
    </footer>
  );
}
