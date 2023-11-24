import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const page = url.searchParams.get('page');
  const pageSize = request.nextUrl.searchParams.get('pageSize');

  const isHaveDefaultQuery = !page || !pageSize;

  if (isHaveDefaultQuery) {
    if (!page) url.searchParams.set('page', '1');
    if (!pageSize) url.searchParams.set('pageSize', '10');
    return NextResponse.redirect(url);
  }
}
