import React, { useEffect } from "react";
import { useTextAreaContext } from "../../context/TextAreaContext";
import TagToken from "../TagToken";

const Tokens: React.FC = () => {
    const { entities } = useTextAreaContext();
    const tokens = entities?.entities || [];
    const text = entities?.text || '';

    useEffect(() => {
        console.log(entities)
        console.log(tokens)
    }, [entities]);

    const getText = (start: number, end: number): string => {
        return text.substring(start, end)
    }

    return (
        <>
          {tokens?.length > 0 && (
            <div className="mb-4" >
                <h2 className="text-xl font-semibold mb-2">Tokens:</h2>
                <div className="flex flex-wrap">
                    {tokens.map((token, index) => {
                        console.log(token);

                        return <TagToken 
                            key={index}
                            text={getText(token.start, token.end)}
                            tag={token.tag}
                            color={token.tag.color}
                            />
                        // <span 
                        //     key={index} 
                        //     tag={token.tag}
                        //     className="inline-block bg-green-200 text-green-800 text-xs font-semibold rounded-full px-2 py-1 mr-2 mb-2"> = NCF</span>
                    })}
                </div>
            </div>
          )}
        </>
    );
};

export default Tokens;