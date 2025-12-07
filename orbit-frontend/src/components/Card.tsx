import { NotebookIcon } from "../icons/NotebookIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";

interface CardProps {
  title: string;
  link: string;
  onDelete?: () => void;
}

// Detect type purely from URL (no backend)
function detectType(url: string): "youtube" | "twitter" | "instagram" | "doc" {
  const lower = url.toLowerCase();
  if (lower.includes("youtu")) return "youtube";
  if (lower.includes("twitter.com") || lower.includes("x.com")) return "twitter";
  if (lower.includes("instagram.com")) return "instagram";
  return "doc";
}

// ---------- Normalizers ----------

// YouTube embed url
function getYoutubeEmbed(url: string): string {
  try {
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch {}
  return url;
}

// Google Docs embed url
function getDocsEmbed(url: string): string {
  try {
    return url
      .replace(/\/edit.*/, "/preview")
      .replace(/\/view.*/, "/preview");
  } catch {
    return url;
  }
}

// Twitter/X via twitframe (no widget.js needed)
function getTwitterEmbed(url: string): string {
  try {
    return "https://twitframe.com/show?url=" + encodeURIComponent(url);
  } catch {
    return url;
  }
}

// Instagram post / reel embed
function getInstagramEmbed(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    // Ensure path ends with '/'
    let path = url.pathname;
    if (!path.endsWith("/")) path += "/";
    // /p/{id}/embed or /reel/{id}/embed
    return `https://www.instagram.com${path}embed`;
  } catch {
    return urlStr;
  }
}

export function Card({ title, link, onDelete }: CardProps) {
  const type = detectType(link);

  let embedSrc = "";
  let iframeClass = "w-full rounded-md";

  if (type === "youtube") {
    embedSrc = getYoutubeEmbed(link);
    iframeClass += " aspect-video";
  } else if (type === "twitter") {
    embedSrc = getTwitterEmbed(link);
    iframeClass += " aspect-video";
  } else if (type === "instagram") {
    embedSrc = getInstagramEmbed(link);
    // Reels are vertical; give them more height
    iframeClass += " h-[550px]";
  } else {
    // Google Doc or generic link
    embedSrc = getDocsEmbed(link);
    iframeClass += " h-[500px]";
  }

  return (
    <div className="bg-white rounded-md outline-gray-300 p-4 
      border m-4 
      w-full sm:w-[350px] lg:w-[420px] 
      shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            <NotebookIcon />
          </div>
          {title}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600"
          >
            <ShareIcon />
          </a>
          <button
            onClick={onDelete}
            className="text-gray-600 hover:text-red-500"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="pt-4">
        <iframe
          className={iframeClass}
          src={embedSrc}
          title={title}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}



