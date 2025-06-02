const LabeledInput = ({ field, button }) => {
  const { label, error, errorMessage, ...inputProps } = field;
  return (
    <div>
      <label htmlFor={inputProps.id}>{label}</label>
      <input {...inputProps} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {button && (
        <button
          type="button"
          onClick={button.onClick}
          className={button.className}
          style={button.style}
        >
          {button.text}
        </button>
      )}
    </div>
  );
};

export default LabeledInput;
