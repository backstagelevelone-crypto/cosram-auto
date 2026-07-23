export interface Car {
  id: string;
  slug?: string;
  name: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  monthlyPrice?: number;
  fuel?: string;
  transmission?: string;
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
  category?: string;
}
