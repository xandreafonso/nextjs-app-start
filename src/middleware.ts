import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { resp } from "./backend/libs/resp";
import { redirectUtils } from "./backend/libs/redirect-utils";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request)

	if (!sessionCookie) {
		return resp.redirect(redirectUtils.url('/signin'))
	}

	return NextResponse.next()
}

export const config = {
    matcher: ['/api/adm/:path*', '/adm/:path*', '/api/system/:path*', '/system/:path*'],
}