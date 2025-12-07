//@ts-ignore
import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  active
}: {
  text: string;
  icon: ReactElement;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center text-gray-700 cursor-pointer py-2 px-2 rounded 
      hover:bg-slate-100 ${active ? "bg-slate-200 font-medium" : ""}`}
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}



