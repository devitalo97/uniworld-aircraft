import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

// Variável para armazenar o token atual
let accessToken = process.env.LEON_ACCESS_TOKEN;

// Crie o HttpLink que aponta para o GraphQL
const httpLink = new HttpLink({
  uri: `${process.env.LEON_URI}/api/graphql/`,
  fetch,
});

// Link para adicionar o cabeçalho de autorização em cada requisição
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  }));
  return forward(operation);
});

// Função para fazer o refresh do token
const fetchNewAccessToken = async () => {
  const response = await fetch(`${process.env.LEON_URI}/access_token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: process.env.LEON_API_KEY,
    }),
  });
  if (!response.ok) {
    throw new Error("Falha ao atualizar o token");
  }
  const data = await response.text();
  return data;
};

// Link de erro para interceptar erros de autenticação
const errorLink = onError(({ networkError, operation, forward }) => {
  // Exemplo: se o erro de rede indicar 401 (não autorizado)
  if (networkError && "statusCode" in networkError && networkError.statusCode === 401) {
    return new Observable((observer) => {
      (async () => {
        try {
          // Obtenha um novo token
          accessToken = await fetchNewAccessToken();
          // Atualize o contexto da operação com o novo token
          const oldHeaders = operation.getContext().headers;
          operation.setContext({
            headers: {
              ...oldHeaders,
              Authorization: `Bearer ${accessToken}`,
            },
          });
          // Refaça a operação original
          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };
          forward(operation).subscribe(subscriber);
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }
});

// Crie o ApolloClient com o link composto

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  })
})
