import { NextRequest } from 'next/server';

import { API_ENDPOINTS } from '@/constants/api';

export const GET = async (req: NextRequest, { params }: { params: { file: string } }) => {
  const response = await fetch(`${API_ENDPOINTS.LOGOS}/${params.file}`, {
    method: 'GET',
  });

  return response;
};
