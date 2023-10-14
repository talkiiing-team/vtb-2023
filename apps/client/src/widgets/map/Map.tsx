import { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { divIcon, Map as LeafletMap } from 'leaflet'
import { Position } from '@/pages/map/types.ts'
import { geoService } from '@/pages/map/services/geoService.ts'
import axios from 'axios'
import { Bank, GeoIP } from '@/widgets/map/types.ts'
import { Loader } from '@/components/Loader.tsx'
import { getMapPin } from '@/shared/ui/map-pin'

export const Map = () => {
  const ref = useRef<LeafletMap>(null)
  const container = useRef<HTMLDivElement>(null)
  const [currentPos, setCurrentPos] = useState<Position | undefined>()
  const [allowed, setAllowed] = useState<boolean>(false)
  const [banks, setBanks] = useState<Bank[]>([])

  useEffect(() => {
    setCurrentPos({
      latitude: 55.751244,
      longitude: 37.618423,
    })
    return
    geoService
      .handlePermission()
      .then(data => {
        setAllowed(true)
        console.log(data.coords)
        setCurrentPos({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        })
      })
      .catch(() => {
        axios.get<GeoIP>('http://ip-api.com/json/').then(res => {
          setCurrentPos({ latitude: res.data.lat, longitude: res.data.lon })
        })
      })
  }, [])

  useEffect(() => {
    if (currentPos && ref.current) {
      ref.current?.setView(
        {
          lat: currentPos.latitude,
          lng: currentPos.longitude,
        },
        allowed ? 13 : 11,
      )
      axios
        .get<Bank[]>('http://192.168.0.120:3000/v1/banks/nearest', {
          params: {
            lat: 55.751244,
            lng: 37.618423,
            dist: 0.03,
          },
        })
        .then(res => {
          setBanks(res.data)
        })
    }
  }, [currentPos, ref, allowed])

  return (
    <div className='flex grow' ref={container}>
      <MapContainer ref={ref} className='grow' center={[0, 0]}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          url='https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {banks.map(bank => {
          const pinIcon = divIcon({
            html: getMapPin(),
            iconAnchor: [24, 50],
          })
          return (
            <Marker position={[bank.latitude, bank.longitude]} icon={pinIcon} />
          )
        })}
      </MapContainer>
      {!currentPos && (
        <div className='h-full w-full flex flex-col items-center justify-center'>
          <Loader className='h-8 w-8' />
        </div>
      )}
    </div>
  )
}
