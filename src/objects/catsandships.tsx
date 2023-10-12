import { createContext, ReactElement } from "react"

export type CatOrShip = {
    img: string,
    id: string,
    value?: number,
}

export type CatsAndShips = CatOrShip[]

const playerOptions: CatsAndShips = [
    {
        img: './src/images/zero.png',
        id: 'first-ship',
        value: 0,
    },
    
    {
        img: './src/images/one.png',
        id: 'second-ship',
        value: 1,
    },
    
    {
        img: './src/images/two.png',
        id: 'third-ship',
        value: 2,
    },
    
    {
        img: './src/images/three.png',
        id: 'gunther-head',
        value: 3
    },
    
    {
        img: './src/images/four.png',
        id: 'pharoah-head',
        value: 4
    },
    
    {
        img: './src/images/five.png',
        id: 'gunther-body',
        value: 5
    },
    
    {
        img: './src/images/six.png',
        id: 'pharoah-body',
        value: 6
    },
    
    {
        img: './src/images/seven.png',
        id: 'moon',
    }
]

export type MarginsType = string[]

type NumericalMarginsType = number[]

const shipRightBorder = 108

const shipLeftBorder = 8

const marginsArr: MarginsType = ["-110px", "15px", "145px", "270px", "385px"]

const catMarginsArrVert: MarginsType = ["-235px", "-110px", "20px", "145px", "260px"]

const catMarginsArrHor: NumericalMarginsType = [300, 520, 740, 960, 1180, 1400, 1620, 1840, 2060, 2280, 2500, 2720, 2940, 3160, 3380, 3600, 3820, 4040, 4260, 4480, 4700, 4920, 5140, 5360, 5580, 5800, 6020, 6240, 6460, 6680, 6900, 7120, 7340, 7560, 7780]

export type UseShipContextType = { options: CatsAndShips, shipMarginsArr: MarginsType, catVertMargArr: MarginsType, catHorMargArr: NumericalMarginsType, shipRightBorder: number, shipLeftBorder: number }

const initContext: UseShipContextType = { options: [], shipMarginsArr: [], catVertMargArr: [], catHorMargArr: [], shipRightBorder: 0, shipLeftBorder: 0 }

const ShipContext = createContext<UseShipContextType>(initContext)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ShipProvider = ({ children }: ChildrenType): ReactElement => {

    return(
     <ShipContext.Provider value={{ options: playerOptions, shipMarginsArr: marginsArr, catVertMargArr: catMarginsArrVert, catHorMargArr: catMarginsArrHor, shipRightBorder: shipRightBorder, shipLeftBorder: shipLeftBorder }}>
       {children}
     </ShipContext.Provider>
    )
}

export default ShipContext