import { API_ENDPOINTS, API_LANGUAGE } from '@/constants/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    // const query = searchParams.get('query');
    const { ACCESS_TOKEN_VALUE } = process.env;

    if (!ACCESS_TOKEN_VALUE) {
        return NextResponse.json({ error: 'Access token is missing. Check .env variables.' });
    }
    searchParams.set('language', API_LANGUAGE);

    const response = await fetch(`${API_ENDPOINTS.DISCOVER}?${searchParams}`, {
        headers: {
            method: 'GET',
            Authorization: `Bearer ${ACCESS_TOKEN_VALUE}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    return NextResponse.json(data);
}
