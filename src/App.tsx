import React, { useState } from "react"
import Tags from "./components/Tags"
import TextArea from "./components/TextArea"
import { TagProvider } from "./context/TagContext"

function App() {

  return (
    <TagProvider>
    <div className="min-h-screen flex flex-col px-8">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold text-left">Doc for trainig model in spacy</h1>
      </header>
      <main className="flex-grow">
        <Tags />
        <TextArea />
        
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 Mi Página.
      </footer>
    </div>
    </TagProvider>
  )
}

export default App
