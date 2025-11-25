"use client"
import type { User } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import { supabase } from "@/api/supabaseClient"
import { LogOut } from "lucide-react";

interface LoginProps {
  onSuccess?: () => void;
}


export default function Login({ onSuccess } : LoginProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isLogin, setIsLogin] = useState(true)

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

  if (loading){ 
	return (
		<div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-zinc-900 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#181818]"></div>
        </div>
	)
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-1">
        <h2 className="text-xl font-bold text-black">Welcome, {user.user_metadata?.username || user.email}!</h2>
        <span className="text-sm mt-2 text-center text-zinc-600">Logout?</span>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            setUser(null)
          }}
          className="px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition cursor-pointer"
        >
          <LogOut size={20}/>
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
      if (!error) {
        // chama o evento que fecha o modal
        onSuccess?.()
      }
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

  // if(onSuccess) onSuccess()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-semibold text-black">
        {isLogin ? "Sign In" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
        <input
          type="email"
          placeholder="Your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-zinc-800 rounded-lg p-2 text-black bg-yellow-400/80
			focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:bg-zinc-200/80
			transition-all"
          required
        />

        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-zinc-800 rounded-lg p-2 text-black bg-yellow-400/80
			focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:bg-zinc-200/80
			transition-all"
          required
        />

        {!isLogin && (
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-zinc-800 rounded-lg p-2 text-black bg-yellow-400/80
			focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:bg-zinc-200/80
			transition-all"
            required
          />
        )}

        <button
          type="submit"
          className="bg-zinc-800 text-yellow-500 rounded-lg p-2 hover:bg-zinc-950 transition font-semibold cursor-pointer"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-gray-600 underline"
      >
        {isLogin ? "Create new account" : "I already have an account"}
      </button>
    </div>
  )
}
