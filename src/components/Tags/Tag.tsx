import React from "react";
import Color from "../../types/Color";
import { useTagContext } from "../../context/TagContext";
import TagType from "../../types/Tag";


interface TagsProps {
    color: Color;
    children: React.ReactNode;
}

const Tag: React.FC<TagsProps> = ({color, children}) => {
    const { setSelectedTag } = useTagContext();

    const handleChange = () => {
        const tag: TagType = {
            color: color,
            text: children as string,
        };

        setSelectedTag(tag);
    };

    return (
        <span style={{ backgroundColor: color.background, borderColor:color.textBorderColor, color:color.textBorderColor }} 
        className="flex items-center gap-1 uppercase  text-md font-medium me-2 px-2.5 py-0.5 rounded border ">
            <input
            onChange={handleChange} 
            id="bordered-radio-1" 
            type="radio" 
            name="bordered-radio" 
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            { children }
        </span>
    );
};

export default Tag;