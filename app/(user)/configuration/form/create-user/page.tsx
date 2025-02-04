import { UserCreateForm } from "@/lib/components/forms/user.create.form";

export default function CreateUser() {
  return (
    <>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <main className="lg:flex-auto">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                Create one user
              </h2>
              <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-400">
                Fill the next form to create one user.
              </p>

              <dl className="mt-6 text-sm/6">
                <UserCreateForm />
              </dl>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
