import {useAppContext} from "../Context";

const Lives = () => {
    const {lives} = useAppContext();
    return (
        <div style={{position:"absolute", right:0, fontSize:40, zIndex: 10, color:"white", background:"blue"}}>{lives}</div>
    );
};

export default Lives;