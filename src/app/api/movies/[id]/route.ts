import { API_ENDPOINTS, API_LANGUAGE } from '@/constants/api';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const searchParams = request.nextUrl.searchParams;
    const { id } = params;
    // const query = searchParams.get('query');
    const { ACCESS_TOKEN_VALUE } = process.env;

    if (!ACCESS_TOKEN_VALUE) {
        return NextResponse.json({ error: 'Access token is missing. Check .env variables.' });
    }
    searchParams.set('language', API_LANGUAGE);
    searchParams.set('append_to_response', 'videos');

    const response = await fetch(`${API_ENDPOINTS.MOVIE}/${id}?${searchParams}`, {
        headers: {
            method: 'GET',
            Authorization: `Bearer ${ACCESS_TOKEN_VALUE}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    return NextResponse.json(data);
};
