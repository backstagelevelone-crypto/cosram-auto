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

  category?: 
    | "SUV"
    | "Sedan"
    | "Hatchback"
    | "Break"
    | "Touring"
    | "Combi";
}
