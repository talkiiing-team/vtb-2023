export type GeoIP = {
  query: string
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
}

export type OpenHours = Record<
  'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'break',
  { from: string; to: number }
>

export type Bank = {
  distance: number
  uuid: string
  sale_point_name: string
  address: string
  open_hours: OpenHours
  is_opened: boolean
  rko: boolean
  open_hours_individual: OpenHours
  office_type: string
  sale_point_code: string
  sale_point_format: string
  suo_available: string
  has_ramp: string
  point: {
    lat: number
    lng: number
  }
  metro_station: string
  kep: false
  my_branch: false
  services: string[]
}
