"use client";

import styles from "@/app/page.module.scss";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoginFunction from "@/lib/login";

export default function Login() {
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      Swal.fire("Erro!", "Preencha todos os campos.", "error");
      return;
    }

    const response = await LoginFunction(email, password);

    if (response.mensagem === "ok") {
      router.push("/dashboard");
    } else {
      Swal.fire("Erro", response.mensagem, "error");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Entrar</h1>
        <form onSubmit={handleLogin} className={styles.form}>
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
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
