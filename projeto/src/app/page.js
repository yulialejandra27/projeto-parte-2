"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [cartoes, setCartoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [data, setData] = useState("");
  const [busca, setBusca] = useState("");

  const tipoPagina = "eventos";

  useEffect(() => {
    const dados = localStorage.getItem(tipoPagina);
    if (dados) setCartoes(JSON.parse(dados));
  }, []);

  useEffect(() => {
    localStorage.setItem(tipoPagina, JSON.stringify(cartoes));
  }, [cartoes]);

  function adicionar(e) {
    e.preventDefault();
    if (!descricao || !link) return alert("Preencha tudo!");

    const novo = { descricao, link, data };

    const lista = [...cartoes, novo].sort(
      (a, b) => new Date(a.data) - new Date(b.data)
    );

    setCartoes(lista);
    setDescricao("");
    setLink("");
    setData("");
  }

  function remover(index) {
    setCartoes(cartoes.filter((_, i) => i !== index));
  }

  const filtrados = cartoes.filter(c =>
    c.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <header className="menu">
        <h1>Mural da Comunidade</h1>
      </header>

      <nav>
        <Link href="/">Home</Link> |{" "}
        <Link href="/vagas">Vagas</Link> |{" "}
        <Link href="/datas">Datas</Link>
      </nav>

      <main className="container">
        <h2>Adicionar Evento</h2>

        <form onSubmit={adicionar}>
          <input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />
          <input value={link} onChange={e => setLink(e.target.value)} placeholder="Link" />
          <input type="date" value={data} onChange={e => setData(e.target.value)} />
          <button type="submit">Enviar</button>
        </form>

        <input
          placeholder="Buscar evento..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />

        <div>
          {filtrados.map((c, i) => (
            <div key={i} className="vaga-item">
              <h3>{c.descricao}</h3>
              <p>{c.link}</p>
              <p>{c.data}</p>
              <button onClick={() => remover(i)}>Remover</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}