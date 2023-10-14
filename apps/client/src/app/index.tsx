import { Routing } from '@/pages'
import { withProviders } from './providers'

import 'leaflet/dist/leaflet.css'
// import 'leaflet/dist/leaflet.js'

import './index.css'

const App = withProviders(() => <Routing />)
export default App
