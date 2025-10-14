import { jwtDecode } from "jwt-decode";
import * as jose from 'jose'

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

export function setToken(name: string, token: string) {
    localStorage.setItem(name, token);
}

export const verifyJWT = async (token: string) => {
  const iss = process.env.ISSUER
  const aud = process.env.PROJECT_ID
  const pub_key_url = process.env.PUB_KEY_URL

  try {
    const { kid, alg } = jwtDecode(token, { header: true });
    const res = await fetch(pub_key_url as string, {
      method: "GET"
    }) 

    const public_key = (await res.json())[kid as string]

    const parts = token.split('.')
    if (parts.length !== 3) throw new Error("Invalid JWT format");

    const ecPublicKey = await jose.importX509(public_key, alg as string)

    const { payload, protectedHeader } = await jose.jwtVerify(token, ecPublicKey, {
      issuer: iss,
      audience: aud,
    })
      console.log('payload', payload)
      console.log('protected header', protectedHeader)
      
  }catch(error){
    console.log('error', error)
    throw new Error('BAD THINGS OCCURRING - INVALID PUBLIC KEYS HAPPENING')
  }

}

// pulls jwt out in order to parse it
export function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// this doesn't include the sms or email token i think,,,
export type Token = {
  "iss": string,
  "aud": string,
  "auth_time": string,
  "user_id": string,
  "sub": string,
  "iat": number,
  "exp": number,
  "email": string,
  "email_verified": boolean,
  "firebase": {
    "identities": {
      "email": [
        string
      ]
    },
    "sign_in_provider": string
  }
}

export function validateJWT(token: Token){
    if (Date.now() >= token.exp) {
      return true;
    }
    else return false
}

