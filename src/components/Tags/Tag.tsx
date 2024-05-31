import React from "react";
import Color from "../../types/Color";
import { useTagContext } from "../../context/TagContext";
import TagType from "../../types/Tag";

interface TagsProps {
    color: Color;
    children: React.ReactNode;
}

const Tag: React.FC<TagsProps> = ({color, children}) => {

    const { selectedTag, setSelectedTag} = useTagContext();    

    const handleChange = () => {
        const tag: TagType = {
            color: color,
            text: children as string,
        };

        setSelectedTag(tag);
    };

    const handleClick = () => {
        const tag: TagType = {
            color: color,
            text: children as string,
        };

        setSelectedTag(tag);
    }

    const isSelected = children == selectedTag?.text;

    return (
        <div className="mr-2 mb-2">
            <span 
                onClick={handleClick} 
                style={{ backgroundColor: color.background, color:color.textBorderColor }} 
                className={`inline-block bg-green-200 opacity-90 text-green-800 text-xs font-semibold rounded-full px-2 py-1 cursor-pointer ${isSelected ? 'selected-tag' : ''}`}>
            { children?.toString().toLocaleUpperCase() }
            </span>
        </div>
    );
};

export default Tag;