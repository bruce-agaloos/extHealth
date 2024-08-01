interface LocalStorage {
    extensionEnabled?: boolean;
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

interface ToggleProps {
    isOn: boolean;
    onChange: (newState: boolean) => void;
    
}

interface CatProps {
    isOn: boolean;
    onChange: (newCategoryState: boolean) => void;
    id: number;
}

export {
    LocalStorage,
    ToggleProps,
    CatProps
}