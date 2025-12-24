import { useEffect, useRef } from "react";
import { NotebookIcon } from "../icons/NotebookIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";

interface CardProps {
  title: string;
  link: string;
  onDelete?: () => void;
}

function detectType(url: string) {
  const u = url.toLowerCase();
  if (u.includes("youtu")) return "youtube";
  if (u.includes("x.com") || u.includes("twitter.com")) return "twitter";
  if (u.includes("instagram.com")) return "instagram";
  return "doc";
}
function getTwitterEmbedLink(url: string): string {
  try {
    let normalized = url.replace("x.com", "twitter.com");
    if (normalized.includes("?")) {
      normalized = normalized.split("?")[0];
    }
    return normalized;
  } catch {
    return "";
  }
}
function getYoutubeEmbed(url: string) {
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}
function getDocsEmbed(url: string) {
  return url.replace(/\/edit.*/, "/preview").replace(/\/view.*/, "/preview");
}
function getInstagramEmbed(urlStr: string) {
  try {
    const url = new URL(urlStr);
    let path = url.pathname;
    if (!path.endsWith("/")) path += "/";
    return `https://www.instagram.com${path}embed`;
  } catch {
    return urlStr;
  }
}

export function Card({ title, link, onDelete }: CardProps) {
  const type = detectType(link);
  const tweetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (type !== "twitter") return;
    if (!document.getElementById("twitter-wjs")) {
      const script = document.createElement("script");
      script.id = "twitter-wjs";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
    const interval = setInterval(() => {
      if ((window as any).twttr?.widgets) {
        (window as any).twttr.widgets.load(tweetRef.current);
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [type, link]);

  let embed = null;

  if (type === "twitter") {
    const embedUrl = getTwitterEmbedLink(link);

    embed = (
      <div ref={tweetRef}>
        <blockquote className="twitter-tweet">
          <a href={embedUrl}></a>
        </blockquote>
      </div>
    );
  }

  if (type === "youtube") {
    embed = (
      <iframe
        className="w-full aspect-video rounded-md"
        src={getYoutubeEmbed(link)}
        allowFullScreen
      />
    );
  }

  if (type === "instagram") {
    embed = (
      <iframe
        className="w-full h-[550px] rounded-md"
        src={getInstagramEmbed(link)}
        allowFullScreen
      />
    );
  }

  if (!embed) {
    embed = (
      <iframe
        className="w-full h-[500px] rounded-md"
        src={getDocsEmbed(link)}
      />
    );
  }

  return (
    <div className="bg-white rounded-md p-4 border shadow-sm 
      w-full sm:w-[350px] lg:w-[420px] m-4">

      <div className="flex justify-between items-center">
        <div className="flex items-center text-md">
          <span className="text-gray-500 pr-2"><NotebookIcon /></span>
          {title}
        </div>

        <div className="flex items-center gap-3">
          <a href={link} target="_blank" className="text-gray-600">
            <ShareIcon />
          </a>
          <button onClick={onDelete} className="text-gray-600 hover:text-red-500">
            <TrashIcon />
          </button>
        </div>
      </div>

      <div className="pt-4">{embed}</div>
    </div>
  );
}





