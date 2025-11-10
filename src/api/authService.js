import { supabase } from "./supabaseClient"
import CryptoJS, { enc } from "crypto-js"

const secretKey = process.env.SUPABASE_CRYPTO_KEY

function saveToken(token){
    if(!token) return
    const encrypted = CryptoJS.AES.encrypt(token, secretKey).toString()
    localStorage.setItem("supabase_token", encrypted)
}

function getToken() {
    const encrypted = localStorage.getItem("supabase_token")
    if(!encrypted) return null

    const bytes = CryptoJS.AES.decrypt(encrypted, secretKey)
    return bytes.toString(CryptoJS.enc.Utf8)
}

function removeToken() {
    localStorage.removeItem("supabase_token")
}

export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if(error) throw error
    return data
}

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password})
    if(error) throw error

    const token = data.session?.access_token
    saveToken(token)

    return data
} 

export async function signOut(){
    await supabase.auth.signOut()
    removeToken()
}

export async function getSession() {
    const token = getToken()
    if(!token) return null

    const {data, error} = await supabase.auth.getUser(token)
    if(error) {
        console.error("Error getting user: ", error.message)
        return null
    }

    return data.user
}