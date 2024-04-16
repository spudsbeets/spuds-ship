import { createContext, ReactElement } from "react"

export type CatOrShip = {
    img: string,
    id: string,
    value?: number,
}

export type CatsAndShips = CatOrShip[]

const playerOptions: CatsAndShips = [
    {
        img: '/images/spud-ship-1.png',
        id: 'first-ship',
        value: 0,
    },
    
    {
        img: '/images/spud-ship-2.png',
        id: 'second-ship',
        value: 1,
    },
    
    {
        img: '/images/spud-ship-3.png',
        id: 'third-ship',
        value: 2,
    },
    
    {
        img: '/images/gunther-1.png',
        id: 'gunther-head',
        value: 3
    },
    
    {
        img: '/images/pharoah-1.png',
        id: 'pharoah-head',
        value: 4
    },
    
    {
        img: '/images/gunther-2.png',
        id: 'gunther-body',
        value: 5
    },
    
    {
        img: '/images/pharoah-2.png',
        id: 'pharoah-body',
        value: 6
    },
    
    {
        img: '/images/moon.png',
        id: 'moon',
    }
]

export type MarginsType = string[]

export type NumericalMarginsType = number[]

const shipRightBorder: number = 108

const shipLeftBorder: number = 8

export type UseShipContextType = { options: CatsAndShips, shipRightBorder: number, shipLeftBorder: number }

const initContext: UseShipContextType = { options: [], shipRightBorder: 0, shipLeftBorder: 0 }

const ShipContext = createContext<UseShipContextType>(initContext)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ShipProvider = ({ children }: ChildrenType): ReactElement => {

    return(
     <ShipContext.Provider value={{ options: playerOptions, shipRightBorder: shipRightBorder, shipLeftBorder: shipLeftBorder }}>
       {children}
     </ShipContext.Provider>
    )
}

export default ShipContext