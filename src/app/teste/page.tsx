"use client"
import type { User } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import { supabase } from "@/api/supabaseClient"

export default function TestePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isLogin, setIsLogin] = useState(true) // alternar entre login/cadastro

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      }
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) return <p>Carregando...</p>

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-xl font-bold">Bem-vindo, {user.user_metadata?.username || user.email}!</h2>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            setUser(null)
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        alert("Erro ao entrar: " + error.message)
      } else {
        setUser(data.user)
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      })
      if (error) {
        alert("Erro ao cadastrar: " + error.message)
      } else {
        alert("Cadastro realizado! Verifique seu e-mail.")
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-semibold">
        {isLogin ? "Entrar na Conta" : "Cadastrar-se"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        />

        {!isLogin && (
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded p-2"
            required
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition"
        >
          {isLogin ? "Entrar" : "Cadastrar"}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-gray-600 underline"
      >
        {isLogin ? "Criar nova conta" : "Já tenho uma conta"}
      </button>
    </div>
  )
}
