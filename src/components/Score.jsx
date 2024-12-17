import {useAppContext} from "../Context";

const Score = () => {
    const {score} = useAppContext();
    return (
        <div style={{position:"absolute", fontSize:40, zIndex: 10, color:"white", background:"blue"}}>{score}</div>
    )
}

export default Score;