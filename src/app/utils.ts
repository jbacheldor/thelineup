
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

