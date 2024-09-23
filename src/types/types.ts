export interface Root {
  result: Result;
  // error: any;
  // "x-uuid": string;
}

export interface Result {
  orders: Order[];
  page_data: PageData;
}

export interface Order {
  date_change: string;
  date: string;
  date_arrival: string;
  date_departure?: string;
  order_id: number;
  user_id: number;
  order_type: number;
  transaction: number;
  payable_status: number;
  ex_order_status: number;
  service_id: number;
  duration: number;
  doer_city_id: number;
  allowable_time: number;
  cancellation_time: number;
  reward: number;
  booker_number: string;
  arrival_number: string;
  departure_number: string;
  table: string;
  notes: string;
  location_address: string;
  destination_address: string;
  lang: string;
  allowable_subaddress: number;
  coef_subaddress: number;
  subaddress: any[];
  send_params: SendParams;
  passengers: Passenger[];
  passengers_number: number;
  additional_address: boolean;
  cancellation_time_without_penalty: string;
  destination_address_object: DestinationAddressObject;
  location_address_object: LocationAddressObject;
  car_data: CarData;
  currency: string;
  price: Price;
  additional_change_itinerary: number;
  additional_wait: number;
  fare_on_toll_road: number;
  additional_payment_info: any;
  meeting_point?: MeetingPoint;
  internal_number: string;
  viewers: string[];
  coordinator: Coordinator;
  additional_services: any[];
  flexible_tariff: boolean;
  uuid?: string;
  is_blocked_update: boolean;
  driver_data?: DriverData;
  is_fast_booking: boolean;
  pos: any;
  platform: number;
  ffp_number: any;
  flexible_tariff_agreement: boolean;
  children_amount: number;
  adults_amount: number;
  service_provider: ServiceProvider;
  cost_center?: string;
  number?: number;
  status: number;
  start_place: StartPlace;
  finish_place: FinishPlace;
  customer: Customer;
  start_place_id: string;
  finish_place_id: string;
}

export interface SendParams {
  send_client_voucher: boolean;
  send_admin_voucher: boolean;
  send_client_doc: boolean;
  send_admin_doc: boolean;
}

export interface Passenger {
  name: string;
  email: string;
  phone: string;
  company: any;
  client_id: number;
  company_id: any;
}

export interface DestinationAddressObject {
  address: string;
  geo_check: boolean;
  geo_data: GeoData;
}

export interface GeoData {
  name: string;
  types: any[];
  geometry: Geometry;
  place_id: string;
  formatted_address: string;
  address_components: any[];
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface LocationAddressObject {
  address: string;
  geo_check: boolean;
  geo_data: GeoData2;
}

export interface GeoData2 {
  name: string;
  types: any[];
  geometry: Geometry2;
  place_id: string;
  formatted_address: string;
  address_components: any[];
}

export interface Geometry2 {
  location: Location2;
  viewport: Viewport2;
}

export interface Location2 {
  lat: number;
  lng: number;
}

export interface Viewport2 {
  northeast: Northeast2;
  southwest: Southwest2;
}

export interface Northeast2 {
  lat: number;
  lng: number;
}

export interface Southwest2 {
  lat: number;
  lng: number;
}

export interface CarData {
  car_class_id: number;
  car_class: string;
  models: string;
  capacity: number;
  photo: string;
  deleted: boolean;
  description?: string;
}

export interface Price {
  price_id: number;
  price: number;
  price_subaddress: any;
}

export interface MeetingPoint {
  url: string;
  title: string;
  text: string;
}

export interface Coordinator {
  name: string;
  phone: string;
}

export interface DriverData {
  driver_name: any;
  driver_phone: string;
  driver_car: any;
  driver_rating: any;
  car_color: any;
}

export interface ServiceProvider {
  id: number;
  title: string;
  deleted: boolean;
}

export interface StartPlace {
  place_id: number;
  title: string;
  type: number;
  type_title: string;
  city_id: number;
  city: string;
  terminal_number: string;
  train_carriage_number: any;
}

export interface FinishPlace {
  place_id: number;
  title: string;
  type: number;
  type_title: string;
  city_id: number;
  city: string;
  terminal_number: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface PageData {
  page: number;
  items_on_page: number;
  total_items: number;
  page_count: number;
}
