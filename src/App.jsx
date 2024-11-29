import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import banner from '/banner.png'
import './App.css'
import { createClient } from "@supabase/supabase-js";


const supabase = createClient("https://ygsfkxzywnoexaqlwfgi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlnc2ZreHp5d25vZXhhcWx3ZmdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NzUwNzYsImV4cCI6MjA0ODI1MTA3Nn0.oCUcKOwthuE5ygcnspO1KapA-i8aeqwFKZw_SIyzI7I");

function App() {
  const [regalos, setRegalos] = useState([]);
  const [count, setCount] = useState(0)

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    getRegalos();
  }, []);

  async function getRegalos() {
    const { data } = await supabase.from("Regalos")
                                   .select()
                                   .eq('reservado', false);
    setRegalos(data);
  }

  async function reservarRegalo(regalo, event) {
    const { data, error } = await supabase
      .from('Regalos')
      .update({ reservado: !regalo.reservado })
      .eq('id', regalo.id);
    regalo.reservado = !regalo.reservado;
    const nextRegalos = regalos.map(r => {
      if (r.id === regalo.id) return regalo;
      else return r;
    })
    setRegalos(nextRegalos);
    if (regalo.reservado) {
      alert(`Gracias por reservar: ${regalo.nombre}`);
    }
  }

  return (
    <>
      <header class="top-banner" style={{backgroundImage: `url(${banner})`}}>
        <div class="banner-content">
        </div>
      </header>
      <h1>Lista de Regalo</h1>
      <div className="card">
        <p>
          Seleccione el regalo que desea reservar para Alejandra e Isaías
        </p>
      </div>
      <ul id="gift-list">
        {regalos.map((regalo) => (
          <li key={regalo.id}>
            <span class="gift-name">{regalo.nombre}</span>
            <button onClick={(e) => reservarRegalo(regalo, e)} class={"reserve-btn " + (regalo.reservado ? 'reserved' : '') }>
              {regalo.reservado ? 'Reservado' : 'Reservar'}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App;
