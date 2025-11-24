"use client";
import { useContext, useEffect } from "react";
import { redirect } from "next/navigation";
import { AuthContext } from "./context";

// what the people call a higher order component
//  https://www.freecodecamp.org/news/secure-routes-in-next-js/


export default function isAuth(Component: React.FC) {

  return function IsAuth() {
    const { isAuthenticated } = useContext(AuthContext);
    const auth = isAuthenticated.isAuth

    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, [auth]);


    if (!auth) {
      return null;
    }

    return <Component/>;
  };
}