import React from "react"

import TagType from "../../types/Tag";
import Color from "../../types/Color";

interface TagTokenProps {
    tag: TagType;
    text: string;
    color: Color;
}

const TagToken: React.FC<TagTokenProps> = ({tag, text, color}) => {
    return (
        <span
            style={{
                backgroundColor: color.background,
                color: color.textBorderColor
            }} 
            className="inline-block text-xs font-semibold rounded-full px-2 py-1 mr-2 mb-2">{text} = {tag.text.toUpperCase()}
        </span>
    );
};

export default TagToken;
