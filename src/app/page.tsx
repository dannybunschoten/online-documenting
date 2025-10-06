import { getChecklists } from "@/actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const checkLists = await getChecklists();

  return (
    <section className="mx-auto my-6 max-w-[1200px] rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-xl">
      <h1 className="text-aboma-blue mb-6 text-3xl font-bold">
        Selecteer een inspectierapport
      </h1>
      <ul className="space-y-3">
        {checkLists.map((checklist) => {
          const link = `/reports/${checklist}`;
          return (
            <li key={checklist}>
              <Link
                className="hover:text-aboma-yellow text-aboma-blue block rounded-lg px-4 py-3 text-lg font-medium transition-all hover:bg-slate-50"
                href={link}
              >
                {checklist}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
