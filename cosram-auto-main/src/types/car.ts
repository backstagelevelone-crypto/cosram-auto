export interface Car {
  id: string;
  slug?: string;
  name: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  monthlyPrice?: number;
  fuel?: "Diesel" | "Benzina" | "Hybrid" | "Electric";
  transmission?: "Manuala" | "Automata";
  km?: number;
  engine?: string;
  power?: number;
  color?: string;
  doors?: number;
  drive?: string;
  itp?: string;
  status: "disponibil" | "rezervat" | "vandut";
  images: string[];
  features: string[];
  description?: string;
  category?: "SUV" | "Sedan" | "Hatchback" | "Break" | "Touring" | "Combi";
}


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
