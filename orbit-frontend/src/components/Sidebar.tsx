import { SidebarItem } from "./SidebarItem";
import { NewFolder } from "../icons/NewFolder";
import { Folder } from "../icons/Folder";
import { OrbitIcon } from "../icons/OrbitIcon";
import { RenameIcon } from "../icons/Rename";
import { TrashIcon } from "../icons/TrashIcon";

interface SidebarProps {
  folders: { name: string }[];
  currentFolderIndex: number | null;
  onSelectFolder: (index: number) => void;
  openAddFolderModal: () => void;
  openRenameFolderModal: (index: number) => void;
  onDeleteFolder: (index: number) => void;
}

export function Sidebar({
  folders,
  currentFolderIndex,
  onSelectFolder,
  openAddFolderModal,
  openRenameFolderModal,
  onDeleteFolder
}: SidebarProps) {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 pt-4">

      {/* Logo */}
      <div className="flex text-2xl items-center font-bold text-[#efb100] pt-2">
        <div className="pr-1"><OrbitIcon /></div>
        Orbit
      </div>

      {/* Add Folder */}
      <div className="pt-8 pl-4 cursor-pointer" onClick={openAddFolderModal}>
        <SidebarItem icon={<NewFolder />} text="New Folder" />
      </div>

      {/* Folder List */}
      <div className="pt-4 pl-4">
        {folders.map((folder, index) => (
          <div key={index} className="flex items-center justify-between pr-4">

            {/* Click to open folder */}
            <div className="flex-1" onClick={() => onSelectFolder(index)}>
              <SidebarItem
                icon={<Folder />}
                text={folder.name}
                active={currentFolderIndex === index}
              />
            </div>

            {/* Rename */}
            <div
              className="cursor-pointer mr-2 p-1 rounded hover:bg-slate-200 text-gray-500"
              onClick={(e) => {
                e.stopPropagation();
                openRenameFolderModal(index);
              }}
            >
              <RenameIcon />
            </div>

            {/* Delete */}
            <div
              className="cursor-pointer p-1 rounded hover:bg-slate-200 text-gray-500"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFolder(index);
              }}
            >
              <TrashIcon />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

