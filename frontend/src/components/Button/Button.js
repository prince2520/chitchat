import styled from "styled-components";
import PuffLoader from "react-spinners/PuffLoader";

import "./Button.css";

const CustomButton = styled.button`
  width: ${({ $width }) => $width || "100%"};
  max-width: ${({ $maxWidth }) => $maxWidth || "100%"};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor || "var(--primary)"};
  padding: 0.25rem 2rem;

  &:hover {
    background-color: var(--text);
    :is(h1, h2, h3, h4, h5, h6, p, svg) {
      color: ${({ $backgroundColor }) => $backgroundColor || "var(--primary)"};
    }
  }

  &:disabled {
    background-color: var(--text);
    :is(h1, h2, h3, h4, h5, h6, p, svg) {
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
  loading = (false),
  maxWidth = "100%"
}) => {
  return (
    <CustomButton
      $backgroundColor={backgroundColor}
      $width={width}
      $maxWidth={maxWidth}
      disabled={loading}
      onClick={() => (onClick ? onClick() : null)}
      type={type === "click" ? "click" : "submit"}
      className="flex-center cursor-btn button__container"
    > 
      <PuffLoader
        color={backgroundColor}
        loading={loading}
        size={"1.25rem"}
      />
      {!loading ? children : <h5>Loading</h5>}
    </CustomButton>
  );
};

export default Button;
