const LabeledInput = ({ field }) => {
  const { label, error, ...inputProps } = field;
  return (
    <div>
      <label htmlFor={inputProps.id}>{label}</label>
      <input {...inputProps} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default LabeledInput;
