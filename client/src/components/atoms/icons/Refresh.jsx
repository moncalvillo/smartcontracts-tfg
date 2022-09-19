import { useEffect, useState } from 'react';
import {GrRefresh} from 'react-icons/gr';

const Refresh = ({reload, setReload}) => {


    const [show, setShow] = useState(true);

    const handle = () => {
        setShow(false);
        setReload(!reload);
        setTimeout(()=>{setShow(true)}, 10000);
    };

    return (   
        <div className="refresh" onClick={handle}>
            {show && <GrRefresh size={20} />}
        </div>
    );
}

export default Refresh;