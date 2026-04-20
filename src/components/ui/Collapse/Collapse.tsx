import { cn } from "~/utils/utils";
import { type CollapseProps } from "./Collapse.types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Collapse = ({ header, className, content }: CollapseProps) => {
  const [isExpand, setIsExpand] = useState(false);

  const handleClickCollapse = () => {
    setIsExpand(!isExpand);
  };

  return (
    <div className={cn("border-neutral-10 border-[1px] bg-white", className)}>
      <div
        className="flex justify-between gap-10 p-6"
        onClick={handleClickCollapse}
      >
        <div
          className={cn(
            "text-primary-middle  text-justify text-xl font-semibold leading-6"
          )}
        >
          {header}
        </div>

        <div>
          {isExpand ? (
            <ChevronDown size={24} className="text-green-gray" />
          ) : (
            <ChevronRight size={24} className="text-green-gray" />
          )}
        </div>
      </div>

      {isExpand ? (
        <div className={"text-secondary p-6 font-medium "}>{content}</div>
      ) : null}
    </div>
  );
};
