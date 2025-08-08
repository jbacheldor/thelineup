

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
type token = {
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

export function validateJWT(token: token){
    if (Date.now() >= token.exp) {
      return true;
    }
    else return false
}

