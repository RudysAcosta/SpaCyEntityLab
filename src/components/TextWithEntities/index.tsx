import React from "react";
import { useTextAreaContext } from '../../context/TextAreaContext';

const TextWithEntities: React.FC = () => {

    const {entities} = useTextAreaContext();

    entities?.entities.map(entity => {
        delete entity.tag
    });

    return (
        <div>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                <code>
                        {JSON.stringify(entities, null, 2)}
                </code>
            </pre>
        </div>
    );
};

export default TextWithEntities;