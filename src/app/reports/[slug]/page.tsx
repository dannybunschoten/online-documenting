import { getCheckList, getChecklists } from "@/actions";
import { Overview } from "@/app/components/Overview";

export async function generateStaticParams() {
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
          No inspection data available
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
