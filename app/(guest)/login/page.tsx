import { LoginForm } from '@/lib/components/forms';
import { Suspense } from 'react';
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <img src="https://uniworldaircargo.com/wp-content/uploads/2022/01/Asset-1@4x-1-1.png" alt="Enterprise Logo" className="h-10 w-auto max-w-full object-contain rounded-md" />
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}