'use client'
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";
import Login from "./components/Login";

export default function Home() {
  // if there is no login detected then yes, redirect girly
  const [token, setToken] = useState<string>("");

  if(!token) {
    return (
      <Login setToken={setToken}/>
    )
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
