import Tags from "./components/Tags";
import TextArea from "./components/TextArea";
import { TagProvider } from "./context/TagContext";
import TextWithEntities from "./components/TextWithEntities";
import { TextAreaProvider } from "./context/TextAreaContext";

function App() {

  return (
    
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Doc for Training Model in spaCy</h1>
      <TagProvider>
         <Tags />
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
