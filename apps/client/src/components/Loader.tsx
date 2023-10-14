import { FC, HTMLAttributes } from 'react'
import { CubeTransparentIcon } from '@heroicons/react/24/outline'

export const Loader: FC<HTMLAttributes<SVGSVGElement>> = props => {
  return (
    <CubeTransparentIcon
      {...props}
      className={`animate-spin ${props.className}`}
    />
  )
}
