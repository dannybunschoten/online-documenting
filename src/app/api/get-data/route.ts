import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("online-documenting");
    const data = await db
      .collection("data-snapshot")
      .aggregate([
        { $match: { TaskId: id } },
        { $unwind: { path: "$checks" } },
        { $group: { path: "$checks.CheckGroup.Id" } },
        {
          $lookup: {
            from: "data-models",
            let: { checkId: "$checks.Check.Id" },
            pipeline: [
              {
                $match: {
                  VERSION: 1,
                },
              },
              {
                $unwind: { path: "$CHECK_GROUPS" },
              },
              {
                $unwind: { path: "$CHECK_GROUPS.Checks" },
              },
              {
                $match: {
                  $expr: {
                    $eq: ["$CHECK_GROUPS.Checks.CheckId", "$$checkId"],
                  },
                },
              },
              {
                $replaceRoot: { newRoot: "$value" },
              },
            ],
            as: "checks",
          },
        },
        {
          $match: {
            checks: { $ne: [] },
          },
        },
        {
          $project: {
            _id: 0,
            checkgroupId: "$CHECK_GROUPS.CheckGroupId",
            checkgroupName: "$CHECK_GROUPS.Name",
            checkgroupPrefix: "$CHECK_GROUPS.CheckGroupPrefix",
            order: "$CHECK_GROUPS.Order",
            checks: 1,
          },
        },
        {
          $sort: { order: 1 },
        },
      ])
      .toArray();

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
