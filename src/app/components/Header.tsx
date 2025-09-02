import Link from "next/link";
import Image from "next/image";
import abomaLogo from "@/app/images/aboma-logo.svg";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-100 bg-white font-sans">
      <div className="container mx-auto h-20 max-w-[1400px] px-4">
        <Link href="/" className="inline-block h-full py-4">
          <Image src={abomaLogo} alt="Aboma Logo" className="h-full w-auto" />
        </Link>
      </div>
    </nav>
  );
}
