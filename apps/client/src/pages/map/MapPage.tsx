import Map from '@/widgets/map'

export const MapPage = () => {
  return (
    <div className='grow flex flex-col'>
      <div className='flex grow [&>*]:grow flex-col'>
        <Map />
      </div>
      {/*<div className='absolute w-full h-full pointer-events-none'>*/}
      {/*  <p>Some text</p>*/}
      {/*</div>*/}
    </div>
  )
}
