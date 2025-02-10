"use server"

import { signIn, signOut } from "@/auth";
import { getClient } from "./apllo-client";
import { Flight, User } from "./definitions";
import { FLIGHT_LIST_QUERY } from "./graphql/queries";
import { neon } from "@neondatabase/serverless";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache";

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
      context: {
        fetchOptions: {
          cache: "no-store"
        },
      },
    });

    return data?.flightList || [];
  } catch (error: any) {
    throw error
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const sql = neon(process.env.NEON_TECH_DATABASE_URL!);

    const data = await sql`
        SELECT id, name, email, created_at, password, role
        FROM "user"
        WHERE email = ${email}
        LIMIT 1;
    `;

    return data.length > 0 ? data[0] as User : null;
}

export async function createOneUser(
  prevState: { error?: string, success: boolean } | undefined,
  formData: FormData
) {
  try {
    // Obtendo os dados do formulário corretamente
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    if (!name || !email || !password || !role) {
      throw new Error("All fields are required.");
    }

    // Conectando ao banco
    const sql = neon(process.env.NEON_TECH_DATABASE_URL!);

    // Verificando se o usuário já existe
    const existingUser = await sql`
      SELECT id FROM "user" WHERE email = ${email} LIMIT 1;
    `;

    if (existingUser.length > 0) {
      throw new Error("User already exists.");
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserindo novo usuário no banco
    await sql`
      INSERT INTO "user" (email, name, password, role, created_at) 
      VALUES (${email}, ${name}, ${hashedPassword}, ${role}, NOW()) 
      RETURNING id, name, email, created_at;
    `;

    revalidatePath("/configuration")
    
    return { success: true, redirect_to: "/configuration" }
  } catch (error) {
    if(error instanceof Error) return {error: error.message, success: false}
    throw error
  }
}


export async function listUsers(limit: number = 10, offset: number = 0) {
  const sql = neon(process.env.NEON_TECH_DATABASE_URL!);

  const users = await sql`
      SELECT id, name, email, role, created_at
      FROM "user"
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset};
  `;

  return users as User[];
}

export async function deleteUserById(userId: string) {
  try {
    const sql = neon(process.env.NEON_TECH_DATABASE_URL!);

    // Deletando o usuário
    await sql`
      DELETE FROM "user" WHERE id = ${userId};
    `;

    revalidatePath("/configuration")
  } catch (error) {
    throw error
  }
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

export async function logout() {
  await signOut({ redirect: false });
}


