import type { FC, SVGProps } from "react";

const IconUp: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.26458 0.123639L9.85722 5.0965C10.1438 5.4068 9.97008 6 9.59264 6H0.40736C0.0299201 6 -0.14379 5.4068 0.142783 5.0965L4.73542 0.123639C4.88767 -0.0412131 5.11233 -0.0412126 5.26458 0.123639Z"
        fill="#7E8387"
      />
    </svg>
  );
};

export default IconUp;
