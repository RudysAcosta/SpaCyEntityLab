import React, { ChangeEvent, useState } from "react";
import Color from "../../types/Color";
import TagType from "../../types/Tag";
import Tag from "./Tag";


const predefinedColors: Color[] = [
    { background: "#FFCDD2", textBorderColor: "#B71C1C" },
    { background: "#F8BBD0", textBorderColor: "#880E4F" },
    { background: "#E1BEE7", textBorderColor: "#4A148C" },
    { background: "#D1C4E9", textBorderColor: "#311B92" },
    { background: "#C5CAE9", textBorderColor: "#1A237E" },
    { background: "#BBDEFB", textBorderColor: "#0D47A1" },
    { background: "#B3E5FC", textBorderColor: "#01579B" },
    { background: "#B2EBF2", textBorderColor: "#006064" },
    { background: "#B2DFDB", textBorderColor: "#004D40" },
    { background: "#C8E6C9", textBorderColor: "#1B5E20" }
];

const Tags: React.FC = () => {
    const [tags, setTags] = useState<TagType[]>([]);
    const [text, setText] = useState<string>('');
    const [availableColors, setAvailableColors] = useState<Color[]>([...predefinedColors]);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleAddTag = () => {
        if (text.trim() !== '' && availableColors.length > 0 ) {
            const colorIndex = Math.floor(Math.random() * availableColors.length);
            const selectColor = availableColors[colorIndex];
            const tag: TagType = {text: text.trim(), color: selectColor};

            //Remove color from predefinedcolors
            const newAvailableColors = [...availableColors]
            newAvailableColors.splice(colorIndex, 1)
            
            setTags([...tags, tag]);
            setAvailableColors(newAvailableColors)
            setText('');
        }
    }

    return (
      <div className="flex flex-col text-right">
        <div>
          <input 
            type="text"
            value={text} 
            onChange={handleTextChange}
            placeholder="Add a tag" 
            className="border border-gray-300 rounded px-2 py-1 mr-2" />
          <button 
            onClick={handleAddTag}
            className="bg-blue-500 text-white rounded px-4 py-1">Add</button>
        </div>
        <div className="flex flex-wrap items-center mb-4">

          {tags.map((tag, index) => (
            <Tag key={index} color={tag.color}>
              {tag.text}
            </Tag>
          ))}
        </div>
      </div>
    );
};

export default Tags;