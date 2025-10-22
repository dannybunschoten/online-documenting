import { getCheckList, getChecklists } from "@/actions";
import { Overview } from "@/app/components/Overview";

export const dynamic = "force-static";

export async function generateStaticParams() {
  if (!process.env.MONGODB_DATABASE) {
    console.warn(
      "WARNING: MONGODB_DATABASE environment variable not set, could not generate static params",
    );
    return [];
  }
  const checklistIds = await getChecklists();

  return checklistIds.map((id) => ({
    slug: id,
  }));
}

export default async function Report({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCheckList(slug);

  if (!data) {
    return (
      <div className="container mx-auto max-w-[1400px] px-4 py-8">
        <div className="text-muted-foreground text-center">
          Geen inspectiegegevens beschikbaar
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1400px] lg:px-6 lg:py-8">
      <Overview data={data} />
    </div>
  );
}
