import './Button.css';
const Button = (props) => {
    return(
        <button
            type={(props.type === 'click') ? 'click' : 'submit'}
            className="button-container">
            {props.title}
        </button>
    );
};

export default Button;