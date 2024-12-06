"use server"
import { api } from "@/services/api";
import { cookies } from "next/headers";

async function LoginFunction(username, password) {
  try {
    const resposta = await api.post("/login", { username, password });

    if (resposta.status === 200 || resposta.status === 201) {
        const cokiesStore = await cookies();
        cokiesStore.set("session", resposta.data.access_token, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
        })
      return { mensagem: 'ok' };

    } else {
      return { mensagem: 'Erro inesperado ao tentar fazer login.' };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Não foi possível realizar o login. Tente novamente.";
    return { mensagem: errorMessage };
  }
}

export default LoginFunction;
