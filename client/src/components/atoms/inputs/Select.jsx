import { Select } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const { Option } = Select;



const Selector = ({label, options, setState}) => {

    const {t} = useTranslation();

    return (
        <label htmlFor="selector">
            <h3>{label}</h3>
                <select
                    className="select"
                    id="selector"
                    onChange={(e) => setState(e.target.value)}>
                    <option key="all" value=""> {t("Common:all")} </option>
                    {options.map((option) => (
                    <option key={option.id} value={option.name}>
                        {t(`Common:${option.name}`)}
                    </option>
                    ))}
                </select>
        </label>
        
    );
};

export default Selector;