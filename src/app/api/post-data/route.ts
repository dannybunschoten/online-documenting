import clientPromise from "@/lib/mongodb";
import { RequestSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = RequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: validation.error.issues,
        },
        { status: 400 },
      );
    }
    const client = await clientPromise;
    const db = client.db("online-documenting");

    const { checkResults, taskInformation, dataModel } = validation.data;

    //TODO: remove this line below
    await db.collection("data-snapshot").deleteMany();

    const [insertResult] = await Promise.all([
      db.collection("data-snapshot").insertOne({
        ...taskInformation[0],
        checks: checkResults,
      }),
      db
        .collection("data-models")
        .bulkWrite([
          { deleteMany: { filter: { VERSION: dataModel.VERSION } } },
          { insertOne: { document: dataModel } },
        ]),
    ]);

    return NextResponse.json(
      {
        id: insertResult.insertedId,
        message: "Request successfully processed and data stored.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to process request:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
