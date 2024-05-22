import React, { useState } from "react"
import Tags from "./components/Tags"

function App() {

  



  return (
    <div className="min-h-screen flex flex-col px-8">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold text-left">Doc for trainig model in spacy</h1>
      </header>
      <main className="flex-grow">
        <Tags />
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Sección 2</h2>
          <p>
            Este es el contenido de la segunda sección. Puedes añadir más
            contenido aquí.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Sección 3</h2>
          <p>
            Este es el contenido de la tercera sección. Puedes añadir más
            contenido aquí.
          </p>
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 Mi Página. Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default App
