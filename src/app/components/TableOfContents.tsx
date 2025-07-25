"use client";

import { cn, titleToId } from "@/lib/utils";
import { ChevronRight, FileText, Layers } from "lucide-react";
import { useState } from "react";

const navigationEntries = [
  { title: "Configuratie Aandrijving", children: [] },
  { title: "Configuratie Vanginrichting", children: [] },
  {
    title: "Resultaten",
    children: [
      { title: "0100 - Algemeen", children: [] },
      { title: "0200 - Mast", children: [] },
      { title: "0300 - Basisstation (grondkooi)", children: [] },
      { title: "Bediening in de kooi", children: [] },
      { title: "0400 - Liftkooi", children: [] },
      { title: "0500 - Etagehekken met volledige hoogte", children: [] },
      { title: "0600 - Etagehekken met beperkte hoogte", children: [] },
      { title: "0700 - Draagkabels / contragewicht kabels", children: [] },
      { title: "0800 - Hydraulische unit en cilinder", children: [] },
    ],
  },
  { title: "Samenvatting", children: [] },
  { title: "Conclusie", children: [] },
] as const;

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );

  const handleNavigation = (title: string, hasChildren: boolean) => {
    if (hasChildren) {
      const newExpanded = new Set(expandedSections);
      if (newExpanded.has(title)) {
        newExpanded.delete(title);
      } else {
        newExpanded.add(title);
      }
      setExpandedSections(newExpanded);
    } else {
      const elementId = titleToId(title);
      const element = document.getElementById(elementId);

      if (element) {
        const offset = 80; // Adjust based on your header height
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setActiveSection(title);
      } else {
        console.warn(
          `Element with ID "${elementId}" not found. Make sure your sections have matching IDs.`,
        );
      }
    }
  };

  return (
    <nav className="max-w-[900px] mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
        <div className="bg-gradient-to-r from-aboma-blue to-aboma-blue/95 px-8 py-6">
          <div className="flex items-center gap-3">
            <Layers className="size-6 text-white/90" />
            <h2 className="text-2xl text-white font-bold tracking-tight">
              Inhoudsopgave
            </h2>
          </div>
          <p className="text-white/70 text-sm mt-1 ml-9">
            Navigeer door het inspectierapport
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-white via-white to-slate-50/30">
          <ul className="space-y-2">
            {navigationEntries.map((entry, index) => (
              <li key={entry.title}>
                <button
                  onClick={() =>
                    handleNavigation(entry.title, entry.children.length > 0)
                  }
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg",
                    "transition-all duration-300 ease-out",
                    "flex items-center gap-3 group cursor-pointer",
                    activeSection === entry.title
                      ? "bg-aboma-yellow/10 shadow-sm border border-aboma-yellow/20"
                      : "hover:bg-slate-50 hover:shadow-sm border border-transparent",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center size-8 rounded-lg transition-all duration-300",
                      activeSection === entry.title
                        ? "bg-aboma-yellow text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 group-hover:bg-aboma-blue/10 group-hover:text-aboma-blue",
                    )}
                  >
                    {entry.children.length > 0 ? (
                      <Layers className="size-4" />
                    ) : (
                      <FileText className="size-4" />
                    )}
                  </div>

                  {/* Title */}
                  <span
                    className={cn(
                      "flex-1 font-medium transition-colors duration-300",
                      activeSection === entry.title
                        ? "text-aboma-blue"
                        : "text-slate-700 group-hover:text-aboma-blue",
                    )}
                  >
                    {entry.title}
                  </span>

                  {entry.children.length > 0 && (
                    <ChevronRight
                      className={cn(
                        "size-4 transition-all duration-300",
                        expandedSections.has(entry.title) && "rotate-90",
                        activeSection === entry.title
                          ? "text-aboma-yellow"
                          : "text-slate-400",
                      )}
                    />
                  )}

                  <span
                    className={cn(
                      "size-6 flex items-center justify-center text-xs rounded-full transition-all duration-300",
                      activeSection === entry.title
                        ? "bg-aboma-blue text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-aboma-blue/10 group-hover:text-aboma-blue",
                    )}
                  >
                    {index + 1}
                  </span>
                </button>

                {entry.children.length > 0 && (
                  <ul
                    className={cn(
                      "mt-2 ml-12 space-y-1 overflow-hidden transition-all duration-500 ease-in-out",
                      expandedSections.has(entry.title)
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    {entry.children.map((childEntry) => (
                      <li key={childEntry.title}>
                        <button
                          onClick={() =>
                            handleNavigation(childEntry.title, false)
                          }
                          className={cn(
                            "w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 ease-out flex items-center gap-3 group cursor-pointer hover:bg-slate-50 hover:pl-6",
                            activeSection === childEntry.title && "bg-slate-50",
                          )}
                        >
                          <div className="size-1.5 bg-aboma-yellow/60 rounded-full group-hover:bg-aboma-yellow transition-colors duration-300" />

                          <span className="text-sm text-slate-600 group-hover:text-aboma-blue transition-colors duration-300">
                            {childEntry.title}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-8 py-4 bg-gradient-to-r from-slate-50 to-slate-100/50 border-t border-slate-200/50">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Sectie{" "}
              {navigationEntries.findIndex((e) => e.title === activeSection) +
                1}{" "}
              van {navigationEntries.length}
            </p>
            <div className="flex gap-1">
              {navigationEntries.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1.5 w-8 rounded-full transition-all duration-300",
                    idx <=
                      navigationEntries.findIndex(
                        (e) => e.title === activeSection,
                      )
                      ? "bg-aboma-yellow"
                      : "bg-slate-200",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
