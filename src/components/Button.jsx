import "../css/button.css";

const Button = ({ onClick, text, type = "button", className = "", style }) => (
  <button
    className={`button ${className}`}
    onClick={onClick}
    type={type}
    style={style}
  >
    {text}
  </button>
);

export default Button;
