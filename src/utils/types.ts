interface LocalStorage {
    HealthTipsEnabled?: boolean;
    xAutoDetectEnabled?: boolean;
    id15Enabled?: boolean;
    id16Enabled?: boolean;
    id18Enabled?: boolean;
    id19Enabled?: boolean;
    id20Enabled?: boolean;
    id21Enabled?: boolean;
    id23Enabled?: boolean;
    id24Enabled?: boolean;
    id28Enabled?: boolean;
    id29Enabled?: boolean;
}

interface HealthTipsProps {
    isOn: boolean;
    onChange: (newHealthTipState: boolean) => void;
    
}

interface CatProps {
    isOn: boolean;
    onChange: (newCategoryState: boolean) => void;
    id: number;
}

interface xAutoDetectProps {
    isOn: boolean;
    onChange: (newState: boolean) => void;
}

export {
    LocalStorage,
    HealthTipsProps,
    CatProps,
    xAutoDetectProps
}