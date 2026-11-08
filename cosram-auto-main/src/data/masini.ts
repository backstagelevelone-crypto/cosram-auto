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
    "_id": "0165820a-0ea1-4442-a401-483e6af91e17",
    "slug": "Renaultmegane2012",
    "marca": "Renault",
    "model": "Megane",
    "an": 2012,
    "kilometraj": 268000,
    "pret": 5499,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "1.5",
    "putere": 116,
    "caroserie": "Combi",
    "culoare": "Alb",
    "nrUsi": 5,
    "tractiune": "FWD",
    "inspectieTehnica": "NEINMATRICULAT",
    "dotari": [
      "MODEL Bose"
    ],
    "evaluareTehnica": "Această mașină a trecut prin verificarea noastră tehnică și este complet pregătită de drum. Te poți urca la volan cu încredere — fără reparații ascunse, fără surprize. Doar formalitățile de înmatriculare te mai despart de prima ta cursă",
    "disponibil": "Disponibil",
    "galerie": [
      "/images/masini/Renaultmegane2012/1.png",
      "/images/masini/Renaultmegane2012/2.jpg",
      "/images/masini/Renaultmegane2012/3.jpg",
      "/images/masini/Renaultmegane2012/4.jpg",
      "/images/masini/Renaultmegane2012/5.jpg"
    ]
  },
  {
    "_id": "0165820a-0ea1-4442-a402-48786af91e21",
    "slug": "bmw318dblack",
    "marca": "BMW",
    "model": "318D",
    "an": 2007,
    "kilometraj": 357000,
    "pret": 6499,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0",
    "putere": 122,
    "caroserie": "Combi",
    "culoare": "NEGRU",
    "nrUsi": 5,
    "tractiune": "FWD",
    "inspectieTehnica": "NEINMATRICULAT",
    "dotari": [
      "MODEL M"
    ],
    "evaluareTehnica": "TUV 2 ANIAceastă mașină a trecut prin verificarea noastră tehnică și este complet pregătită de drum. Te poți urca la volan cu încredere — fără reparații ascunse, fără surprize. Doar formalitățile de înmatriculare te mai despart de prima ta cursă",
    "disponibil": "Disponibil",
    "galerie": [
      "/images/masini/bmw318dblacknavi/1.jpg",
      "/images/masini/bmw318dblacknavi/2.jpg",
      "/images/masini/bmw318dblacknavi/3.jpg",
      "/images/masini/bmw318dblacknavi/4.jpg",
      "/images/masini/bmw318dblacknavi/5.jpg",
      "/images/masini/bmw318dblacknavi/6.jpg"
    ]
  },
  {
    "_id": "0165820a-0ea1-4442-a402-483e6af91e21",
    "slug": "passatb72.0tdi2013",
    "marca": "Volkswagen",
    "model": "Passat",
    "an": 2013,
    "kilometraj": 227000,
    "pret": 6999,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0",
    "putere": 140,
    "caroserie": "Combi",
    "culoare": "GRI",
    "nrUsi": 5,
    "tractiune": "FWD",
    "inspectieTehnica": "NEINMATRICULAT",
    "dotari": [
      "MODEL Highline"
    ],
    "evaluareTehnica": "Această mașină a trecut prin verificarea noastră tehnică și este complet pregătită de drum. Te poți urca la volan cu încredere — fără reparații ascunse, fără surprize. Doar formalitățile de înmatriculare te mai despart de prima ta cursă",
    "disponibil": "Disponibil",
    "galerie": [
      "/images/masini/passatb72.0tdi2013/1.png",
      "/images/masini/passatb72.0tdi2013/2.jpg",
      "/images/masini/passatb72.0tdi2013/3.jpg",
      "/images/masini/passatb72.0tdi2013/4.jpg"
    ]
  },
  {
    "_id": "0165820a-0ea1-4442-a403-483e6af91ee7",
    "slug": "ford-focus-2012",
    "marca": "FORD",
    "model": "FOCUS",
    "an": 2012,
    "kilometraj": 224000,
    "pret": 3499,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "1.6 PRETABIL GPL",
    "putere": 116,
    "caroserie": "Combi",
    "culoare": "GRI",
    "nrUsi": 5,
    "tractiune": "FWD",
    "inspectieTehnica": "RAR EFECTUAT",
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
    "_id": "fe57e922-c8d8-4657-8f04-4b4ab98861c6",
    "slug": "bmw-320d-mpacket-2006",
    "marca": "BMW",
    "model": "320D MPACKET",
    "an": 2006,
    "pret": 4999,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0 TDI",
    "caroserie": "Hatchback",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/bmw-320d-mpacket-2006/01.jpg",
      "/images/masini/bmw-320d-mpacket-2006/02.jpg",
      "/images/masini/bmw-320d-mpacket-2006/03.jpg",
      "/images/masini/bmw-320d-mpacket-2006/04.jpg",
      "/images/masini/bmw-320d-mpacket-2006/06.jpg"
    ]
  },
  {
    "_id": "aeb998d7-52e9-411b-8404-44cc16d43fb3",
    "slug": "Audi-A4-B7-Avant",
    "marca": "Audi",
    "model": "A4",
    "an": 2006,
    "kilometraj": 330000,
    "pret": 2999,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "2.0",
    "putere": 140,
    "caroserie": "Combi",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/audia4b7/89.png",
      "/images/masini/audia4b7/a42.jpeg",
      "/images/masini/audia4b7/a43.jpeg",
      "/images/masini/audia4b7/a44.jpeg",
      "/images/masini/audia4b7/a46.jpeg"
    ]
  },
  {
    "_id": "aeb998d7-52e9-411b-8405-44cc16d43fc4",
    "slug": "opel-zafira-2009",
    "marca": "Opel",
    "model": "Zafira",
    "an": 2009,
    "pret": 4199,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "1.8",
    "putere": 140,
    "caroserie": "Combi",
    "disponibil": "Vandut",
    "galerie": [
      "/images/masini/zafira7locuri20091.8benzina.png"
    ]
  },
  {
    "_id": "d33fc642-c609-49b0-9706-7aa7010d0f66",
    "slug": "skoda-fabia-2009-portocaliu",
    "marca": "SKODA",
    "model": "FABIA",
    "an": 2009,
    "kilometraj": 216000,
    "pret": 3499,
    "combustibil": "Benzina",
    "cutieViteze": "Manuala",
    "motor": "1.2HTP",
    "putere": 80,
    "caroserie": "Hatchback",
    "culoare": "PORTOCALIU",
    "nrUsi": 5,
    "tractiune": "FWD",
    "inspectieTehnica": "RAR EFECTUAT",
    "dotari": [
      "MODEL AMBIENTE", "Climatizare automată", "Jante aliaj ușor 15", "Cruise control", "Senzori parcare față și spate", "Scaune față încălzite", "Faruri ceață cu funcție cornering", "Sistem audio și radio", "Geamuri electrice față și spate", "ESP", "ABS și multiple airbaguri (frontale, laterale, cortină, genunchi)"
    ],
    "evaluareTehnica": "Această mașină a trecut prin verificarea noastră tehnică și este complet pregătită de drum. Te poți urca la volan cu încredere — fără reparații ascunse, fără surprize. Doar formalitățile de înmatriculare te mai despart de prima ta cursă",
    "disponibil": "Vandut",
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
    "_id": "99a0dc79-e6ce-4fae-9107-06687b37bf65",
    "slug": "bmw520dm47",
    "marca": "BMW",
    "model": "520D",
    "an": 2006,
    "kilometraj": 309000,
    "pret": 5999,
    "combustibil": "Diesel",
    "cutieViteze": "Manuala",
    "motor": "M47",
    "putere": 163,
    "caroserie": "Touring",
    "culoare": "ALBASTRU",
    "nrUsi": 5,
    "tractiune": "RWD",
    "inspectieTehnica": "RAR EFECTUAT",
    "disponibil": "Disponibil",
    "galerie": []
  }
];
