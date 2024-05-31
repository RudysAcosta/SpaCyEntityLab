import React, { useState, useRef, useEffect } from 'react';
import { useTagContext } from '../../context/TagContext';
import { useTextAreaContext } from '../../context/TextAreaContext';
import TokenType from '../../types/TokenType';
import EntityType from '../../types/EntityType';
import EntitiesType from '../../types/EntitiesType';
import TagType from '../../types/Tag';

const TextArea: React.FC = () => {
  const { selectedTag } = useTagContext();
  const { setEntities } = useTextAreaContext();
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [text, setText] = useState<string>('');
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [textList, setTextList] = useState<string[]>([]);

  const updateContentWithHighlights = () => {
    if (contentRef.current) {
      let htmlContent = [...textList];
      let entities: EntityType[] = [];
      tokens.forEach(token => {
        const entity = makeEntity(token);
        if (entity != null) {
          entities.push(entity);
        }
        if (htmlContent[token.index]) {
          const element = contentRef.current?.querySelector(`#word-${token.index}`);
          if (element) {
            element.style.background = token.tag.color.background;
            element.style.color = token.tag.color.textBorderColor;
            element.style.border = `1px solid ${token.tag.color.textBorderColor}`;
          }
        }
      });

      const entitiesDoc: EntitiesType = {
        text: htmlContent.join(' '),
        entities: entities
      };

      setEntities(entitiesDoc);
    }
  };

  useEffect(() => {
    updateContentWithHighlights();
  }, [textList, tokens]);

  const makeEntity = (token: TokenType): EntityType | null => {
    if (!token) return null;
    return {
      start: token.range[0],
      end: token.range[1],
      tag: token.tag
    };
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = 'value' in e.currentTarget ? e.currentTarget.value : e.currentTarget.textContent || '';
    setText(value);
    setTextList(value.split(' '));
  };

  const handleCheckboxChange = () => {
    setIsEditable(!isEditable);
    setTokens([]);
    if (!isEditable) {
      setTextList(text.split(' '));
    }
  };

  const isTokenDuplicate = (index: number) => {
    return tokens.some(token => token.index === index);
  };

  const removeToken = (index: number) => {
    setTokens(prevTokens => prevTokens.filter(token => token.index !== index));
    const element = contentRef.current?.querySelector(`#word-${index}`);
    if (element) {
      element.style.cssText = '';
    }
  };

  const getRange = (index: number): number[] => {
    const word = textList[index];
    if (!word) return [];

    let start = 0;
    for (let i = 0; i < index; i++) {
      start += textList[i].length + 1;
    }
    return [start, start + word.length];
  };

  const addToken = (index: number) => {
    if (!selectedTag) {
      alert("Add a tag");
      return;
    }

    const newToken: TokenType = {
      index: index,
      tag: selectedTag,
      range: getRange(index)
    };
    setTokens(prevTokens => [...prevTokens, newToken]);
  };

  const handleWordClick = (index: number) => {
    if (isTokenDuplicate(index)) {
      removeToken(index);
    } else {
      addToken(index);
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
          value={text}
          onChange={handleInput}
          placeholder="Select text to tokenize"
          className="w-full border border-gray-300 rounded p-2 h-40"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      ) : (
        <div
          ref={contentRef}
          className="w-full border border-gray-300 bg-gray-50 rounded p-2 h-40"
          style={{ whiteSpace: 'pre-wrap', cursor: 'pointer' }}
        >
          {textList.map((word, index) => (
            <span
              className="word"
              id={`word-${index}`}
              key={index}
              onClick={() => handleWordClick(index)}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      )}
      </div>



    //   <div className="mt-4">
    //     <h3>Tokens:</h3>
    //     <div>
    //     {tokens.map((token, index) => (
    //         <span key={index} className="p-2 m-1 bg-gray-200 rounded">{textList[token.index] + ` = ` + token.tag.text.toLocaleUpperCase() }</span>
    //     ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default TextArea;
