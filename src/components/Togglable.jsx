import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, ref) => {
  const { defaultVisible = false } = props;
  const [visible, setVisible] = useState(defaultVisible);

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
