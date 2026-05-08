"use client";
import Link from 'next/link';
import styles from './cadastro.module.css';

export default function Cadastro() {
  const handleCadastro = (e) => {
    e.preventDefault();
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <main className={styles.container}>
      <section className={styles.formularioBox}>
        <h2>Crie sua Conta</h2>
        <form onSubmit={handleCadastro}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome Completo</label>
            <input id="nome" type="text" placeholder="Digite seu nome" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bairro">Bairro</label>
            <input id="bairro" type="text" placeholder="Digite seu barrio" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ong">Nome da sua ONG (Opcional)</label>
            <input id="ong" type="text" placeholder="Se possuir uma" />
          </div>

          <button type="submit" className={styles.btnEnviar}>
            Finalizar Cadastro
          </button>
        </form>
        
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <Link href="/" style={{color: '#1b84da', fontSize: '0.9rem'}}>Voltar para Home</Link>
        </div>
      </section>
    </main>
  );
}