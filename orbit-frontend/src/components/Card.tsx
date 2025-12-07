import { NotebookIcon } from "../icons/NotebookIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  onDelete?: () => void;
}

// Detect type purely from URL
function detectType(url: string) {
  const lower = url.toLowerCase();
  if (lower.includes("youtu")) return "youtube";
  if (lower.includes("twitter") || lower.includes("x.com")) return "twitter";
  return "doc";
}

// Convert Twitter/X link
function normalizeTweetLink(url: string) {
  return url.replace("x.com", "twitter.com");
}

// Convert Google Docs link
function normalizeGoogleDocs(url: string) {
  return url
    .replace("/edit", "/preview")
    .replace("/view", "/preview");
}

// Convert YouTube link
function normalizeYouTube(url: string) {
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}

export function Card({ title, link, onDelete }: CardProps) {
  
  const type = detectType(link);

  // Initialize Twitter embed script
  useEffect(() => {
    if (type !== "twitter") return;

    if (!document.querySelector("#twitter-widgets")) {
      const script = document.createElement("script");
      script.id = "twitter-widgets";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // re-render embed
    if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [type, link]);

  return (
    <div className="bg-white rounded-md outline-gray-300 p-4 max-w-72 border m-2">

      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2"><NotebookIcon /></div>
          {title}
        </div>

        <div className="flex items-center">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-500 pr-2">
            <ShareIcon />
          </a>
          <button className="text-gray-500 hover:text-red-500" onClick={onDelete}>
            <TrashIcon />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="pt-4">

        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md"
            src={normalizeYouTube(link)}
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={normalizeTweetLink(link)}></a>
          </blockquote>
        )}

        {type === "doc" && (
          <iframe
            className="w-full h-96 rounded-md border"
            src={normalizeGoogleDocs(link)}
          ></iframe>
        )}

      </div>
    </div>
  );
}


