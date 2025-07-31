import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  // if there is no login detected then yes, redirect girly
  redirect(`/login`)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
