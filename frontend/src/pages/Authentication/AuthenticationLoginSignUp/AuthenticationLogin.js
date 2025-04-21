import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../../components/Button/Button";
import { useDispatch } from "react-redux";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { loginThunk } from "../../../redux/thunk/userThunk";
import { useAuth } from "../../../hooks/useAuth";
import { ChatActions } from "../../../redux/slice/chatSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { authTimer } = useAuth();

  const submitHandler = (event) => {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;

    setLoading(true);

    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then((res) => {
        dispatch(ChatActions.saveChatReducer({
          groups: res.user.groups,
          privates: res.user.privates,
        }))
        authTimer(res);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="flex-center" onSubmit={(event) => submitHandler(event)}>
      <h2>Welcome Back</h2>
      <p>Login to continue</p>
      <CustomInput type={"email"} label={"Email"} icon={"ic:baseline-email"} />
      <CustomInput
        type={"password"}
        label={"Password"}
        icon={"material-symbols:lock"}
      />
      <Button
        loading={loading}
        backgroundColor="var(--primary)"
        color="var(--text)"
        width={"60%"}
      >
        <h5 className="color-text">Login</h5>
      </Button>
      <p className="flex-center">
        Don't have an account ?
        <Link className="link" to={"/auth/signup"}>
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default Login;
