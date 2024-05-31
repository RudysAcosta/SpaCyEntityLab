import Tags from "./components/Tags";
import TextArea from "./components/TextArea";
import { TagProvider } from "./context/TagContext";
import TextWithEntities from "./components/TextWithEntities";
import { TextAreaProvider } from "./context/TextAreaContext";
import Tokens from "./components/Tokens";

function App() {

  return (
    
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Doc for Training Model in spaCy</h1>
      <TagProvider>
         <Tags />
         <TextAreaProvider>
            <TextArea />
            <Tokens />
         {/* <div className="mb-4">
            <label className="block text-gray-700 mb-2">Edit</label>
            <textarea className="w-full border border-gray-300 rounded p-2" rows="6">Los arrays son objetos similares a una lista cuyo prototipo proporciona métodos para efectuar operaciones de recorrido y de mutación. Tanto la longitud como el tipo de los elementos de un array son variables. Dado que la longitud de un array puede cambiar en cualquier momento, y los datos se pueden almacenar en ubicaciones no contiguas, no hay garantía de que los arrays de JavaScript sean densos; esto depende de cómo el programador elija usarlos. En general estas características son cómodas, pero si, en su caso particular, no resultan deseables, puede considerar el uso de arrays con tipo.</textarea>
        </div> */}

         </TextAreaProvider>
      </TagProvider>
    </div>


    // <div className="min-h-screen flex flex-col px-8 my-8 border bottom-1 shadow-lg rounded">
    //   <header className="bg-blue-600 text-white p-4">
    //     <h1 className="text-2xl font-bold text-left">Doc for training model in spacy</h1>
    //   </header>
    //   <main className="flex-grow">
    //   <TagProvider>
    //     <Tags />
    //     <TextAreaProvider>
    //       <TextArea />
    //       <TextWithEntities />
    //     </TextAreaProvider>
    //   </TagProvider>
    //   </main>
    //   <footer className="bg-gray-800 text-white p-4 text-center">
    //     © 2024 Mi Página.
    //   </footer>
    // </div>
  )
}

export default App
