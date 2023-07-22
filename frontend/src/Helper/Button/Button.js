import './Button.css';
const Button = (props) => {
    return(
        <button type={'submit'} className="button-container">
            {props.title}
        </button>
    );
};

export default Button;