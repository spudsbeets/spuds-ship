import '../App.css'

type PropsType = {
   setIsStart: React.Dispatch<React.SetStateAction<boolean>>
}

const Opener = ({ setIsStart }: PropsType) => {
   
   return(
    <div id="opener">
    <div className="opener-images-div">
      <img className="opener-images" id="ship-1-opener" src="./src/images/zero.png" alt="ship-1"></img>
      <img className="opener-images" id="ship-2-opener" src="./src/images/one.png" alt="ship-2"></img>
      <img className="opener-images" id="ship-3-opener" src="./src/images/two.png" alt="ship-3"></img>
      <img className="opener-images" id="moon-opener" src="./src/images/seven.png" alt="moon"></img>
    </div>
    <div id="title-screen">
     <h1 id="title">Spud's Ship</h1>
     <h2 id="sub-title">a game by spud</h2>
     <button id="start-button" className="button" onClick={() => setIsStart(true)}>Start?</button>
    </div>
    </div>
   )
}

export default Opener