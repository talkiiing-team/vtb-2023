import { FC, useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { divIcon, Map as LeafletMap } from 'leaflet'
import { Position } from '@/pages/map/types.ts'
import { geoService } from '@/pages/map/services/geoService.ts'
import axios from 'axios'
import { Bank, GeoIP } from '@/widgets/map/types.ts'
import { Loader } from '@/components/Loader.tsx'
import { getMapPin } from '@/shared/ui/map-pin'
import { BankFilters } from '@/pages/map/components/Filters.tsx'

export const Map: FC<{ filter: BankFilters }> = ({ filter }) => {
  const ref = useRef<LeafletMap>(null)
  const container = useRef<HTMLDivElement>(null)
  const [currentPos, setCurrentPos] = useState<Position>()
  const [allowed, setAllowed] = useState<boolean>(false)
  const [banks, setBanks] = useState<Bank[]>([])

  useEffect(() => {
    // We're not in moscow, so just mock it
    setCurrentPos({
      latitude: 55.751244,
      longitude: 37.618423,
    })
    return
    // geoService
    //   .handlePermission()
    //   .then(data => {
    //     setAllowed(true)
    //     setCurrentPos({
    //       latitude: data.coords.latitude,
    //       longitude: data.coords.longitude,
    //     })
    //   })
    //   .catch(() => {
    //     axios.get<GeoIP>('http://ip-api.com/json/').then(res => {
    //       setCurrentPos({ latitude: res.data.lat, longitude: res.data.lon })
    //     })
    //   })
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
    }
  }, [currentPos, ref, allowed])

  useEffect(() => {
    if (!currentPos) return
    axios
      .get<Bank[]>('http://82.147.71.63:3000/v1/banks/nearest', {
        params: {
          lat: currentPos.latitude,
          lng: currentPos.longitude,
          dist: filter.distance ?? 0.03,
        },
      })
      .then(res => {
        setBanks(res.data)
      })
  }, [filter, currentPos])

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
            <Marker
              position={[bank.point.lat, bank.point.lng]}
              icon={pinIcon}
            />
          )
        })}
        {allowed && currentPos && (
          <Marker position={[currentPos.latitude, currentPos.longitude]} />
        )}
      </MapContainer>
      {!currentPos && (
        <div className='h-full w-full flex flex-col items-center justify-center'>
          <Loader className='h-8 w-8' />
        </div>
      )}
    </div>
  )
}
