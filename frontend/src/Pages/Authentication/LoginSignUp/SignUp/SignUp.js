import {useContext} from "react";
import {Link} from "react-router-dom";

import Button from "../../../../components/Button/Button";
import CustomInput from "../../../../components/CustomInput/CustomInput";

import AuthContext from "../../../../context/auth";

const SignUp = () => {
    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();

        let username, email, password;

        username = event.target[0].value;
        email = event.target[1].value;
        password = event.target[2].value;

        authCtx?.signUpHandler(username, email, password);
    }



    return(
        <form className='login-form' onSubmit={(event) => submitHandler(event)}>
            <span className='login-heading'>Create an account</span>
            <p>Sign Up to continue</p>
            <CustomInput type={'username'} label={'Username'} icon={'mingcute:user-4-line'}/>
            <CustomInput type={'email'} label={'Email'} icon={'ic:baseline-email'}/>
            <CustomInput type={'password'} label={'Password'} icon={'material-symbols:lock'}/>
            <CustomInput type={'password'} label={'Confirm Password'} icon={'material-symbols:lock'}/>
            <Button title={'Sign up'}/>
            <div className="link-container">
                <div>Already have an account ?</div>
                <Link to={'/login'} className="link">Login with an account</Link>
            </div>
        </form>
    );
};

export default SignUp;