import { SidebarItem } from "./SidebarItem";
import { NewFolder } from "../icons/NewFolder";
import { Folder } from "../icons/Folder";
import { OrbitIcon } from "../icons/OrbitIcon";

interface SidebarProps {
  folders: { name: string }[];
  currentFolderIndex: number | null;
  onSelectFolder: (index: number) => void;
  openFolderModal: () => void;
  onDeleteFolder: (index: number) => void;
  onRenameFolder: (index: number, newName: string) => void;
}

export function Sidebar({
  folders,
  currentFolderIndex,
  onSelectFolder,
  openFolderModal,
  onDeleteFolder,
  onRenameFolder
}: SidebarProps) {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 pt-4">

      {/* Logo */}
      <div className="flex text-2xl items-center font-bold text-[#efb100] pt-2">
        <div className="pr-1"><OrbitIcon /></div>
        Orbit
      </div>

      {/* New Folder */}
      <div className="pt-8 pl-4 cursor-pointer" onClick={openFolderModal}>
        <SidebarItem icon={<NewFolder />} text="New Folder" />
      </div>

      {/* Folder List */}
      <div className="pt-4 pl-4">
        {folders.map((folder, index) => (
          <div key={index} className="flex items-center justify-between pr-4">
            
            <div onClick={() => onSelectFolder(index)} className="flex-1">
              <SidebarItem
                icon={<Folder />}
                text={folder.name}
                active={currentFolderIndex === index}
              />
            </div>

            {/* Rename */}
            <div
              className="cursor-pointer text-blue-500 mr-2"
              onClick={(e) => {
                e.stopPropagation();
                const newName = prompt("Rename folder:", folder.name);
                if (newName && newName.trim()) {
                  onRenameFolder(index, newName.trim());
                }
              }}
            >
              ✏️
            </div>

            {/* Delete */}
            <div
              className="cursor-pointer text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFolder(index);
              }}
            >
              🗑
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

