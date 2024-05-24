import React, { useState, useRef, useEffect } from 'react';
import { useTagContext } from '../../context/TagContext';
import { useTextAreaContext } from '../../context/TextAreaContext';

import TokenType from '../../types/TokenType';
import EntityType from '../../types/EntityType';
import EntitiesType from '../../types/EntitiesType';

const TextArea: React.FC = () => {
  const { selectedTag } = useTagContext();
  const { setEntities } = useTextAreaContext();
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [text, setText] = useState<string>('');
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [textList, setTextList] = useState<string[]>([]);


  // Función para actualizar el contenido del div con tokens resaltados
  const updateContentWithHighlights = () => {
    if (contentRef.current) {
      let htmlContent = [...textList];
      let entities:EntityType[] = []
      tokens.forEach(token => {
        let entity = makeEntity(token)
        if(entity != null) {
          entities.push(entity)
        }
        if (htmlContent[token.index]) {
            let element = contentRef.current?.querySelector(`#word-${token.index}`);
            if(element) {
                element.style.background = token.tag.color.background;
                element.style.color = token.tag.color.textBorderColor; 
                element.style.border = `1px solid ${token.tag.color.textBorderColor}`; 
            }
        }
      });
      
      const entitiesDoc:EntitiesType = {
        text: htmlContent.join(' '),
        entities: entities
      }
      
      setEntities(entitiesDoc)

    }
  };

  useEffect(() => {
    updateContentWithHighlights();
  }, [textList, tokens]);

  const makeEntity = (token: TokenType): EntityType | null => {
    if(!token) return null;

    const entity = {
      label: token.tag.text.toUpperCase(),
      start: token.range[0],
      end: token.range[1]
    }

    return entity
  }

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

    if(tokens) {
        setTokens([]);
    }

    if (!isEditable) {
      setTextList(text.split(' '));
    } else {
      setTokens([]);
    }
  };

  const isTokenDuplicate = (index: number, existingTokens: TokenType[]) => {
    return existingTokens.some(token => token.index === index);
  };

  const remoteToken = (index: number) => {
    setTokens((prevTokens) => prevTokens.filter((token) => token.index !== index));
    let element = contentRef.current?.querySelector(`#word-${index}`);
    element.style.cssText = '';
 }

 const getRange = (index: number): Array<number> => {
    let word: string = textList[index]

    if (word) {
       if (index == 0) {
        return [0, word.length]
       }

       let i = 0;
       let start = 0;
       while (i < index) {
          start += textList[i].length + 1
          i++;
       }

       const end = start + word.length

       return [start, end]
    }

    return []
 }

  const addToken = (index: number) => {
    if (selectedTag) {

      const newToken: TokenType = {
        index: index,
        tag: selectedTag,
        range: getRange(index)
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
