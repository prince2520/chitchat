import Button from "../../../Helper/Button/Button";
import CustomInput from "../../../Helper/CustomInput/CustomInput";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../Context/auth";

const Login = () => {
    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();

        let email , password;

        email = event.target[0].value;
        password = event.target[1].value;

        authCtx?.loginHandler(email, password);
        console.log(email)

    }

    return(
        <form className='login-form' onSubmit={(event)=>submitHandler(event)}>
            <span className='login-heading'>Welcome Back</span>
            <p>Login to continue</p>
            <CustomInput type={'email'} label={'Email'} icon={'ic:baseline-email'}/>
            <CustomInput type={'password'} label={'Password'} icon={'material-symbols:lock'}/>
            <Button title={'Login'}/>
            <div className="link-container">
                <div>Don't have an account ?</div>
                <Link className="link" to={'/signup'}>Create an account.</Link>
            </div>
        </form>
    )
};

export default Login;