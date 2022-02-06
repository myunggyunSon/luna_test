export type CarType = 'cargo' | 'labo' | 'container'

export interface Trucker {
  name: string;
  carNumber: string;
  workYears: number;
  phone: string;
  carType: CarType;
  age?: number;
  rate?: number;
  currentLat?: number;
  currentLng?: number;

}

export interface Freight {
  name: string;
  price: number;
  shipperName: string;
  freightName: string;
  weight: number;
  shipperLat: number;
  shipperLng: number;

}

