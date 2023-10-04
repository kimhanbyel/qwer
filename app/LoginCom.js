'use client'
import { signIn, signOut } from "next-auth/react"

function LoginCom(){
  return(
    <button className="btn" onClick={()=>{signIn()}}>로그인</button>
  )
}

function LogoutCom(){
  return(
    <button className="btn" onClick={()=>{signOut()}}>로그아웃</button>
  )
}

export { LoginCom, LogoutCom }