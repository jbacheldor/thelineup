"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { getToken } from "./page";


export default function isAuth<Component>(Component: any): any {
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

    return <Component/>
  };
}