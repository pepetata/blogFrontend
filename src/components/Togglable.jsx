import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible((v) => !v);

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <>
      {typeof props.children === "function"
        ? props.children(visible, toggleVisibility)
        : visible && props.children}
    </>
  );
});

export default Togglable;
