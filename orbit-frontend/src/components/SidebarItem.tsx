//@ts-ignore
import { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  active?: boolean;
}

export function SidebarItem({ text, icon, active }: SidebarItemProps) {
  return (
    <div
      className={`
        flex text-gray-700 cursor-pointer py-2 pr-4 rounded-md
        ${active ? "bg-yellow-100 font-semibold" : "hover:bg-slate-100"}
      `}
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}


