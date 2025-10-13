"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { getToken } from "./utils";

// what the people call a higher order component
//  https://www.freecodecamp.org/news/secure-routes-in-next-js/


export default function isAuth(Component: React.FC) {
  // this will be tricky with auth,,, 
  return function IsAuth(props: any) {
    const auth = getToken('access-token');

    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}