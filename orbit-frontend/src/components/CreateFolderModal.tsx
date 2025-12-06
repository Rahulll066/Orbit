import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export function CreateFolderModal({ open, onClose, onSubmit }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  function handleSubmit() {
    const name = nameRef.current?.value || "";
    if (!name.trim()) return alert("Folder name cannot be empty.");
    onSubmit(name.trim());
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md min-w-80">
        <div onClick={onClose} className="flex justify-end cursor-pointer">
          <CrossIcon />
        </div>

        <Input ref={nameRef} placeholder="Folder Name" />

        <div className="flex justify-center mt-4">
          <Button variant="primary" text="Create Folder" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
