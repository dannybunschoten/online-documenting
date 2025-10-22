import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

// Placeholder inspection images for demo purposes
const PLACEHOLDER_IMAGES = [
  "/inspection-1.jpg",
  "/inspection-2.jpg",
];

export async function GET(request: Request) {
  // 1. Get the external image URL from the query parameters
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Image URL is required", { status: 400 });
  }

  // DEMO MODE: Serve placeholder images
  try {
    // Use a hash of the imageUrl to consistently return the same placeholder for the same image
    const hash = imageUrl.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const placeholderPath = PLACEHOLDER_IMAGES[hash % PLACEHOLDER_IMAGES.length];
    const imagePath = join(process.cwd(), "public", placeholderPath);

    const imageBuffer = await readFile(imagePath);

    return new Response(imageBuffer.buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error loading placeholder image:", error);
    return new NextResponse("Error fetching image.", { status: 500 });
  }

  // ORIGINAL API CODE (commented out for demo)
  // try {
  //   const authKey = await getApiKey();
  //   console.log("authkey", authKey);
  //   const imageResponse = await fetch(
  //     `https://api.smartflowcloud.com/${requiredEnv("DOMAIN")}/Forms(1ce25066-5a96-4dcb-80e7-bac7e75612ba)/Files(${imageUrl})/File`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "x-security-authkey": authKey!,
  //       },
  //     },
  //   );
  //
  //   if (!imageResponse.ok) {
  //     throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
  //   }
  //
  //   const blob = await imageResponse.blob();
  //
  //   const headers = new Headers();
  //   headers.set(
  //     "Content-Type",
  //     imageResponse.headers.get("Content-Type") || "application/octet-stream",
  //   );
  //   headers.set("Cache-Control", "public, max-age=31536000, immutable");
  //
  //   return new Response(blob, { status: 200, statusText: "OK", headers });
  // } catch (error) {
  //   console.error("Image proxy error:", error);
  //   return new NextResponse("Error fetching image.", { status: 500 });
  // }
}
