import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./router";

async function main() {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    ],
  });

  try {
    const withInputQuery = await client.hello.greeting.query({
      name: "foo".repeat(100),
    });
    console.log(withInputQuery);
  } catch (error) {
    console.error("Error:", error);
  }
}

void main();
