import classes from "./Badge.module.css";

const Badge = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={classes["badge-orange"]}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Badge;
