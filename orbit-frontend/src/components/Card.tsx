import { NotebookIcon } from "../icons/NotebookIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { TrashIcon } from "../icons/TrashIcon"
import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "doc";
}

export function Card({ title, link, type }: CardProps) {
  // Load X (Twitter) embed script dynamically
  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type, link]);

  // Convert YouTube links safely
  const getYoutubeEmbedLink = (url: string) => {
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url;
  };

  // Convert Google Docs links to embed form
  const getGoogleDocEmbedLink = (url: string) => {
    if (url.includes("/edit")) {
      return url.replace("/edit", "/preview");
    }
    return url;
  };

  return (
    <div className="bg-white rounded-md outline-gray-300 p-4 max-w-72 border">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            <NotebookIcon />
          </div>
          {title}
        </div>
        <div className="flex items-center">
          <div className="text-gray-500 pr-2">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ShareIcon />
            </a>
          </div>
          <div className="text-gray-500">
            <TrashIcon />
          </div>
        </div>
      </div>

      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md"
            src={getYoutubeEmbedLink(link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {type === "doc" && (
          <iframe
            className="w-full h-96 rounded-md border"
            src={getGoogleDocEmbedLink(link)}
            title="Google Doc"
            frameBorder="0"
          ></iframe>
        )}
      </div>
    </div>
  );
}
