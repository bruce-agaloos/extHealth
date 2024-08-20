import React, { useEffect, useState } from 'react';
import HealthTips from './healthTips';
import "./css/healthTips.css";
import {getAllHealthTips} from '../../../utils/storage';

// placeholder for local storage(change)
const HealthTipsSection: React.FC = () => {
    const [healthTipsData, setHealthTipsData] = useState<any[]>([]);

    useEffect(() => {
        const fetchHealthTips = async () => {
            const data = await getAllHealthTips();
            setHealthTipsData(data);
        };

        fetchHealthTips();
    }, []);

    return (
        <div>
            {healthTipsData.map((tip, idx) => (
                <HealthTips key={idx} idx={idx} health_tips={tip} />
            ))}
        </div>
    );
}

export default HealthTipsSection;