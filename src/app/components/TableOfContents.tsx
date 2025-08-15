"use client";

import { cn, titleToId } from "@/lib/utils";
import { ChevronRight, FileText, Layers } from "lucide-react";
import { useState, useRef } from "react";
import { toExclude } from "./AdditionalResults";
import { CheckList } from "../types";

const navigationEntries = [
  { title: "Configuratie Aandrijving", children: [] },
  { title: "Configuratie Vanginrichting", children: [] },
  {
    title: "Resultaten",
    children: [],
  },
  { title: "Conclusie", children: [] },
];

export default function TableOfContents({ data }: { data: CheckList }) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );
  const sectionsRef = useRef<Record<string, HTMLUListElement | null>>({});

  const resultTitles = data.checks.filter(
    (checkGroup) => !toExclude.has(checkGroup.checks[0].CheckGroup.Id),
  );

  const dynamicNavigationEntries = navigationEntries.map((entry) => {
    if (entry.title === "Resultaten") {
      return {
        ...entry,
        children: resultTitles.map((result) => ({
          title: result.title,
          children: [],
        })),
      };
    }
    return entry;
  });

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
        const offset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
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
            {dynamicNavigationEntries.map((entry, index) => (
              <li key={entry.title}>
                <button
                  onClick={() =>
                    handleNavigation(entry.title, entry.children.length > 0)
                  }
                  className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-out flex items-center gap-3 group cursor-pointer hover:bg-slate-50 hover:shadow-sm border border-transparent"
                >
                  <div className="flex items-center justify-center size-8 rounded-lg transition-all duration-300 bg-slate-100 text-slate-600 group-hover:bg-aboma-blue/10 group-hover:text-aboma-blue">
                    {entry.children.length > 0 ? (
                      <Layers className="size-4" />
                    ) : (
                      <FileText className="size-4" />
                    )}
                  </div>

                  <span className="flex-1 font-medium transition-colors duration-300 text-slate-700 group-hover:text-aboma-blue">
                    {entry.title}
                  </span>

                  {entry.children.length > 0 && (
                    <ChevronRight
                      className={cn(
                        "size-4 transition-all duration-300",
                        expandedSections.has(entry.title) && "rotate-90",
                        "text-slate-400",
                      )}
                    />
                  )}

                  <span className="size-6 flex items-center justify-center text-xs rounded-full transition-all duration-300 bg-slate-100 text-slate-600 group-hover:bg-aboma-blue/10 group-hover:text-aboma-blue">
                    {index + 1}
                  </span>
                </button>

                {entry.children.length > 0 && (
                  <ul
                    ref={(el) => {
                      sectionsRef.current[entry.title] = el;
                    }}
                    className="mt-2 ml-12 space-y-1 overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: expandedSections.has(entry.title)
                        ? `${sectionsRef.current[entry.title]?.scrollHeight || 0}px`
                        : "0px",
                      opacity: expandedSections.has(entry.title) ? 1 : 0,
                    }}
                  >
                    {entry.children.map((childEntry) => (
                      <li key={childEntry.title}>
                        <button
                          onClick={() =>
                            handleNavigation(childEntry.title, false)
                          }
                          className="w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 ease-out flex items-center gap-3 group cursor-pointer hover:bg-slate-50 hover:pl-6"
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
      </div>
    </nav>
  );
}
