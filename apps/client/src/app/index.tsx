import { Routing } from '@/pages'
import './index.css'
import { withProviders } from './providers'

const App = withProviders(() => <Routing />)
export default App
