import React, { useState, useRef, useEffect } from 'react';
import { useTagContext } from '../../context/TagContext';

import TagType from '../../types/Tag';

interface Token {
  index: number;
  tag: TagType;
}

const TextArea: React.FC = () => {
  const { selectedTag } = useTagContext();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [text, setText] = useState<string>('');
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [textList, setTextList] = useState<string[]>([]);

  // Función para actualizar el contenido del div con tokens resaltados
  const updateContentWithHighlights = () => {
    if (contentRef.current) {
      let htmlContent = [...textList];
      tokens.forEach(token => {
        if (htmlContent[token.index]) {
            let element = contentRef.current?.querySelector(`#word-${token.index}`);
            if(element) {
                element.style.background = token.tag.color.background;
                element.style.color = token.tag.color.textBorderColor; 
                element.style.border = `1px solid ${token.tag.color.textBorderColor}`; 
                // element.classList.add(token.tag.class);
            }
        }
      });
    }
  };

  useEffect(() => {
    updateContentWithHighlights();
  }, [textList, tokens]);

  const handleInput = (e: React.FormEvent<HTMLDivElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if ('value' in e.currentTarget) {
      setText(e.currentTarget.value);
      setTextList(e.currentTarget.value.split(' '));
    } else {
      setText(e.currentTarget.textContent || '');
      setTextList((e.currentTarget.textContent || '').split(' '));
    }
  };

  const handleCheckboxChange = () => {
    setIsEditable(!isEditable);
    if (!isEditable) {
      setTextList(text.split(' '));
    }
  };

  const isTokenDuplicate = (index: number, existingTokens: Token[]) => {
    return existingTokens.some(token => token.index === index);
  };

  const remoteToken = (index: number) => {
    setTokens((prevTokens) => prevTokens.filter((token) => token.index !== index));
    let element = contentRef.current?.querySelector(`#word-${index}`);
    element.style.cssText = '';
    // como elimino la etiqueta style 
 }

  const addToken = (index: number) => {
    if (selectedTag) {
      const newToken: Token = {
        index: index,
        tag: selectedTag
      };
      
      setTokens((prevTokens) => [...prevTokens, newToken]);
    } else {
        confirm("Add a tag")
    }
  };

  const handleWordClick = (index: number, ) => {
    if (!isTokenDuplicate(index, tokens)) {
        addToken(index)
    } else {
        remoteToken(index)
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <input
          id="checked-checkbox"
          type="checkbox"
          checked={isEditable}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Edit</label>
      </div>

      {isEditable ? (
        <textarea
          ref={textAreaRef}
          id="tokenizable-textarea"
          rows={5}
          value={text}
          onChange={handleInput}
          placeholder="Select text to tokenize"
          className="border p-2 w-full h-40 overflow-y-auto"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      ) : (
        <div
          ref={contentRef}
          className="border p-2 w-full h-40 overflow-y-auto bg-gray-100"
          style={{ whiteSpace: 'pre-wrap', cursor: 'pointer' }}
        >
          {
           textList.map((word, index) => (
             <span 
             className="word" 
             id={`word-${index}`} 
             key={index} 
             onClick={() => handleWordClick(index)} >
                {word}{' '}
             </span>   
           ))
          }
        </div>
      )}

      <div className="mt-4">
        <h3>Tokens:</h3>
        <ul>
          {tokens.map((token, index) => (
            <li key={index} className="p-2 m-1 bg-gray-200 rounded">{textList[token.index]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextArea;
