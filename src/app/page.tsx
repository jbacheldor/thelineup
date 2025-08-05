'use client'
import styles from "./page.module.css";
import { useState } from "react";
import Login from "./components/Login";

export function getToken(name: string) {
  if(typeof window !== 'undefined'){
      return localStorage.getItem(name);
  }
}

function setToken(name: string, token: string) {
    localStorage.setItem(name, token);
}

export default function Home() {
  // if there is no login detected then yes, redirect girly
  // const [token, setToken] = useState<string>("");
  const tokenLocal = getToken('access-level');

  if(!tokenLocal) {
    return (
      <Login setToken={setToken}/>
    )
  }

  return (
    <div className={styles.page}>
      <div>logged in as: </div>

    </div>
  );
}
