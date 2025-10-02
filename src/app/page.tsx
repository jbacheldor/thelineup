'use client'
import styles from "./page.module.css";
import Login from "./components/Login";
import { getToken, setToken } from "./utils";

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

    </div>
  );
}
