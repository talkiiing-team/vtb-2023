import Map from '@/widgets/map'
import { useRef } from 'react'
import { Map as LeafletMap } from 'leaflet'

export const MapPage = () => {
  const ref = useRef<LeafletMap>(null)

  return (
    <div className='grow flex flex-col'>
      <div className='flex grow [&>*]:grow flex-col'>
        <Map ref={ref} />
      </div>
      {/*<div className='absolute w-full h-full pointer-events-none'>*/}
      {/*  <p>Some text</p>*/}
      {/*</div>*/}
    </div>
  )
}
