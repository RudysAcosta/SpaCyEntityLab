import React, {useState, useEffect} from "react";
import { useTextAreaContext } from '../../context/TextAreaContext';

interface EntityType {
    start: number;
    end: number;
}

export interface EntitiesState {
    text: string;
    entities: EntityType[];
}

const TextWithEntities: React.FC = () => {

    const [myEntities, setMyEntities] = useState<EntitiesState>({
        text: '',
        entities:  [],
    });

    const {entities} = useTextAreaContext();

    useEffect(() => {
        if (entities) {
          const cleanedEntities = entities.entities?.map(entity => {
            if (entity.tag) {
              const { tag, ...rest } = entity;
              return rest;
            }
            return entity;
          });
    
          setMyEntities({
            text: entities.text,
            entities: cleanedEntities || [], 
          });
        }
      }, [entities]);

    return (
        <div>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                <code>
                    {JSON.stringify(myEntities, null, 2)}
                </code>
            </pre>
        </div>
    );
};

export default TextWithEntities;