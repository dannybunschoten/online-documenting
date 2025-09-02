import { getChecklists } from "@/actions";
import Link from "next/link";

export default async function Home() {
  const checkLists = await getChecklists();

  return (
    <section className="mx-auto mt-4 max-w-[1400px] rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
      <h1 className="text-aboma-blue mb-2 text-2xl font-semibold">
        Click one of the reports:
      </h1>
      <ul className="space-y-1">
        {checkLists.map((checklist) => {
          const link = `/reports/${checklist}`;
          return (
            <li key={checklist}>
              <Link
                className="hover:text-aboma-yellow text-aboma-blue transition-colors"
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
