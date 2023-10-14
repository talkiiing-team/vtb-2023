import Map from '@/widgets/map'
import { useRef } from 'react'
import { Map as LeafletMap } from 'leaflet'

export const MapPage = () => {
  const ref = useRef<LeafletMap>(null)

  return (
    <div className='w-full h-full relative grow'>
      <div className='w-full h-full min-h-full'>
        <Map ref={ref} />
      </div>
      {/*<div className='absolute w-full h-full pointer-events-none'>*/}
      {/*  <p>Some text</p>*/}
      {/*</div>*/}
    </div>
  )
}
