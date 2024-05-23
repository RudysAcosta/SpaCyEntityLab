import React from "react";

interface Color {
    background: string;
    textBorderColor: string;
}

interface TagsProps {
    color: Color;
    children: React.ReactNode;
}

const Tag: React.FC<TagsProps> = ({color, children}) => {
    return (
        <span style={{ backgroundColor: color.background, borderColor:color.textBorderColor, color:color.textBorderColor }} 
        className="flex items-center gap-1 uppercase bg-blue-100 text-blue-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
            <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            { children }
        </span>
    );
};

export default Tag;