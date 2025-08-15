import Link from "next/link";
import Image from "next/image";
import abomaLogo from "@/app/images/aboma-logo.svg";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-100 font-sans">
      <div className="h-20 container mx-auto px-4 max-w-[1400px]">
        <Link href="/" className="py-4 h-full inline-block">
          <Image src={abomaLogo} alt="Aboma Logo" className="w-auto h-full" />
        </Link>
      </div>
    </nav>
  );
}
