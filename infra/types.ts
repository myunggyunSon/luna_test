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
  shipperAddress: string;
  receiverName: string;
  receiverAddress: string;
  freightName: string;
  weight: number;
  shipperLat: number;
  shipperLng: number;

}

export interface TruckOption {
  name: string;
  displayName: string;
}

// https://navermaps.github.io/maps.js/docs/global.html#PointerEvent
export interface NaverMapPointEvent {
  coord: {
    lat: number;
    lng: number;
  }
  point: {
    //
    x: number;
    y: number;
  }
  offset: {
    x: number;
    y: number;
  }
  pointerEvent: any
  overlay: any
}
