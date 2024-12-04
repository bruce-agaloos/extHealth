import React, { useState, useEffect } from 'react';
import FactRadio from './../toggles/factRadio';
import Modal from './../modal/modalWarning';
import { getFactCheckMode } from './../../../utils/pop_up_storage/storage';

interface factModeData {
    factCheckMode: string;
}

const FactCheckMode: React.FC = () => {
    const [selectedMode, setSelectedMode] = useState<string>('offline');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [pendingMode, setPendingMode] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the initial mode from storage
        getFactCheckMode().then((result) => {
            const mode = result as factModeData;
            console.log('Retrieved mode from storage:', mode);
            if (mode.factCheckMode) {
                setSelectedMode(mode.factCheckMode);
            }
        }).catch((error) => {
            console.error('Error retrieving mode from storage:', error);
        });
    }, []);

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = event.target.value;
        if (newMode === 'google') {
            setPendingMode(newMode);
            setShowModal(true);
        } else {
            setSelectedMode(newMode);
            sendMessageToBackground(newMode);
        }
    };

    const sendMessageToBackground = (mode: string) => {
        // Send a message to the background script
        chrome.runtime.sendMessage({ mode }, (response) => {
            console.log('Background script response:', response);
        });
    };

    const handleConfirm = () => {
        if (pendingMode) {
            setSelectedMode(pendingMode);
            sendMessageToBackground(pendingMode);
        }
        setShowModal(false);
        setPendingMode(null);
    };

    const handleCancel = () => {
        setShowModal(false);
        setPendingMode(null);
    };

    return (
        <div>
            <FactRadio
                label="Offline Mode"
                value="offline"
                checked={selectedMode === 'offline'}
                onChange={handleModeChange}
            />
            <FactRadio
                label="Book Based Mode"
                value="onlineDatabase"
                checked={selectedMode === 'onlineDatabase'}
                onChange={handleModeChange}
            />
            <FactRadio
                label="Google Mode"
                value="google"
                checked={selectedMode === 'google'}
                onChange={handleModeChange}
            />
            {/* <br /><br /> */}
            <a
                className='searchLink'
                href='search.html'
                target='_blank'
            >

                <img className="help" src="Help.png" alt="Help Icon" />
                <div className="helpText">Search Past Fact Check Queries</div>

            </a>
            {showModal && (
                <Modal
                    title="Warning"
                    message="Google mode has better diversity, but some content may be unevaluated. Proceed?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default FactCheckMode;