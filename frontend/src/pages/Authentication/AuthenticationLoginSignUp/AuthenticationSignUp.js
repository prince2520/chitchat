import { Link } from "react-router-dom";
import {  useState } from "react";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { signup } from "../../../api/user";
import { toast } from "react-toastify";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
    
  const submitHandler = (event) => {
    event.preventDefault();

    let username, email, password, confirmPassword;

    username = event.target[0].value;
    email = event.target[1].value;
    password = event.target[2].value;
    confirmPassword = event.target[3].value;

    setLoading(true);
    
    signup(username, email, password, confirmPassword)
    .then((res)=>toast.success(res.message))
    .catch((err)=>toast.error(err.message))
    .finally(()=>setLoading(false));
  }

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
      <Button loading={loading} backgroundColor='var(--primary)' color="var(--text)" width={"60%"}>
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
