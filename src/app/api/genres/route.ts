import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/constants/api";

export async function GET(request: NextRequest) {
  // const searchParams = request.nextUrl.searchParams;
  const { searchParams } = new URL(request.url);
  // const query = searchParams.get('query');
  const { ACCESS_TOKEN_VALUE } = process.env;
  if (!ACCESS_TOKEN_VALUE) {
    return NextResponse.json({
      error: "Access token is missing. Check .env variables.",
    });
  }

  const response = await fetch(`${API_ENDPOINTS.GENRES}?${searchParams}`, {
    headers: {
      method: "GET",
      Authorization: `Bearer ${ACCESS_TOKEN_VALUE}`,
      // 'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return NextResponse.json(data);
}
