"use client";

import styles from "./page.module.scss";
import { api } from "@/services/api";
import Swal from 'sweetalert2';

export default function Cadastro() {
  async function handleRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      Swal.fire('Erro!', 'Preencha todos os campos.', 'error');
      return;
    }

    try {
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: "Deseja se inscrever?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, inscrever!'
      });

      if (result.isConfirmed) {
        const resposta = await api.post("/register", { username: email, password: password });

        if (resposta.status === 200 || resposta.status === 201) {
          Swal.fire('Sucesso!', 'Cadastrado com sucesso.', 'success');
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Não foi possível cadastrar. Tente novamente.';
      Swal.fire('Erro', errorMessage, 'error');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Criando sua conta</h1>
        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome..."
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email..."
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              required
              name="password"
              placeholder="***********"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
