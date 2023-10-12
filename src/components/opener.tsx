import '../App.css'

type PropsType = {
   setIsStart: React.Dispatch<React.SetStateAction<boolean>>
}

const Opener = ({ setIsStart }: PropsType) => {
   
   return(
    <div id="title-screen">
     <h1 id="title">Spud's Ship</h1>
     <h2 id="sub-title">a game by spud</h2>
     <button id="start-button" onClick={() => setIsStart(true)}>Start?</button>
    </div>
   )
}

export default Opener