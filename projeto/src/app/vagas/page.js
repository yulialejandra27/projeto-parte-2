"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './vagas.module.css'; 

export default function Vagas() {
  const [meusCartoes, setMeusCartoes] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [link, setLink] = useState('');
  const [data, setData] = useState('');

  const tipoPagina = 'vagas';

  useEffect(() => {
    const dados = localStorage.getItem(tipoPagina);
    if (dados) setMeusCartoes(JSON.parse(dados));
  }, []);

  useEffect(() => {
    localStorage.setItem(tipoPagina, JSON.stringify(meusCartoes));
  }, [meusCartoes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descricao.trim() || !link.trim()) {
      alert('Preencha os campos obrigatorios!');
      return;
    }
    const novo = { descricao, link, data };
    const novaLista = [...meusCartoes, novo].sort((a, b) => new Date(a.data) - new Date(b.data));
    setMeusCartoes(novaLista);
    setDescricao(''); setLink(''); setData('');
  };

  const remover = (index) => {
    setMeusCartoes(meusCartoes.filter((_, i) => i !== index));
  };

  return (
    <main className={styles.mainContainer}>
      <nav className={styles.navPesquisa}>
        <ul>  
          <li><Link href="/" className={styles.linkNav}>Home</Link></li>
          <li>
            <Link href="/vagas" className={`${styles.linkNav} ${styles.linkSelected}`}>
              Vagas Locais
            </Link>
          </li>
          <li><Link href="/datas" className={styles.linkNav}>Datas Comemorativas</Link></li>
        </ul>
      </nav> 

      <div className={styles.vagasSection}>
        <h2>Adicione uma vaga de emprego</h2>
        
        <form onSubmit={handleSubmit} className={styles.formularioVagas}>
          <input 
            className={styles.inputField}
            type="text" 
            placeholder="Descrição da Vaga" 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
          />
          <input 
            className={styles.inputField}
            type="text" 
            placeholder="Link ou Contacto" 
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
          />
          <input 
            className={styles.inputField}
            type="date" 
            value={data} 
            onChange={(e) => setData(e.target.value)} 
          />
          <button type="submit" className={styles.btnSubmit}>Enviar Vaga</button>
        </form>

        <div className={styles.listaEventos}>
          {meusCartoes.map((cartao, index) => (
            <div key={index} className={styles.cardVaga}>
              <h3>{cartao.descricao}</h3>
              <p><strong>Info:</strong> {cartao.link}</p>
              <p><strong>Data:</strong> {cartao.data}</p>
              <button className={styles.btnRemover} onClick={() => remover(index)}>
                Remover Vaga
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}