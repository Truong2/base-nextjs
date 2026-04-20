import type { ReactNode } from "react";

const LayoutContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex-auto overflow-y-auto bg-white">
      {children}
    </div>
  );
};

export default LayoutContent;
