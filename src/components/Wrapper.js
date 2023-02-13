// Wrapper.js

export default function Wrapper({ children }) {
  const style = {
    border: "2px solid black",
    padding: "16px",
  };
  return <div style={style}>{children}</div>;
}
