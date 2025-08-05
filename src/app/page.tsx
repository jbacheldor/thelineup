'use client'
import styles from "./page.module.css";
import Login from "./components/Login";
import { parseJwt, validateJWT } from "./utils";

export function getToken(name: string) {
  if(typeof window !== 'undefined'){
      let parsed = localStorage.getItem(name)
      if(parsed){
        const check = parseJwt(parsed)
        if(validateJWT(check)){
          return localStorage.getItem(name);
        }
        else {
          localStorage.removeItem(name)
        }
      }
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
