import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef } from "react";

interface Props {
  open: boolean;
  onClose?: () => void;
  onSubmit: (title: string, link: string) => void;
}

export function CreateContentModel({ open, onClose, onSubmit }: Props) {

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  function handleSubmit() {
    const title = titleRef.current?.value || "";
    const link = linkRef.current?.value || "";

    if (!title || !link) return alert("Please fill both fields");

    onSubmit(title, link);
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md min-w-80">

        <div onClick={onClose} className="flex justify-end cursor-pointer">
          <CrossIcon />
        </div>

        <Input ref={titleRef} placeholder="Title" />
        <Input ref={linkRef} placeholder="Link" />

        <div className="flex justify-center mt-4">
          <Button variant="primary" text="Submit" onClick={handleSubmit} />
        </div>

      </div>
    </div>
  );
}
