import { useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";

import AuthContext from "../../../context/authContext";

const Login = () => {
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    let email, password;
    email = event.target[0].value;
    password = event.target[1].value;

    authCtx?.loginHandler(email, password);
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
        backgroundColor="var(--primary)"
        color="var(--text)"
        width={"60%"}
      >
        <h5 className="color-text">Login</h5>
      </Button>
      <p className="flex-center">
        Don't have an account ?
        <Link className="link" to={"/signup"}>
          Create an account.
        </Link>
      </p>
    </form>
  );
};

export default Login;
