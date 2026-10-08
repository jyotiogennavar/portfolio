import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { appendVaryAccept } from "@/lib/accept"
import { planNegotiation } from "@/lib/negotiate"

export function middleware(request: NextRequest) {
  const plan = planNegotiation(request.nextUrl.pathname, request.headers.get("accept"))

  if (plan.action === "not-acceptable") {
    return new NextResponse("Not Acceptable\n\nAvailable: text/html, text/markdown\n", {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept",
      },
    })
  }

  if (plan.action === "markdown") {
    const url = request.nextUrl.clone()
    url.pathname = plan.pathname
    const rewritten = NextResponse.rewrite(url)
    appendVaryAccept(rewritten.headers)
    return rewritten
  }

  if (plan.action === "passthrough") return NextResponse.next()

  const response = NextResponse.next()
  appendVaryAccept(response.headers)
  response.headers.append("Link", plan.link)
  return response
}

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/).*)"],
}
