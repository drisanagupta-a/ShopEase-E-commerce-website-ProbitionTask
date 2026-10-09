import "../styles/Toast.css";

function Toast({ message, type }) {
  return (
    <div
      className={`toast toast-${type}`}
      role="status"
      aria-live="polite"
    >
      <span>{message}</span>
    </div>
  );
}

export default Toast;