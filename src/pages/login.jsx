import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const signinUsingGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    console.log(res);
    navigate("/");
  };

  return (
    <div>
      <p>This is Login Page</p>

      {!user && (
        <button onClick={signinUsingGoogle}>Sign In using Google</button>
      )}

      {user && <p>Already logged In</p>}
    </div>
  );
};
