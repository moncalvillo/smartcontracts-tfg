import { Select } from 'antd';
import React, { useEffect } from 'react';

const { Option } = Select;



const Selector = ({label, options, setState}) => {

    return (
        <label htmlFor="selector">
            <h3>{label}</h3>
                <select
                    className="select"
                    id="selector"
                    onChange={(e) => setState(e.target.value)}>
                    <option key="all" value=""> All </option>
                    {options.map((option) => (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                    ))}
                </select>
        </label>
        
    );
};

export default Selector;