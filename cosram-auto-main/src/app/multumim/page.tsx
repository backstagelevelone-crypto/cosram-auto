export default function MultumimPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-2">Solicitarea ta a fost trimisă!</h1>
      <p className="text-gray-600 mb-6">Un consultant Cosram Auto te va contacta în cel mai scurt timp.</p>
      <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition">
        Înapoi la site
      </a>
    </div>
  );
}
