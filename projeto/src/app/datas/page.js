"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './datas.module.css';

export default function Datas() {
  const [minhasDatas, setMinhasDatas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

  const tipoPagina = 'datas_comemorativas';

  useEffect(() => {
    const carregarDatas = async () => {
      const response = await fetch('/api/datas');
      const data = await response.json();
      setMinhasDatas(data.datas);
    };
    carregarDatas();
  }, []);

  useEffect(() => {
    // Não precisa mais salvar no localStorage, a API cuida disso
  }, [minhasDatas]);

  const handleAddData = async (e) => {
    e.preventDefault();
    if (!descricao.trim() || !data) return alert("Preencha tudo!");

    const novaData = { descricao, data };
    const response = await fetch('/api/datas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add', data: novaData })
    });
    const result = await response.json();
    setMinhasDatas(result.datas);
    setDescricao('');
    setData('');
  };

  const remover = async (index) => {
    const response = await fetch('/api/datas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', index })
    });
    const result = await response.json();
    setMinhasDatas(result.datas);
  };

  return (
    <main className={styles.mainContainer}>
      <nav className="pesquisa">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/vagas">Vagas Locais</Link></li>
          <li><Link href="/datas" className="selected">Datas Comemorativas</Link></li>
        </ul>
      </nav>

      <section className={styles.vagasSection}>
        <h2>Datas Comemorativas</h2>
        
        <form onSubmit={handleAddData} className={styles.formularioVagas}>
          <input 
            className={styles.inputField}
            type="text" 
            placeholder="Descrição da data" 
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <input 
            className={styles.inputField}
            type="date" 
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button type="submit" className={styles.btnSubmit}>Adicionar Data</button>
        </form>

        <div className={styles.listaEventos}>
          {minhasDatas.map((item, index) => (
            <div key={index} className={styles.cardVaga}>
              <h3>{item.descricao}</h3>
              <p>{new Date(item.data).toLocaleDateString('pt-BR')}</p>
              <button 
                onClick={() => remover(index)} 
                className={styles.btnRemover}
              >
                Remover data
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}