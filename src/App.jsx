import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import banner from '/banner.png'
import './App.css'
import { createClient } from "@supabase/supabase-js";


const supabase = createClient("https://ehiinnplyvchlylcwfsh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaWlubnBseXZjaGx5bGN3ZnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzODE3MzUsImV4cCI6MjA0OTk1NzczNX0.e301Fi4NQX-FIo0_ExM_PbXg7n1iYfbm3g8YO141Fio");

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
          Seleccione el regalo que desea reservar para Isaías y Alejandra
        </p>
      </div>
      <ul id="gift-list">
        {regalos.map((regalo) => (
          <li key={regalo.id}>
            <span class="gift-name">{regalo.nombre} {regalo.link ? <a href={regalo.link} target="_blank">ver</a> : ''}</span>
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
