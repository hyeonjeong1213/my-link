export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-20 font-[family-name:var(--font-sans)]">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Next.js
        </h1>
        <p className="text-lg text-gray-500">
          Get started by editing <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">app/page.tsx</code>
        </p>
      </main>
    </div>
  );
}
