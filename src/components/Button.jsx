import "../css/Button.css";

const Button = ({ onClick, text, type = "button" }) => (
  <button className="button" onClick={onClick} type={type}>
    {text}
  </button>
);

export default Button;
