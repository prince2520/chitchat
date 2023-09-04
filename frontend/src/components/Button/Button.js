import './Button.css';
const Button = (props) => {
    return(
        <button
            onClick={()=>props.onClick ? props?.onClick() : null}
            type={(props.type === 'click') ? 'click' : 'submit'}
            className="button-container">
            {props.title}
        </button>
    );
};

export default Button;