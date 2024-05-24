import React, { createContext, useContext, useState, ReactNode } from 'react';
import EntitiesType from '../types/EntitiesType';

interface TextAreaContextType {
    entities: EntitiesType | null;
    setEntities: (entities: EntitiesType | null) => void;
}

const TextAreaContext = createContext<TextAreaContextType | undefined>(undefined);

export const TextAreaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [entities, setEntities] = useState<EntitiesType | null>(null);

    return (
        <TextAreaContext.Provider value={{ entities, setEntities }}>
            {children}
        </TextAreaContext.Provider>
    );
};

export const useTextAreaContext = (): TextAreaContextType => {
    const context = useContext(TextAreaContext);
    if (!context) {
        throw new Error('useTextAreaContext must be used within a TextAreaProvider');
    }
    return context;
};
