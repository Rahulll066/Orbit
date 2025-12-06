import { SidebarItem } from "./SidebarItem";
import { NewFolder } from "../icons/NewFolder";
import { Folder } from "../icons/Folder";
import { OrbitIcon } from "../icons/OrbitIcon";

interface SidebarProps {
  folders: { name: string }[];
  onNewFolder: (name: string) => void;
  onSelectFolder: (index: number) => void;
  currentFolderIndex: number | null;
}

export function Sidebar({ folders, onNewFolder, onSelectFolder, currentFolderIndex }: SidebarProps) {

  function create() {
    const name = prompt("Folder name?");
    if (name && name.trim() !== "") {
      onNewFolder(name.trim());
    }
  }

  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 pt-4">

      {/* Logo */}
      <div className="flex text-2xl items-center font-bold text-[#efb100] pt-2">
        <div className="pr-1">
          <OrbitIcon />
        </div>
        Orbit
      </div>

      {/* New Folder */}
      <div className="pt-8 pl-4 cursor-pointer" onClick={create}>
        <SidebarItem icon={<NewFolder />} text="New Folder" />
      </div>

      {/* Folder List */}
      <div className="pt-4 pl-4">
        {folders.map((folder, index) => (
          <div key={index} onClick={() => onSelectFolder(index)}>
            <SidebarItem 
              icon={<Folder />} 
              text={folder.name}
              active={currentFolderIndex === index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
