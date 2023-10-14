import { FC, forwardRef, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Map as LeafletMap } from 'leaflet'
import { Position } from '@/pages/map/types.ts'
import { geoService } from '@/pages/map/services/geoService.ts'
import axios from 'axios'
import { GeoIP } from '@/widgets/map/types.ts'
import { Loader } from '@/components/Loader.tsx'

export const Map = forwardRef<LeafletMap, {}>(props => {
  const ref = useRef<LeafletMap>(null)
  const container = useRef<HTMLDivElement>(null)
  const [currentPos, setCurrentPos] = useState<Position | undefined>()
  const [allowed, setAllowed] = useState<boolean>(false)
  const [size, setSize] = useState({ height: 0, width: 0 })

  useEffect(() => {
    geoService
      .handlePermission()
      .then(data => {
        setAllowed(true)
        setCurrentPos({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        })
      })
      .catch(() => {
        axios.get<GeoIP>('http://ip-api.com/json/').then(res => {
          // setCurrentPos({ latitude: res.data.lat, longitude: res.data.lon })
        })
      })
  }, [])

  useEffect(() => {
    if (!currentPos || !ref?.current) return
    // ref.current.setView(
    //   { lat: currentPos.latitude, lng: currentPos.longitude },
    //   allowed ? 13 : 9,
    // )
  }, [currentPos, allowed])

  useEffect(() => {
    if (container.current) {
      const sizes = container.current.getBoundingClientRect()
      setSize({ height: sizes.height, width: sizes.width })
    }
  }, [container.current])

  return (
    <div className='w-full h-full' ref={container}>
      {currentPos ? (
        <MapContainer ref={ref} style={size} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            url='https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          />
        </MapContainer>
      ) : (
        <div className='h-full w-full flex flex-col items-center justify-center'>
          <Loader className='h-8 w-8' />
        </div>
      )}
    </div>
  )
})
