import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef } from "react";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; link: string }) => void;
}

export function CreateContentModel({ open, onClose, onSubmit }: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  return (
    <div className="w-screen h-screen bg-black/40 fixed inset-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-80">

        <div className="flex justify-end cursor-pointer" onClick={onClose}>
          <CrossIcon />
        </div>

        <h2 className="text-lg font-semibold mb-3">Add Content</h2>

        <Input ref={titleRef} placeholder="Title" />
        <Input ref={linkRef} placeholder="Link" />

        <div className="flex justify-center mt-4">
          <Button
            variant="primary"
            text="Add"
            onClick={() => {
              const title = titleRef.current?.value || "";
              const link = linkRef.current?.value || "";

              if (!title.trim() || !link.trim()) return;

              onSubmit({ title, link });
            }}
          />
        </div>
      </div>
    </div>
  );
}



