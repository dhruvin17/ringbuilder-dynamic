const SortIcon = ({ isRotated = false}) => {
    return (
      <svg
        className={`icon icon-caret w-5 h-5 ml-2 inline-block transition-transform duration-200 ${isRotated ? "rotate-180" : ""}`}
        viewBox="0 0 10 6"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708"
          clipRule="evenodd"
        ></path>
      </svg>
    );
  };
  
  export default SortIcon;
  