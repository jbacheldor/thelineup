'use client'
import styles from "./page.module.css";
import Login from "./components/Login";
import { useContext } from "react";
import { AuthContext } from "./context";

const Home:React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if(!isAuthenticated.isAuth) {
    return (
      <Login />
    )
  }

  return (
    <div className={styles.page}>

    </div>
  );
}

export default Home