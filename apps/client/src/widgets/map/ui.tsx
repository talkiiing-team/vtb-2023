import { FC } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

export const Map: FC = () => {
  return (
    <div className="w-full h-full">
      {/* <MapContainer
        className="w-full h-60"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer> */}
    </div>
  )
}
