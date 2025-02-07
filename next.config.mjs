/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => [
        {
          source: "/",
          destination: "/dashboard",
          permanent: false, // ou false, se quiser um redirecionamento temporário
        },
      ],
};

export default nextConfig;
