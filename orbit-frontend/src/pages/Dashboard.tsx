import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

import { CreateFolderModal } from "../components/CreateFolderModal";
import { RenameFolderModal } from "../components/RenameFolderModal";
import { CreateContentModel } from "../components/CreateContentModel";

type CardType = "twitter" | "youtube" | "doc";

interface CardItem {
  title: string;
  link: string;
  type: CardType;
}

interface FolderItem {
  name: string;
  cards: CardItem[];
}

export default function Dashboard() {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [currentFolderIndex, setCurrentFolderIndex] = useState<number | null>(null);

  const [addFolderModalOpen, setAddFolderModalOpen] = useState(false);
  const [renameFolderModalOpen, setRenameFolderModalOpen] = useState(false);
  const [renameIndex, setRenameIndex] = useState<number | null>(null);
  const [contentModalOpen, setContentModalOpen] = useState(false);

  // Create Folder
  function createFolder(name: string) {
    const newFolder = { name, cards: [] };
    setFolders((prev) => [...prev, newFolder]);
    setCurrentFolderIndex(folders.length);
  }

  // Rename Folder
  function renameFolder(index: number, newName: string) {
    const updated = [...folders];
    updated[index].name = newName;
    setFolders(updated);
  }

  // Delete Folder
  function deleteFolder(index: number) {
    const updated = folders.filter((_, i) => i !== index);
    setFolders(updated);
    setCurrentFolderIndex(null);
  }

  // Add Content (Card)
  function addContent(title: string, link: string) {
    if (currentFolderIndex === null) {
      alert("Create a folder first!");
      return;
    }

    let type: CardType = "doc";
    if (link.includes("youtu")) type = "youtube";
    if (link.includes("twitter") || link.includes("x.com")) type = "twitter";

    const updated = [...folders];
    updated[currentFolderIndex].cards.push({ title, link, type });

    setFolders(updated);
  }

  // Delete Card
  function deleteCard(cardIndex: number) {
    if (currentFolderIndex === null) return;

    const updated = [...folders];
    updated[currentFolderIndex].cards = updated[currentFolderIndex].cards.filter(
      (_c, i) => i !== cardIndex
    );

    setFolders(updated);
  }

  const currentFolder =
    currentFolderIndex !== null ? folders[currentFolderIndex] : null;

  return (
    <div className="flex">

      <Sidebar
        folders={folders}
        currentFolderIndex={currentFolderIndex}
        onSelectFolder={(i) => setCurrentFolderIndex(i)}
        openAddFolderModal={() => setAddFolderModalOpen(true)}
        openRenameFolderModal={(i) => {
          setRenameIndex(i);
          setRenameFolderModalOpen(true);
        }}
        onDeleteFolder={deleteFolder}
      />

      <CreateFolderModal
        open={addFolderModalOpen}
        onClose={() => setAddFolderModalOpen(false)}
        onSubmit={createFolder}
      />

      <RenameFolderModal
        open={renameFolderModalOpen}
        initialName={renameIndex !== null ? folders[renameIndex].name : ""}
        onClose={() => setRenameFolderModalOpen(false)}
        onSubmit={(newName) => renameFolder(renameIndex!, newName)}
      />

      <CreateContentModel
        open={contentModalOpen}
        onClose={() => setContentModalOpen(false)}
        onSubmit={({ title, link }) => {
          addContent(title, link);
          setContentModalOpen(false);
        }}
      />

      <main className="p-6 ml-72 min-h-screen bg-slate-100 w-full">

        {!currentFolder ? (
          <div className="text-center text-gray-600 mt-20">
            <h2 className="text-2xl font-semibold mb-4">
              Create a folder to get started
            </h2>
            <p>You can organize your content inside folders.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{currentFolder.name}</h1>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  text="Add Content"
                  startIcon={<PlusIcon />}
                  onClick={() => setContentModalOpen(true)}
                />
                <Button
                  variant="secondary"
                  text="Share Orbit"
                  startIcon={<ShareIcon />}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              {currentFolder.cards.map((c, i) => (
                <Card
                  key={i}
                  title={c.title}
                  link={c.link}
                  type={c.type}
                  onDelete={() => deleteCard(i)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}





