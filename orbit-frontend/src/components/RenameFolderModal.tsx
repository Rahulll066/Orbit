import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useState, useEffect } from "react";

export function RenameFolderModal({
  open,
  onClose,
  onSubmit,
  initialName
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialName: string;
}) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  if (!open) return null;

  return (
    <div className="w-screen h-screen fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-80">

        <div className="flex justify-end cursor-pointer" onClick={onClose}>
          <CrossIcon />
        </div>

        <h2 className="text-lg font-semibold mb-3">Rename Folder</h2>

        <Input
          placeholder="Folder name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />

        <div className="flex justify-center mt-4">
          <Button
            variant="primary"
            text="Save"
            onClick={() => {
              if (name.trim()) onSubmit(name.trim());
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
