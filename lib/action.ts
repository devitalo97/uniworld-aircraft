"use server"

import { signIn } from "@/auth";
import { getClient } from "./apllo-client";
import { Flight } from "./definitions";
import { FLIGHT_LIST_QUERY } from "./graphql/queries";
import { neon } from "@neondatabase/serverless";
import { AuthError } from "next-auth";

export async function fetchFlightList(input: {
  startTimeInterval: string
  endTimeInterval: string
  flightType: string[]
  flightStatus: string[]
  aircraftNidList: string[]
 }): Promise<Flight[]> {
  const client = getClient();
  try {
    const { data } = await client.query({
      query: FLIGHT_LIST_QUERY,
      variables: input,
    });

    return data?.flightList || [];
  } catch (error: any) {
    throw error
  }
}

export async function getUserByEmail(email: string) {
    const sql = neon(process.env.NEON_TECH_DATABASE_URL!);

    const data = await sql`
        SELECT id, name, email, created_at, password
        FROM "user"
        WHERE email = ${email}
        LIMIT 1;
    `;

    return data.length > 0 ? data[0] : null;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


