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
        <section className="bg-blue-200 px-8 py-2">
          <div className="flex justify-between items-center p-2">
            <h2 className="text-xl font-semibold">Tags</h2>
            <div className="flex gap-2">
              <input 
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Add a tag"
                className="tag-input"
                />
              <button onClick={handleAddTag} className="bg-green-500 p-2 p-y rounded-md">Add</button>
            </div>
          </div>
          <div className="text-left flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <Tag key={index} color={tag.color}>
                        {tag.text}
                    </Tag>
                ))}
          </div>
        </section>
    );
};

export default Tags;