import { useState } from "react";

interface CreateContentModelProps {
  open: boolean;
  onClose?: () => void;
}

export function CreateContentModel({open, onClose}: CreateContentModelProps) {
    return <div>
        {open && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60
        flex justify-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white p-4 rounded-md">
                 hi there
                </span>
            </div>
        </div>}
    </div>
}