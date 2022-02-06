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

