export interface Masina {
  _id: string;
  slug?: string;
  marca?: string;
  model?: string;
  an?: number;
  kilometraj?: number;
  pret?: number;
  rataLunara?: number;
  combustibil?: "Benzina" | "Diesel" | "Electric" | "Hibrid";
  cutieViteze?: "Manuala" | "Automata";
  motor?: string;
  putere?: number;
  caroserie?: "SUV" | "Sedan" | "Hatchback" | "Break" | "Touring" | "Combi";
  culoare?: string;
  nrUsi?: number;
  tractiune?: "FWD" | "RWD" | "AWD";
  inspectieTehnica?: string;
  dotari?: string[];
  evaluareTehnica?: string;
  disponibil?: "Disponibil" | "Rezervat" | "Vandut";
  galerie?: string[];
}

export const masini: Masina[] = [
  {
    "_id": "0165820a-0ea1-4442-a4e8-483e6af91ee7",
    "slug": "ford-focus-2012",
    "marca": "FORD ",
    "model": "FOCUS",
    "an": 2012,
    "kilometraj": 210000,
    "pret": 4399,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "1.6 PRETABIL GPL",
    "putere": 116,
    "caroserie": "Combi",
    "culoare": "GRI",
    "nrUsi": 5,
    "tractiune": "FWD",
    "inspectieTehnica": "NEINMATRICULAT",
    "dotari": [
      "MODEL TREND"
    ],
    "evaluareTehnica": "Această mașină a trecut prin verificarea noastră tehnică și este complet pregătită de drum. Te poți urca la volan cu încredere — fără reparații ascunse, fără surprize. Doar formalitățile de înmatriculare te mai despart de prima ta cursă",
    "disponibil": "Disponibil",
    "galerie": [
      "/images/masini/ford-focus-2012/01.jpg",
      "/images/masini/ford-focus-2012/02.jpg",
      "/images/masini/ford-focus-2012/03.jpg",
      "/images/masini/ford-focus-2012/04.jpg",
      "/images/masini/ford-focus-2012/05.jpg"
    ]
  },
  {
    "_id": "fe57e922-c8d8-4657-8f1f-4b4ab98861c6",
    "slug": "bmw-320d-mpacket-2006",
    "marca": "BMW 320D",
    "model": "MPACKET",
    "an": 2006,
    "pret": 5399,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0 TDI",
    "caroserie": "Hatchback",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/bmw-320d-mpacket-2006/01.jpg"
    ]
  },
  {
    "_id": "aeb998d7-52e9-411b-8472-44cc16d43fb3",
    "slug": "vw-passat-highline-2009",
    "marca": "Opel",
    "model": "Zafira",
    "an": 2009,
    "pret": 4199,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "1,8",
    "putere": 140,
    "caroserie": "Combi",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/zafira7locuri20091.8benzina.png"
    ]
  },
  {
    "_id": "d33fc642-c609-49b0-9714-7aa7010d0f66",
    "slug": "skoda-fabia-2009-portocaliu",
    "marca": "SKODA",
    "model": "FABIA",
    "an": 2009,
    "kilometraj": 210000,
    "pret": 3499,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "1.2HTP",
    "putere": 80,
    "caroserie": "Hatchback",
    "culoare": "PORTOCALIU",
    "nrUsi": 5,
    "tractiune": "FWD",
    "inspectieTehnica": "NEINMATRICULAT",
    "dotari": [
      "MODEL AMBIENTE"
    ],
    "evaluareTehnica": "Această mașină a trecut prin verificarea noastră tehnică și este complet pregătită de drum. Te poți urca la volan cu încredere — fără reparații ascunse, fără surprize. Doar formalitățile de înmatriculare te mai despart de prima ta cursă",
    "disponibil": "Disponibil",
    "galerie": [
      "/images/masini/skoda-fabia-2009-portocaliu/01.jpg",
      "/images/masini/skoda-fabia-2009-portocaliu/02.jpg",
      "/images/masini/skoda-fabia-2009-portocaliu/03.jpg",
      "/images/masini/skoda-fabia-2009-portocaliu/04.jpg",
      "/images/masini/skoda-fabia-2009-portocaliu/05.jpg",
      "/images/masini/skoda-fabia-2009-portocaliu/06.jpg"
    ]
  },
  {
    "_id": "99a0dc79-e6ce-4fae-913c-06687b37bf65",
    "slug": "bmw-520d-2005",
    "marca": "BMW",
    "model": "520D",
    "an": 2005,
    "kilometraj": 309000,
    "pret": 5799,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "M47",
    "putere": 163,
    "caroserie": "Touring",
    "culoare": "ALBASTRU",
    "nrUsi": 5,
    "tractiune": "RWD",
    "inspectieTehnica": "NEINMATRICULAT",
    "dotari": [
      "NAVI XENON PDC PIELE"
    ],
    "evaluareTehnica": "Această mașină a trecut prin verificarea noastră tehnică și este complet pregătită de drum. Te poți urca la volan cu încredere — fără reparații ascunse, fără surprize. Doar formalitățile de înmatriculare te mai despart de prima ta cursă",
    "disponibil": "Disponibil",
    "galerie": [
      "/images/masini/bmw-520d-2005/1.jpg",
      "/images/masini/bmw-520d-2005/2.jpg",
      "/images/masini/bmw-520d-2005/3.jpg",
      "/images/masini/bmw-520d-2005/4.jpg",
      "/images/masini/bmw-520d-2005/5.jpg"
    ]
  },
  {
    "_id": "4ede9d12-f048-4919-8f46-2923f7abb083",
    "slug": "vw-golf-5-2006",
    "marca": "VW",
    "model": "GOLF 5",
    "an": 2006,
    "kilometraj": 210000,
    "pret": 2999,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "1.6 FSI",
    "putere": 116,
    "caroserie": "Hatchback",
    "culoare": "ALBASTRU",
    "nrUsi": 5,
    "tractiune": "FWD",
    "inspectieTehnica": "NEINMATRICULAT",
    "dotari": [
      "MODEL GOAL"
    ],
    "evaluareTehnica": "Această mașină a trecut prin verificarea noastră tehnică și este complet pregătită de drum. Te poți urca la volan cu încredere — fără reparații ascunse, fără surprize. Doar formalitățile de înmatriculare te mai despart de prima ta cursă",
    "disponibil": "Disponibil",
    "galerie": [
      "/images/masini/vw-golf-5-2006/01.jpg",
      "/images/masini/vw-golf-5-2006/02.jpg",
      "/images/masini/vw-golf-5-2006/03.jpg",
      "/images/masini/vw-golf-5-2006/04.jpg",
      "/images/masini/vw-golf-5-2006/05.jpg",
      "/images/masini/vw-golf-5-2006/06.jpg",
      "/images/masini/vw-golf-5-2006/07.jpg"
    ]
  },
  {
    "_id": "3a0b82e7-6389-40ae-b8f7-fd4a7a1c8dd6",
    "slug": "opel-astra-2012",
    "marca": "OPEL ",
    "model": "ASTRA ",
    "an": 2012,
    "pret": 3700,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "caroserie": "Sedan",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/opel-astra-2012/01.jpg"
    ]
  },
  {
    "_id": "f4c248f4-8aae-47ea-9492-b984c05bfcc9",
    "slug": "skoda-fabia-2009 (x2)",
    "marca": "SKODA ",
    "model": "FABIA",
    "an": 2009,
    "pret": 2699,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "1.2",
    "putere": 70,
    "caroserie": "Sedan",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/skoda-fabia-2009 (x2)/01.jpg"
    ]
  },
  {
    "_id": "2746a5a8-20d3-4b35-8be5-a1effe407ffd",
    "slug": "opel-astra-h-2006",
    "marca": "OPEL ",
    "model": "ASTRA H",
    "an": 2006,
    "pret": 2500,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "1.6",
    "caroserie": "Sedan",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/opel-astra-h-2006/01.jpg"
    ]
  },
  {
    "_id": "eadea212-6744-4ae5-9774-b7d14415c5d5",
    "slug": "bmw-320d-m47",
    "marca": "BMW 320D",
    "model": "M47",
    "an": 2006,
    "pret": 5999,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0",
    "putere": 163,
    "caroserie": "Hatchback",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/bmw-320d-m47/01.jpg"
    ]
  },
  {
    "_id": "f29421b7-044e-4af1-b8e5-c8862a221c04",
    "slug": "vw-passat-2008",
    "marca": "VW ",
    "model": "Passat",
    "an": 2008,
    "pret": 4400,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0 TDI",
    "caroserie": "Sedan",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/vw-passat-2008/01.jpg"
    ]
  },
  {
    "_id": "fe57e922-c8d8-4657-8f1f-4b4ab98861c6",
    "slug": "bmw-320d-mpacket-2006",
    "marca": "BMW 320D",
    "model": "MPACKET",
    "an": 2006,
    "pret": 5399,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0 TDI",
    "caroserie": "Hatchback",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/bmw-320d-mpacket-2006/01.jpg"
    ]
  },
  {
    "_id": "f8c06df3-4152-4231-ba63-d74ac4bed719",
    "slug": "bmw-320d-m47-2006",
    "marca": "BMW",
    "model": "320D M47",
    "an": 2006,
    "pret": 6299,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0",
    "putere": 163,
    "caroserie": "Hatchback",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/bmw-320d-m47-2006/01.jpg"
    ]
  },
  {
    "_id": "aeb998d7-52e9-411b-8472-44cc16d43fb3",
    "slug": "vw-passat-highline-2010",
    "marca": "VW PASSAT",
    "model": "HIGHLINE",
    "an": 2010,
    "pret": 4799,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0 TDI",
    "putere": 140,
    "caroserie": "Hatchback",
    "disponibil": "Disponibil",
    "galerie": [
      "/images/masini/vw-passat-highline-2010/01.jpg"
    ]
  },
  {
    "_id": "136e178b-a41b-4b47-98f5-4e3e759bd062",
    "slug": "skoda-fabia-2009",
    "marca": "Skoda ",
    "model": "Fabia",
    "an": 2009,
    "pret": 2699,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "1.2",
    "putere": 70,
    "caroserie": "Sedan",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/skoda-fabia-2009/01.jpg"
    ]
  },
  {
    "_id": "2f8950c8-eb96-45d0-b004-2a3918e34622",
    "slug": "bmw-e90-2011",
    "marca": "BMW",
    "model": "E90",
    "an": 2011,
    "pret": 5499,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "2.0L",
    "putere": 163,
    "caroserie": "Hatchback",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/bmw-e90-2011/01.jpg"
    ]
  },
  {
    "_id": "f3200ae4-fa09-441f-9615-51ed9502d1e4",
    "slug": "vw-passat-highline",
    "marca": "VW PASSAT",
    "model": "HIGHLINE",
    "an": 2008,
    "pret": 4499,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0 TDI",
    "putere": 140,
    "caroserie": "Hatchback",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/vw-passat-highline/01.jpg"
    ]
  },
  {
    "_id": "9fec058c-3a26-4fa2-b3ab-0c5c13fc4a59",
    "slug": "bmw-320d-2006",
    "marca": "BMW",
    "model": "320D ",
    "an": 2006,
    "pret": 5799,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0",
    "putere": 163,
    "caroserie": "Hatchback",
    "culoare": "Gri",
    "nrUsi": 4,
    "tractiune": "FWD",
    "inspectieTehnica": "-",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/bmw-320d-2006/01.jpg"
    ]
  }
];
