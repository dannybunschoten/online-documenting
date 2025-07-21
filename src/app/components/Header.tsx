"use client";

import Link from "next/link";
import Image from "next/image";
import abomaLogo from "@/app/images/aboma-logo.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-100 font-sans">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center py-4 h-full">
            <Image src={abomaLogo} alt="Aboma Logo" className="w-auto h-full" />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden cursor-pointer",
              isOpen ? "rotate-90" : "rotate-0",
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="size-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <div className="hidden md:block">
            <Link
              href="/"
              className="font-medium text-aboma-blue hover:text-aboma-yellow transition-colors"
            >
              All Reports
            </Link>
          </div>

          <div
            className={cn(
              "absolute top-20 left-0 right-0 bg-white p-6 shadow-md md:hidden transition-all",
              isOpen ? "block" : "hidden",
            )}
          >
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/"
                  className="font-medium text-aboma-blue hover:text-aboma-yellow transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Reports
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
