import styled from "styled-components";

import "./Button.css";

const CustomButton = styled.button`
  width: ${({$width}) => $width || "100%"};
  background-color: ${({$backgroundColor}) => $backgroundColor || "var(--primary)"};

  &:hover {
    background-color: var(--text);
    :is(h1, h2, h3, h4, h5, h6, p) {
      color: ${({$backgroundColor}) => $backgroundColor || "var(--primary)"};
    }
  }

  &:disabled {
    background-color: var(--text);
    :is(h1, h2, h3, h4, h5, h6, p) {
      color: var(--primary);
    }
  }
`;

const Button = ({
  type,
  onClick,
  width,
  backgroundColor,
  children,
  disabled = false,
}) => {
  return (
    <CustomButton
      $backgroundColor={backgroundColor}
      $width={width}
      disabled={disabled}
      onClick={() => (onClick ? onClick() : null)}
      type={type === "click" ? "click" : "submit"}
      className="flex-center cursor-btn button__container"
    >
      {children}
    </CustomButton>
  );
};

export default Button;
