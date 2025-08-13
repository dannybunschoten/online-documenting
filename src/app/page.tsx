import { getChecklists } from "@/actions";
import Link from "next/link";

export default async function Home() {
  const checkLists = await getChecklists();

  return (
    <section className="max-w-[1400px] bg-white rounded-2xl mx-auto p-8 mt-4 text-center shadow-xl border-gray-100 border">
      <h1 className="text-aboma-blue font-semibold text-2xl mb-2">
        Click one of the reports:
      </h1>
      <ul className="space-y-1">
        {checkLists.map((checklist) => {
          const link = `/reports/${checklist}`;
          return (
            <li key={checklist}>
              <Link href={link}>{checklist}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
