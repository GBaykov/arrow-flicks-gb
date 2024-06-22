import classes from './ChevronIcon.module.css';

const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={classes.chevronIcon}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M5 9L11.2191 14.3306C11.6684 14.7158 12.3316 14.7158 12.7809 14.3306L19 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default ChevronIcon;
