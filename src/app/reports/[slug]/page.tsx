import { getCheckList } from "@/actions";
import { Overview } from "@/app/components/Overview";

export default async function Report({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCheckList(slug);

  if (!data) {
    return (
      <div className="container mx-auto px-4 max-w-[1400px] py-8">
        <div className="text-center text-muted-foreground">
          No inspection data available
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:px-6 max-w-[1400px] lg:py-8">
      <Overview data={data} />
    </div>
  );
}
