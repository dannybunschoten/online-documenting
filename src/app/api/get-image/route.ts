import { NextResponse } from "next/server";
import { getApiKey } from "@/lib/auth";
import { requiredEnv } from "@/lib/utils";

export async function GET(request: Request) {
  // 1. Get the external image URL from the query parameters
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Image URL is required", { status: 400 });
  }

  try {
    const authKey = await getApiKey();
    console.log("authkey", authKey);
    const imageResponse = await fetch(
      `https://api.smartflowcloud.com/${requiredEnv("DOMAIN")}/Forms(1ce25066-5a96-4dcb-80e7-bac7e75612ba)/Files(${imageUrl})/File`,
      {
        method: "GET",
        headers: {
          "x-security-authkey": authKey!,
        },
      },
    );

    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    const blob = await imageResponse.blob();

    const headers = new Headers();
    headers.set(
      "Content-Type",
      imageResponse.headers.get("Content-Type") || "application/octet-stream",
    );
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new Response(blob, { status: 200, statusText: "OK", headers });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse("Error fetching image.", { status: 500 });
  }
}
