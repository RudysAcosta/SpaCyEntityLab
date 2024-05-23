import React, { useState, useRef, useEffect } from 'react';

interface Tag {
    class: string
}

interface Token {
  index: number;
  tag: Tag;
}

const TextArea: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [text, setText] = useState<string>('');
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [textList, setTextList] = useState<string[]>([]);

  let tag: Tag = {class: 'bg-pink-500'}

  // Función para actualizar el contenido del div con tokens resaltados
  const updateContentWithHighlights = () => {
    if (contentRef.current) {
      let htmlContent = [...textList];
      tokens.forEach(token => {
        if (htmlContent[token.index]) {
            let element = contentRef.current?.querySelector(`#word-${token.index}`);
            if(element) {
                element.classList.add(token.tag.class);
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

  const addToken = (index: number) => {
    const newToken: Token = {
      index: index,
      tag: tag
    };

    setTokens((prevTokens) => [...prevTokens, newToken]);
  }

  const handleWordClick = (index: number, ) => {
    if (!isTokenDuplicate(index, tokens)) {
        addToken(index)
    }
  }

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
             <span className="word" id={`word-${index}`} key={index} onClick={() => handleWordClick(index)} >
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
