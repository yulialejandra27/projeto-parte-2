"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [descricao, setDescricao] = useState('');
  const [link, setLink] = useState('');
  const [data, setData] = useState('');

  const tipoPagina = 'eventos';

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const response = await fetch('/api/eventos');
        const data = await response.json();
        setEventos(data.eventos);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };
    carregarEventos();
  }, []);

  useEffect(() => {
    // Não precisa mais salvar no localStorage, a API cuida disso
  }, [eventos]);

  const handleAddEvento = async (e) => {
    e.preventDefault();
    if (!descricao.trim()) return alert("Digite uma descrição!");

    const novo = { descricao, link, data };
    try {
      const response = await fetch('/api/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', evento: novo })
      });
      const data = await response.json();
      setEventos(data.eventos);
      setDescricao(''); setLink(''); setData('');
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
      alert('Erro ao adicionar evento');
    }
  };

  const remover = async (index) => {
    try {
      const response = await fetch('/api/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove', index })
      });
      const data = await response.json();
      setEventos(data.eventos);
    } catch (error) {
      console.error('Erro ao remover evento:', error);
      alert('Erro ao remover evento');
    }
  };

  const eventosFiltrados = eventos.filter(ev => 
    ev.descricao.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <main className={styles.mainContainer}>
      <nav className="pesquisa">
        <ul>
          <li><Link href="/" className="selected">Home</Link></li>
          <li><Link href="/vagas">Vagas Locais</Link></li>
          <li><Link href="/datas">Datas Comemorativas</Link></li>
        </ul>
      </nav>

      <div className={styles.contentWrapper}>
        <section className={styles.sectionEventos}>
          <h2>Adicione um evento a sua comunidade</h2>
          <form onSubmit={handleAddEvento} className={styles.formularioHome}>
            <input 
              className={styles.inputField}
              type="text" 
              placeholder="O que vai acontecer?" 
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input 
              className={styles.inputField}
              type="text" 
              placeholder="Link ou Local" 
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <input 
              className={styles.inputField}
              type="date" 
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <button type="submit" className={styles.btnSubmit}>Postar no Mural</button>
          </form>

          <div className={styles.buscaContainer}>
            <input 
              type="text" 
              className={styles.inputBusca}
              placeholder="Buscar evento" 
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>

          <div id="listaEventos">
            {eventosFiltrados.map((ev, index) => (
              <div key={index} className={styles.cardEvento}>
                <h4>{ev.descricao}</h4>
                <p>{ev.link}</p>
                <small>{ev.data}</small>
                <br />
                <button 
                  onClick={() => remover(index)}
                  className={styles.btnRemover}
                >
                   Remover 
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className={styles.asideInfo}>
          <h2>Quem somos nós</h2>
          <p>
            O <strong>Mural da Comunidade</strong> é uma plataforma colaborativa, surgiu da observação de que, 
            mesmo em uma era tecnológica, muitas vezes desconhecemos os eventos e oportunidades 
            que acontecem a poucos metros da nossa porta.
          </p>
          
          <h3>Nossa Missão</h3>
          <p>
            É facilitar o acesso à informação local. Queremos ser o ponto de encontro 
            digital onde moradores, pequenos empreendedores e organizadores de eventos possam 
            compartilhar conhecimentos e fortalecer a economia e a cultura local.
          </p>

          <h3>Como Funciona?</h3>
          <p>
            Qualquer membro da comunidade pode atuar como um agente transformador. Através do nosso 
            formulário simplificado, você pode cadastrar desde festas beneficentes e feiras culturais 
            até vagas de emprego locais.
          </p>
          <p>
            Aqui, você tem voz para divulgar o que acontece no seu bairro!!!
          </p>
        </aside>
      </div>
    </main>
  );
}