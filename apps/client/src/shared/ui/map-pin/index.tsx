import LogoIcon from '@/shared/assets/icons/logo-icon.svg?react'
import logo from '@/shared/assets/icons/logo-icon.svg?raw'

export const MapPin = () => {
  return (
    <div className='rounded-pin bg-primary w-12 h-12 flex justify-center align-middle p-2 -rotate-45'>
      <div className='rounded-full bg-white p-1 rotate-45'>
        <LogoIcon width={'100%'} height={'100%'} />
      </div>
    </div>
  )
}

export const mapPinEl = `
      <div class='rounded-full bg-white p-1 rotate-45'>
        ${logo}
      </div>
   `

export const getMapPin = () => {
  const mapPin = document.createElement('div')

  mapPin.className =
    'rounded-pin bg-primary w-12 h-12 flex justify-center align-middle p-2 -rotate-45'
  mapPin.innerHTML = mapPinEl

  return mapPin
}
