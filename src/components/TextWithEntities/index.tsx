import React from "react";
import { useTextAreaContext } from '../../context/TextAreaContext';

const TextWithEntities: React.FC = () => {

    const {entities} = useTextAreaContext();

    entities?.entities.map(entity => {
        delete entity.tag
    });

    return (
        <div className="w-full px-8 py-8 bg-slate-800 text-orange-400">
            <div className="json-container">
                <pre>
                    <code>
                        {JSON.stringify(entities, null, 2)}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default TextWithEntities;