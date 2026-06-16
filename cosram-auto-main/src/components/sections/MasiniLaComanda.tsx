export default function MasiniLaComanda() {
  return (
    <section
      id="masini-la-comanda"
      className="py-16 bg-slate-50 border-y border-slate-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mașini la comandă
            </h2>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Nu ai găsit mașina dorită în stoc? Îți aducem la comandă
              autoturismul potrivit din Europa, verificat și adaptat
              bugetului tău.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold mb-3">1</div>
              <h3 className="font-semibold mb-2">
                Spune-ne ce cauți
              </h3>
              <p className="text-slate-600">
                Marcă, model, an, motorizare și buget.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold mb-3">2</div>
              <h3 className="font-semibold mb-2">
                Căutăm cele mai bune oferte
              </h3>
              <p className="text-slate-600">
                Selectăm variante verificate din rețeaua noastră de
                parteneri europeni.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold mb-3">3</div>
              <h3 className="font-semibold mb-2">
                Livrare și acte
              </h3>
              <p className="text-slate-600">
                Ne ocupăm de transport și documentație până la predare.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://wa.me/40700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium bg-green-600 text-white hover:opacity-90 transition"
            >
              Solicită o ofertă
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
