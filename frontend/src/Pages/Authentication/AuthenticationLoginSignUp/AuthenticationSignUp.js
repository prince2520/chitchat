import { useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";

import AuthContext from "../../../context/authContext";

const SignUp = () => {
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    let username, email, password;

    username = event.target[0].value;
    email = event.target[1].value;
    password = event.target[2].value;

    authCtx?.signUpHandler(username, email, password);
  };

  return (
    <form className="flex-center login-form" onSubmit={(event) => submitHandler(event)}>
      <h2>Create an account</h2>
      <p>Sign Up to continue</p>
      <CustomInput
        type={"username"}
        label={"Username"}
        icon={"mingcute:user-4-line"}
      />
      <CustomInput type={"email"} label={"Email"} icon={"ic:baseline-email"} />
      <CustomInput
        type={"password"}
        label={"Password"}
        icon={"material-symbols:lock"}
      />
      <CustomInput
        type={"password"}
        label={"Confirm Password"}
        icon={"material-symbols:lock"}
      />
      <Button backgroundColor='var(--primary)' color="var(--text)" width={"60%"}>
        <h5 className="color-text">Sign Up</h5>
      </Button>
      <p className="flex-center">
        Already have an account ?
        <Link to={"/auth/login"} className="link">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;