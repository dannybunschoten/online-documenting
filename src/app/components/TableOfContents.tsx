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
    <nav className="mx-auto max-w-[900px]">
      <div className="overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-xl">
        <div className="from-aboma-blue to-aboma-blue/95 bg-gradient-to-r px-8 py-6">
          <div className="flex items-center gap-3">
            <Layers className="size-6 text-white/90" />
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Inhoudsopgave
            </h2>
          </div>
          <p className="mt-1 ml-9 text-sm text-white/80">
            Klik op een sectie om er naartoe te gaan
          </p>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-slate-50/30 p-6">
          <ul className="space-y-2">
            {dynamicNavigationEntries.map((entry, index) => (
              <li key={entry.title}>
                <button
                  onClick={() =>
                    handleNavigation(entry.title, entry.children.length > 0)
                  }
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-lg border border-transparent px-4 py-3 text-left transition-all duration-300 ease-out hover:bg-slate-50 hover:shadow-sm"
                >
                  <div className="group-hover:bg-aboma-blue/10 group-hover:text-aboma-blue flex size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-300">
                    {entry.children.length > 0 ? (
                      <Layers className="size-4" />
                    ) : (
                      <FileText className="size-4" />
                    )}
                  </div>

                  <span className="group-hover:text-aboma-blue flex-1 font-medium text-slate-700 transition-colors duration-300">
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

                  <span className="group-hover:bg-aboma-blue/10 group-hover:text-aboma-blue flex size-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600 transition-all duration-300">
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
                          className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-left transition-all duration-300 ease-out hover:bg-slate-50 hover:pl-6"
                        >
                          <div className="bg-aboma-yellow/60 group-hover:bg-aboma-yellow size-1.5 rounded-full transition-colors duration-300" />

                          <span className="group-hover:text-aboma-blue text-sm text-slate-600 transition-colors duration-300">
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
