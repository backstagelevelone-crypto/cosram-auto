export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  car?: string;
}

export const reviews: Review[] = [
  {
    name: "Gina Lupu",
    rating: 5,
    date: "12 Ian 2025",
    text: "M-am bucurat că am găsit niște oameni corecți, cinstiți, foarte pasionați de ceea ce fac și foarte prompți. Mulțumesc! Recomand din tot sufletul!",
    car: "Skoda Fabia 1.2 benzina",
  },
  {
    name: "Balaj Ianiko-Nicolas",
    rating: 5,
    date: "28 Feb 2025",
    text: "Toată stima pentru voi, sunteți serioși și de încredere! Am mașina de aproape 3 luni și, în afară de motorină, nu am băgat 1 leu în ea și nici nu pot spune că e ceva ce nu merge la ea. Mașina este impecabilă, exact cum mi-ați spus. Felicitări pentru transparența voastră! Toată stima și respectul meu!",
    car: "Golf 5 break 1.9",
  },
  {
    name: "Mihaela Ramona",
    rating: 5,
    date: "15 Mar 2025",
    text: "Mulțumesc frumos!!!! Recomand cu încredere 😘😘😘😘",
    car: "Volkswagen Polo 1.2",
  },
  {
    name: "Madalina Filipache",
    rating: 5,
    date: "2 Apr 2025",
    text: "Mulțumim frumos! Recomandăm din tot sufletul. Sunteți oameni minunați! 🥰🙏",
    car: "BMW 320D",
  },
  {
    name: "Bucur Georgian",
    rating: 5,
    date: "18 Apr 2025",
    text: "Oameni serioși! Mașini super bune!",
    car: "Volkswagen Passat Sportline",
  },
];
