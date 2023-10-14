import ArrowIcon from '@/shared/assets/icons/arrow-icon.svg'

export const Home = () => {
  return (
    <article className="h-full">
      <header className="">search</header>
      <main className="grow flex-1">content</main>
      <footer className="flex flex-col">
        <p>Use this</p>
        <div>
          <ArrowIcon />
        </div>
      </footer>
    </article>
  )
}
