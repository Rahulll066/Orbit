import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModel } from "../components/CreateContentModel";
import { CreateFolderModal } from "../components/CreateFolderModal";
import { RenameFolderModal } from "../components/RenameFolderModal";

import axios from "axios";
import { BACKEND_URL } from "../config";
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

  const token = localStorage.getItem("token");

  // -----------------------------------------
  // Load Folders on Dashboard Open
  // -----------------------------------------
  useEffect(() => {
    async function loadFolders() {
      try {
        const res = await axios.get(BACKEND_URL + "/api/v1/folders", {
          headers: { Authorization: token || "" }
        });

        // backend: { folders: [...] }
        const incoming: FolderItem[] = res.data.folders.map((f: any) => ({
          _id: f._id,
          name: f.name,
          cards: [] // content loaded when folder clicked
        }));

        setFolders(incoming);
      } catch (e) {
        console.error("Error loading folders", e);
      }
    }
    loadFolders();
  }, []);

  // -----------------------------------------
  // Select Folder + Load Its Content
  // -----------------------------------------
  async function onSelectFolder(index: number) {
    setCurrentFolderIndex(index);

    const folder = folders[index];
    if (!folder) return;

    try {
      const res = await axios.get(BACKEND_URL + "/api/v1/content", {
        params: { folderId: folder._id },
        headers: { Authorization: token || "" }
      });

      const content: CardItem[] = res.data.content;

      setFolders((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          cards: content
        };
        return updated;
      });
    } catch (e) {
      console.error("Error loading content", e);
    }
  }

  // -----------------------------------------
  // Create Folder
  // -----------------------------------------
  async function createFolder(name: string) {
    try {
      const res = await axios.post(
        BACKEND_URL + "/api/v1/folders",
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
    } catch (e) {
      console.error("Error creating folder", e);
    }
  }

  // -----------------------------------------
  // Rename Folder
  // -----------------------------------------
  async function renameFolder(index: number, newName: string) {
    const folder = folders[index];
    if (!folder) return;

    try {
      await axios.put(
        BACKEND_URL + "/api/v1/folders/" + folder._id,
        { name: newName },
        { headers: { Authorization: token || "" } }
      );

      setFolders((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], name: newName };
        return updated;
      });
    } catch (e) {
      console.error("Error renaming folder", e);
    }
  }

  // -----------------------------------------
  // Delete Folder
  // -----------------------------------------
  async function deleteFolder(index: number) {
    const folder = folders[index];
    if (!folder) return;

    try {
      await axios.delete(BACKEND_URL + "/api/v1/folders/" + folder._id, {
        headers: { Authorization: token || "" }
      });

      setFolders((prev) => prev.filter((_, i) => i !== index));
      setCurrentFolderIndex(null);
    } catch (e) {
      console.error("Error deleting folder", e);
    }
  }

  // -----------------------------------------
  // Add Content (Card)
  // -----------------------------------------
  async function addContent(title: string, link: string) {
    if (currentFolderIndex === null) return alert("Create/select a folder first");

    const folder = folders[currentFolderIndex];
    if (!folder) return;

    let type: CardType = "doc";
    const lower = (link || "").toLowerCase();

    if (lower.includes("youtu")) type = "youtube";
    else if (lower.includes("x.com") || lower.includes("twitter.com")) type = "twitter";

    try {
      await axios.post(
        BACKEND_URL + "/api/v1/content",
        {
          title,
          link,
          type,
          folderId: folder._id
        },
        { headers: { Authorization: token || "" } }
      );

      // re-fetch content for this folder to keep state clean
      const res = await axios.get(BACKEND_URL + "/api/v1/content", {
        params: { folderId: folder._id },
        headers: { Authorization: token || "" }
      });

      const content: CardItem[] = res.data.content;

      setFolders((prev) => {
        const updated = [...prev];
        updated[currentFolderIndex] = {
          ...updated[currentFolderIndex],
          cards: content
        };
        return updated;
      });
    } catch (e) {
      console.error("Error adding content", e);
    }
  }

  // -----------------------------------------
  // Delete Card
  // -----------------------------------------
  async function deleteCard(cardId: string) {
    if (currentFolderIndex === null) return;

    const folder = folders[currentFolderIndex];
    if (!folder) return;

    try {
      await axios.delete(BACKEND_URL + "/api/v1/content/" + cardId, {
        headers: { Authorization: token || "" }
      });

      setFolders((prev) => {
        const updated = [...prev];
        updated[currentFolderIndex].cards = updated[currentFolderIndex].cards.filter(
          (c) => c._id !== cardId
        );
        return updated;
      });
    } catch (e) {
      console.error("Error deleting content", e);
    }
  }

  const currentFolder =
    currentFolderIndex !== null ? folders[currentFolderIndex] : null;

  return (
    <div className="flex">
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

      {/* Create Folder */}
      <CreateFolderModal
        open={addFolderModalOpen}
        onClose={() => setAddFolderModalOpen(false)}
        onSubmit={createFolder}
      />

      {/* Rename Folder */}
      <RenameFolderModal
        open={renameFolderModalOpen}
        initialName={renameIndex !== null ? folders[renameIndex].name : ""}
        onClose={() => setRenameFolderModalOpen(false)}
        onSubmit={(newName) => renameFolder(renameIndex!, newName)}
      />

      {/* Add Content Modal */}
      <CreateContentModel
        open={contentModalOpen}
        onClose={() => setContentModalOpen(false)}
        onSubmit={(data) => {
          addContent(data.title, data.link);
          setContentModalOpen(false);
        }}
      />

      {/* Main Dashboard */}
      <main className="p-6 ml-72 min-h-screen bg-slate-100 w-full">
        {!currentFolder ? (
          <div className="text-center mt-32 text-gray-600">
            <h1 className="text-xl font-semibold">Create a folder to get started</h1>
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



