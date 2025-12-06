import { NotebookIcon } from "../icons/NotebookIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: string;
  onDelete?: () => void;
}

// Convert Twitter/X link to embed-safe format
function normalizeTweetLink(url: string) {
  if (url.includes("x.com")) {
    return url.replace("x.com", "twitter.com");
  }
  return url;
}

// Convert Google Docs link
function normalizeGoogleDocs(url: string) {
  if (url.includes("/edit")) return url.replace("/edit", "/preview");
  if (url.includes("/view")) return url.replace("/view", "/preview");
  return url;
}

// YouTube embed
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

export function Card({ title, link, type, onDelete }: CardProps) {
  
  // Load Twitter script only once
  useEffect(() => {
    if (type !== "twitter") return;

    if (!document.querySelector("script#twitter-widgets")) {
      const script = document.createElement("script");
      script.id = "twitter-widgets";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Re-render Twitter embeds
    if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [type, link]);

  const safeTwitterLink = normalizeTweetLink(link);
  const safeDocsLink = normalizeGoogleDocs(link);
  const safeYouTubeLink = normalizeYouTube(link);

  return (
    <div className="bg-white rounded-md outline-gray-300 p-4 max-w-72 border m-2">
      
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2"><NotebookIcon /></div>
          {title}
        </div>

        <div className="flex items-center gap-3">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-500">
            <ShareIcon />
          </a>

          <div className="cursor-pointer text-gray-600" onClick={onDelete}>
            <TrashIcon />
          </div>
        </div>
      </div>

      <div className="pt-4">

        {/* YouTube */}
        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md"
            src={safeYouTubeLink}
            allowFullScreen
          ></iframe>
        )}

        {/* Twitter */}
        {type === "twitter" && (
          <blockquote className="twitter-tweet" data-dnt="true">
            <a href={safeTwitterLink}></a>
          </blockquote>
        )}

        {/* Google Docs */}
        {type === "doc" && (
          <iframe
            className="w-full h-96 rounded-md border"
            src={safeDocsLink}
          ></iframe>
        )}
      </div>
    </div>
  );
}
