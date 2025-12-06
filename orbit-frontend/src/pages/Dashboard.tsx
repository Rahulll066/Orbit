import { Button } from '../components/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../components/Card';
import { CreateContentModel } from '../components/CreateContentModel';
import { CreateFolderModal } from '../components/CreateFolderModal';
import { Sidebar } from '../components/Sidebar';
import { useState } from 'react';

function Dashboard() {

  const [folders, setFolders] = useState<
    { name: string; cards: { title: string; link: string; type: "twitter" | "youtube" | "doc" }[] }[]
  >([]);

  const [currentFolderIndex, setCurrentFolderIndex] = useState<number | null>(null);

  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);

  // Create folder
  function createFolder(name: string) {
    const folder = { name, cards: [] };
    setFolders(prev => [...prev, folder]);
    setCurrentFolderIndex(folders.length);
  }

  // Rename folder
  function renameFolder(index: number, newName: string) {
    const updated = [...folders];
    updated[index].name = newName;
    setFolders(updated);
  }

  // Delete folder
  function deleteFolder(index: number) {
    const updated = folders.filter((_, i) => i !== index);
    setFolders(updated);

    if (updated.length === 0) {
      setCurrentFolderIndex(null);
    } else if (currentFolderIndex === index) {
      setCurrentFolderIndex(0);
    }
  }

  // Add content
  function addContent(title: string, link: string) {
    if (currentFolderIndex === null) return alert("Create a folder first!");

    let type: "twitter" | "youtube" | "doc" = "doc";
    if (link.includes("youtu")) type = "youtube";
    if (link.includes("twitter") || link.includes("x.com")) type = "twitter";

    const updated = [...folders];
    updated[currentFolderIndex].cards.push({ title, link, type });
    setFolders(updated);
  }

  // Delete card
  function deleteCard(cardIndex: number) {
    if (currentFolderIndex === null) return;

    const updated = [...folders];
    updated[currentFolderIndex].cards = updated[currentFolderIndex].cards.filter((_, i) => i !== cardIndex);
    setFolders(updated);
  }

  return (
    <div>
      {/* Sidebar */}
      <Sidebar
        folders={folders}
        currentFolderIndex={currentFolderIndex}
        onSelectFolder={setCurrentFolderIndex}
        openFolderModal={() => setFolderModalOpen(true)}
        onDeleteFolder={deleteFolder}
        onRenameFolder={renameFolder}
      />

      {/* Folder Modal */}
      <CreateFolderModal
        open={folderModalOpen}
        onClose={() => setFolderModalOpen(false)}
        onSubmit={(name) => {
          createFolder(name);
          setFolderModalOpen(false);
        }}
      />

      {/* Add Content Modal */}
      <CreateContentModel
        open={contentModalOpen}
        onClose={() => setContentModalOpen(false)}
        onSubmit={(title, link) => {
          addContent(title, link);
          setContentModalOpen(false);
        }}
      />

      <div className="p-4 ml-72 min-h-screen bg-slate-100">

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => setContentModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />

          <Button
            variant="secondary"
            text="Share Orbit"
            startIcon={<ShareIcon />}
          />
        </div>

        {/* No folder */}
        {currentFolderIndex === null && (
          <div className="text-gray-600 text-lg p-6">
            Create your first folder to begin.
          </div>
        )}

        {/* Cards */}
        {currentFolderIndex !== null && (
          <div className="flex flex-wrap pt-6">
            {folders[currentFolderIndex].cards.map((card, idx) => (
              <Card
                key={idx}
                type={card.type}
                link={card.link}
                title={card.title}
                onDelete={() => deleteCard(idx)}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;

