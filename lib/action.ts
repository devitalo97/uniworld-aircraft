"use server";

import { getClient } from "@/lib/apllo-client";
import { FLIGHT_LIST_QUERY } from "@/lib/graphql/queries";

export async function fetchFlightList(input: { start: string; end: string }): Promise<Flight[]> {
  const client = getClient();

  try {
    const { data, errors } = await client.query({
      query: FLIGHT_LIST_QUERY,
      variables: input,
    });

    if (errors && errors.length > 0) {
      console.error("❌ GraphQL Errors:", JSON.stringify(errors, null, 2));
      throw new Error("Erro ao buscar lista de voos: " + errors.map((e) => e.message).join(", "));
    }

    return data?.flightList || [];
  } catch (error: any) {
    console.error("⚠️ Erro ao buscar voos:");

    if (error.networkError) {
      console.error("🌐 Erro de rede:", JSON.stringify(error.networkError, null, 2));
      if (error.networkError.result?.errors) {
        console.error("📜 GraphQL Response Errors:", JSON.stringify(error.networkError.result.errors, null, 2));
      }
    }

    if (error.graphQLErrors) {
      console.error("📜 GraphQL Errors:", JSON.stringify(error.graphQLErrors, null, 2));
    }

    console.error("🛑 Mensagem do erro:", error.message || error);

    // Lançar erro customizado para que a UI possa lidar com isso
    throw new Error(
      "Ocorreu um erro ao carregar os voos. Verifique sua conexão ou tente novamente mais tarde."
    );
  }
}
