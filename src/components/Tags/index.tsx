import React, { ChangeEvent, useState } from "react";
import Tag from "./Tag";

interface Tag {
    text: string,
    color: string
}

const predefinedColors: string[] = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#A833FF',
    '#33FFF4', '#FFD433', '#FF3380', '#33FFB8', '#8D33FF',
    '#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#A833FF',
    '#33FFF4', '#FFD433', '#FF3380', '#33FFB8', '#8D33FF'
];

const Tags: React.FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [text, setText] = useState<string>('');
    const [availableColors, setAvailableColors] = useState<string[]>([...predefinedColors]);

    
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleAddTag = () => {
        if (text.trim() !== '' && availableColors.length > 0 ) {
            const colorIndex = Math.floor(Math.random() * availableColors.length);
            const selectColor = availableColors[colorIndex];
            const tag: Tag = {text: text.trim(), color: selectColor};

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
                    <Tag key={index} color={tag.color}>{tag.text}</Tag>
                ))}
          </div>
        </section>
    );
};

export default Tags;