import { getListedCars } from "@/lib/cars";
import Stoc from "@/components/sections/Stoc";

export default async function StocSection() {
  const cars = await getListedCars();
  return <Stoc cars={cars} />;
}
