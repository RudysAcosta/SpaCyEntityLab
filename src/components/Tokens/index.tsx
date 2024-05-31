import React from "react";
import { useTextAreaContext } from "../../context/TextAreaContext";
import TagToken from "../TagToken";

const Tokens: React.FC = () => {
    const { entities } = useTextAreaContext();
    const tokens = entities?.entities || [];
    const text = entities?.text || '';

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
                        return <TagToken 
                            key={index}
                            text={getText(token.start, token.end)}
                            tag={token.tag}
                            color={token.tag.color}
                            />
                    })}
                </div>
            </div>
          )}
        </>
    );
};

export default Tokens;