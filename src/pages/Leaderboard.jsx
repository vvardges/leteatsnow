import {useGetDimensions} from '../hooks/useGetDimensins';
import {Link} from 'react-router';

const Results = () => {
    const {width, height} = useGetDimensions();
    return (
        <div style={{position: 'relative', width, margin: '0 auto', height}}>
            <div style={{background: 'blue', height: '100%', fontSize: 30}}>
            <ul>
                <li>Bob</li>
                <li>John</li>
                <li>Alice</li>
                <li>Styop</li>
                <li>Hop</li>
            </ul>
                <Link to="/">
                    Home
                </Link>
            </div>
        </div>
    );
};

export default Results;