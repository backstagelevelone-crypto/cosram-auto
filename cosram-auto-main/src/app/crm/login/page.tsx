export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 text-center">
          COSRAM
        </h1>

        <p className="text-center text-gray-500 mb-8">
          CRM Login
        </p>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border p-3"
          />

          <input
            type="password"
            placeholder="Parolă"
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 p-3 text-white font-semibold hover:bg-red-700"
          >
            Autentificare
          </button>
        </form>
      </div>
    </main>
  );
}
