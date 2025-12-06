import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { Sidebar } from '../components/Sidebar'
import { useState } from 'react'

function Dashboard() {

  const [folders, setFolders] = useState<
    { name: string; cards: { title: string; link: string; type: "youtube" | "twitter" | "doc" }[] }[]
  >([]);

  const [currentFolderIndex, setCurrentFolderIndex] = useState<number | null>(null);

  const [contentModalOpen, setContentModalOpen] = useState(false);

  // Add Folder
  function createFolder(name: string) {
    setFolders(prev => [...prev, { name, cards: [] }]);
    setCurrentFolderIndex(folders.length); // switch to new folder
  }

  // Add Content inside selected folder
  function addContent(title: string, link: string) {
    if (currentFolderIndex === null) return alert("Create a folder first!");

    let type: "twitter" | "youtube" | "doc" = "doc";
    if (link.includes("youtu")) type = "youtube";
    if (link.includes("twitter") || link.includes("x.com")) type = "twitter";

    const updated = [...folders];
    updated[currentFolderIndex].cards.push({ title, link, type });
    setFolders(updated);
  }

  return (
    <div>
      <Sidebar
        folders={folders}
        onNewFolder={createFolder}
        onSelectFolder={setCurrentFolderIndex}
        currentFolderIndex={currentFolderIndex}
      />

      <div className="p-4 ml-72 min-h-screen bg-slate-100">

        <CreateContentModel 
          open={contentModalOpen}
          onClose={() => setContentModalOpen(false)}
          onSubmit={(title, link) => {
            addContent(title, link);
            setContentModalOpen(false);
          }}
        />

        {/* Buttons */}
        <div className='flex justify-end gap-2'>
          <Button 
            onClick={() => setContentModalOpen(true)}
            variant='primary' 
            text='Add Content' 
            startIcon={<PlusIcon />} 
          />

          <Button 
            variant='secondary' 
            text='Share Orbit' 
            startIcon={<ShareIcon />} 
          />
        </div>

        {/* No folder selected */}
        {currentFolderIndex === null && (
          <div className="p-6 text-xl text-gray-700">
            Create your first folder to begin.
          </div>
        )}

        {/* Show Cards */}
        {currentFolderIndex !== null && (
          <div className='flex flex-wrap pt-6'>
            {folders[currentFolderIndex].cards.map((card, idx) => (
              <Card 
                key={idx}
                type={card.type}
                link={card.link}
                title={card.title}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
