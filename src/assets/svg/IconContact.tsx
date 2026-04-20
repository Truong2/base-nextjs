import type { FC, SVGProps } from "react";

const IconContact: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.666504 4.35679V12C0.666504 13.1015 1.56498 14 2.6665 14H13.3332C14.4347 14 15.3332 13.1015 15.3332 12V4.35679L15.0426 4.55051L8.38214 9.21282C8.1526 9.3735 7.84708 9.3735 7.61753 9.21282L0.957068 4.5505L0.666504 4.35679Z"
        fill="#7E8387"
      />
      <path
        d="M15.0358 2.9526C14.6829 2.38173 14.0512 2 13.3332 2H2.6665C1.94851 2 1.31679 2.38173 0.963923 2.9526L1.70297 3.4453L1.71548 3.45385L7.99984 7.8529L14.2842 3.45385L14.2967 3.4453L15.0358 2.9526Z"
        fill="#7E8387"
      />
    </svg>
  );
};

export default IconContact;
