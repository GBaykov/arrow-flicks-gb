import { API_ENDPOINTS } from '@/constants/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    // const query = searchParams.get('query');
    const { ACCESS_TOKEN_VALUE } = process.env;

    const response = await fetch(`${API_ENDPOINTS.GENRES}?${searchParams}`, {
        headers: {
            method: 'GET',
            Authorization: `Bearer ${ACCESS_TOKEN_VALUE}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    return NextResponse.json(data);
}
