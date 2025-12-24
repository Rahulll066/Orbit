import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModel } from "../components/CreateContentModel";
import { CreateFolderModal } from "../components/CreateFolderModal";
import { RenameFolderModal } from "../components/RenameFolderModal";

import axios from "axios";
import { useEffect, useState } from "react";

type CardType = "twitter" | "youtube" | "doc";

interface CardItem {
  _id: string;
  title: string;
  link: string;
  type: CardType;
  folderId: string;
}

interface FolderItem {
  _id: string;
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

  // 🔥 Mobile sidebar state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const token = localStorage.getItem("token");

  // -----------------------------
  // Load folders
  // -----------------------------
  useEffect(() => {
    async function loadFolders() {
      const res = await axios.get("/api/v1/folders", {
        headers: { Authorization: token || "" }
      });

      const data: FolderItem[] = res.data.folders.map((f: any) => ({
        _id: f._id,
        name: f.name,
        cards: []
      }));

      setFolders(data);
    }

    loadFolders();
  }, []);

  // -----------------------------
  // Select folder
  // -----------------------------
  async function onSelectFolder(index: number) {
    setCurrentFolderIndex(index);
    setMobileSidebarOpen(false); // auto-close on mobile

    const folder = folders[index];
    if (!folder) return;

    const res = await axios.get("/api/v1/content", {
      params: { folderId: folder._id },
      headers: { Authorization: token || "" }
    });

    setFolders((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], cards: res.data.content };
      return updated;
    });
  }

  // -----------------------------
  // Folder CRUD
  // -----------------------------
  async function createFolder(name: string) {
    const res = await axios.post(
      "/api/v1/folders",
      { name },
      { headers: { Authorization: token || "" } }
    );

    const newFolder: FolderItem = {
      _id: res.data.folder._id,
      name: res.data.folder.name,
      cards: []
    };

    setFolders((prev) => [...prev, newFolder]);
    setCurrentFolderIndex(folders.length);
  }

  async function renameFolder(index: number, name: string) {
    const folder = folders[index];
    if (!folder) return;

    await axios.put(
      "/api/v1/folders/" + folder._id,
      { name },
      { headers: { Authorization: token || "" } }
    );

    setFolders((prev) => {
      const updated = [...prev];
      updated[index].name = name;
      return updated;
    });
  }

  async function deleteFolder(index: number) {
    const folder = folders[index];
    if (!folder) return;

    await axios.delete("/api/v1/folders/" + folder._id, {
      headers: { Authorization: token || "" }
    });

    setFolders((prev) => prev.filter((_, i) => i !== index));
    setCurrentFolderIndex(null);
  }

  // -----------------------------
  // Content CRUD
  // -----------------------------
  async function addContent(title: string, link: string) {
    if (currentFolderIndex === null) return;

    const folder = folders[currentFolderIndex];
    let type: CardType = "doc";

    if (link.includes("youtu")) type = "youtube";
    else if (link.includes("x.com") || link.includes("twitter")) type = "twitter";

    await axios.post(
      "/api/v1/content",
      { title, link, type, folderId: folder._id },
      { headers: { Authorization: token || "" } }
    );

    onSelectFolder(currentFolderIndex);
  }

  async function deleteCard(cardId: string) {
    if (currentFolderIndex === null) return;

    await axios.delete("/api/v1/content/" + cardId, {
      headers: { Authorization: token || "" }
    });

    onSelectFolder(currentFolderIndex);
  }

  const currentFolder =
    currentFolderIndex !== null ? folders[currentFolderIndex] : null;

  return (
    <div className="flex">

      {/* ---------------- Desktop Sidebar ---------------- */}
      <div className="hidden md:block">
        <Sidebar
          folders={folders}
          currentFolderIndex={currentFolderIndex}
          onSelectFolder={onSelectFolder}
          openAddFolderModal={() => setAddFolderModalOpen(true)}
          openRenameFolderModal={(i) => {
            setRenameIndex(i);
            setRenameFolderModalOpen(true);
          }}
          onDeleteFolder={deleteFolder}
        />
      </div>

      {/* ---------------- Mobile Sidebar Overlay ---------------- */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 md:hidden transition-opacity ${
          mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileSidebarOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-white shadow-lg
          transform transition-transform duration-300
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <div className="flex justify-end p-3">
            <button onClick={() => setMobileSidebarOpen(false)}>❌</button>
          </div>

          <Sidebar
            folders={folders}
            currentFolderIndex={currentFolderIndex}
            onSelectFolder={onSelectFolder}
            openAddFolderModal={() => {
              setAddFolderModalOpen(true);
              setMobileSidebarOpen(false);
            }}
            openRenameFolderModal={(i) => {
              setRenameIndex(i);
              setRenameFolderModalOpen(true);
              setMobileSidebarOpen(false);
            }}
            onDeleteFolder={(i) => {
              deleteFolder(i);
              setMobileSidebarOpen(false);
            }}
          />
        </div>
      </div>

      {/* ---------------- Modals ---------------- */}
      <CreateFolderModal
        open={addFolderModalOpen}
        onClose={() => setAddFolderModalOpen(false)}
        onSubmit={createFolder}
      />

      <RenameFolderModal
        open={renameFolderModalOpen}
        initialName={renameIndex !== null ? folders[renameIndex].name : ""}
        onClose={() => setRenameFolderModalOpen(false)}
        onSubmit={(name) => renameFolder(renameIndex!, name)}
      />

      <CreateContentModel
        open={contentModalOpen}
        onClose={() => setContentModalOpen(false)}
        onSubmit={(data) => {
          addContent(data.title, data.link);
          setContentModalOpen(false);
        }}
      />

      {/* ---------------- Main Content ---------------- */}
      <main className="p-4 md:p-6 md:ml-72 w-full bg-slate-100 min-h-screen">

        {!currentFolder ? (
          <div className="text-center mt-32 text-gray-600">
            <button
              className="md:hidden mb-4 px-4 py-2 border rounded"
              onClick={() => setMobileSidebarOpen(true)}
            >
              ☰ Open Folders
            </button>

            <h1 className="text-xl font-semibold">Create a folder to get started</h1>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  className="md:hidden px-3 py-2 border rounded text-sm"
                  onClick={() => setMobileSidebarOpen(true)}
                >
                  ☰
                </button>

                <h1 className="text-xl sm:text-2xl font-bold truncate">{currentFolder.name}</h1>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="primary"
                  text="Add Content"
                  startIcon={<PlusIcon />}
                  onClick={() => setContentModalOpen(true)}
                  fullWidth
                />
                <Button
                  variant="secondary"
                  text="Share Orbit"
                  startIcon={<ShareIcon />}
                  fullWidth
                />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {currentFolder.cards.map((c) => (
                <Card
                  key={c._id}
                  title={c.title}
                  link={c.link}
                  onDelete={() => deleteCard(c._id)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}




