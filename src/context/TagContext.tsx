import React, {createContext, useContext, useState, ReactNode} from "react";
import TagContextType from "../types/TagContextType";
import TagType from "../types/Tag";

const TagContext = createContext<TagContextType | undefined>(undefined)

export const TagProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTag, setSelectedTag] = useState<TagType | null>(null);

    return (
        <TagContext.Provider value={{ selectedTag, setSelectedTag }}>
            {children}
        </TagContext.Provider>
    );
};

export const useTagContext = (): TagContextType => {
    const context = useContext(TagContext);
    if (!context) {
        throw new Error('useTagContext must be used within a TagProvider');
    }
    return context;
};