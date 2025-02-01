import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.LEON_GRAPHQL_URI,
      headers: {
        Authorization: `Bearer ${process.env.LEON_ACCESS_TOKEN}`,
      },
      fetchOptions: { cache: "no-store" },
    }),
  });
});
