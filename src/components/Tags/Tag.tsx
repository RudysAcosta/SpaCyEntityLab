import React from "react";

interface TagsProps {
    color: string;
    children: React.ReactNode;
}

const Tag: React.FC<TagsProps> = ({color, children}) => {
    return (
        <span 
            style={{ backgroundColor:color }} 
            className="inline-block px-2 py-1 text-white bg-blue-600 rounded-md">{children}</span>
    );
};

export default Tag;