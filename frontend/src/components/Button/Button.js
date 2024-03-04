import "./Button.css";
import styled from "styled-components";


const Button = ({ type, onClick, width, backgroundColor, children, disabled=false }) => {
  const Button = styled.button`
    width: ${width};
    background-color: ${backgroundColor};

    &:hover {
      background-color: var(--text);
      :is(h1, h2, h3, h4, h5, h6, p) {
        color: ${backgroundColor};
      }
    };

    &:disabled {
      background-color: var(--text);
      :is(h1, h2, h3, h4, h5, h6, p) {
        color: var(--primary)
      }
      
    }
  `;
  return (
    <Button 
      disabled={disabled}
      onClick={() => (onClick ? onClick() : null)}
      type={type === "click" ? "click" : "submit"}
      className="flex-center cursor-btn button-container"
    >
      {children}
    </Button>
  );
};

export default Button;
