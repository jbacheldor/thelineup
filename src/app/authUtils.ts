import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./server/createClient";
import { parseJwt } from "./utils";

const pathName = process.env.BASE_URL

// but do we store on front-end like how do we know this
export const silentRefresh = async () => {
    try {
        const auth = getAuth(app);
      const res = await fetch(`${pathName}/server/refreshtoken`, {
          method: 'GET',
      })
      const token = await res.json()
      const {email} = parseJwt(token)
      return email
    } catch(error) {
      console.log(error)
      return null;
    }
}

export const passLogin = async (email: string, password: string) => {
    const auth = getAuth(app);
    setPersistence(auth, browserSessionPersistence)
    const res = await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const idToken = await userCredential.user.getIdToken();
            await fetch(`${pathName}/server/loginpassv2`, {
                method: "POST",
                body: JSON.stringify({
                    access_token: idToken,
                    refresh_token: user.refreshToken
                })
            })

            return ({
                    message: 'successful login',
                    data: user,
                    status: 200
                });
            }).catch((error) => {
            console.log('error', error)
                return ({
                    message: 'invalid credential',
                    status: 400
                });
        })

        return res
}

export const codeLogin = () => {}
