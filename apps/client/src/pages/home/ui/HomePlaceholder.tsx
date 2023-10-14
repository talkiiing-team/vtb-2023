import ArrowIcon from '@/shared/assets/icons/arrow-icon.svg?react'
import LogoVTB from '@/shared/assets/icons/logo-vtb.png'

export const HomePlaceholder = () => {
  return (
    <article className='grow flex flex-col justify-between opacity-50'>
      <section>
        <div className='flex flex-col gap-4 justify-center items-center'>
          <div className='w-8 h-8 rotate-180'>
            <ArrowIcon />
          </div>
          <p className='text-center'>Ваш запрос</p>
        </div>
      </section>
      <section className='mx-auto'>
        <img src={LogoVTB} alt='logo vtb' />
      </section>
      <section className='flex justify-between'>
        <div className='flex flex-col gap-4 justify-center items-center'>
          <p className='text-center'>
            Ближайшие
            <br /> банкоматы
          </p>
          <div className='w-8 h-8'>
            <ArrowIcon />
          </div>
        </div>
        <div className='flex flex-col gap-4 justify-center items-center'>
          <p className='text-center'>
            Карта <br /> банков
          </p>
          <div className='w-8 h-8'>
            <ArrowIcon />
          </div>
        </div>
      </section>
    </article>
  )
}
