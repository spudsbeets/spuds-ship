import ReactDOM from 'react-dom/client'
import App from './App.js'

import { ShipProvider } from './objects/catsandships.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ShipProvider>
    <App />
    </ShipProvider>,
)
