interface LocalStorage {
    extensionEnabled?: boolean;
}

interface ToggleProps {
    isOn: boolean;
    onChange: (newState: boolean) => void;
}

export {
    LocalStorage,
    ToggleProps,
}