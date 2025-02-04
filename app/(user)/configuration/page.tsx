import { listUsers } from "@/lib/action";
import { UserTable } from "@/lib/components/tables";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function Configuration() {
  const users = await listUsers();
  return (
    <>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <main className="lg:flex-auto">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                Users 
                <Link href="/configuration/form/create-user" title="Create new user">
                  <PlusCircle className="h-4 w-4 cursor-pointer hover:bg-accent dark:hover:bg-accent-dark rounded-full" />
                </Link>
              </h2>
              <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-400">
                The list above shows all users on your account.
              </p>
              <dl className="mt-6 border-t border-gray-200 dark:border-gray-700 text-sm/6">
                <UserTable users={users} />
              </dl>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}