import { useState, useContext, createContext } from 'react';
import ConfirmModal from 'lib/components/Modals/ConfirmModal';

const initialState = {
    confirm: () => {},
};

const ConfirmContext = createContext(initialState);

export const ConfirmProvider = ({ children }) => {
    const [text, setText] = useState('Are you sure?');
    const [action, setAction] = useState(() => {});
    const [confirmOpen, setConfirmOpen] = useState(false);

    const confirm = (text = 'Are you sure?', action = () => {}) => {
        setText(text);
        setAction(() => action);
        setConfirmOpen(true);
    };

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}
            <ConfirmModal
                text={text}
                open={confirmOpen}
                onClickButtonYes={() => {
                    action();
                    setConfirmOpen(false);
                }}
                setOpen={setConfirmOpen}
            />
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => useContext(ConfirmContext);
