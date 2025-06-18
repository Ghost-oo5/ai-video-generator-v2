import React, { useEffect } from "react";
import { MediaDisplayProps } from "../types";

export const MediaDisplay = ({
  title,
  imageUrl,
  videoScript,
  isLoading,
  altText,
  showPlaceholder = true,
  placeholderText = "Generated content will appear here.",
  downloadFileName = "generated_content.txt",
}: MediaDisplayProps) => {
  const handleDownloadScript = () => {
    if (!videoScript) return;
    const blob = new Blob([videoScript], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  useEffect(() => {
    if (imageUrl) {
      console.log("Image URL: found");
    }
  }, [imageUrl]);

  if (isLoading) {
    return (
      <div className="mt-6 p-4 bg-slate-700/30 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center min-h-[200px]">
        <h3 className="text-lg font-semibold text-sky-400 mb-2">{title}</h3>
        <p className="text-slate-400">Loading content...</p>
      </div>
    );
  }

  if (!imageUrl && !videoScript && showPlaceholder) {
    return (
      <div className="mt-6 p-4 bg-slate-700/30 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center min-h-[200px]">
        <h3 className="text-lg font-semibold text-sky-400 mb-2">{title}</h3>
        <p className="text-slate-400 text-center">{placeholderText}</p>
      </div>
    );
  }

  if (!imageUrl && !videoScript) {
    return null; 
  }

  return (
    <div className="mt-6 w-full bg-slate-700/50 p-4 rounded-lg shadow-lg border border-slate-600">
      <h3 className="text-xl font-semibold text-sky-300 mb-3">{title}</h3>
      {imageUrl && (
        <div className="group relative w-full aspect-video bg-white rounded-lg overflow-hidden border border-slate-500 mb-4">
          <div className="absolute inset-0 bg-white">
            <img
              src={imageUrl}
              alt={altText || "Generated AI image"}
              className="w-full  object-cover"
              // style={{ maxHeight: "600px" }}
              onError={(e) => {
                console.error("Image failed to load:", e);
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
              }}
              onLoad={(e) => {
                console.log("Image loaded successfully");
                const img = e.target as HTMLImageElement;
                console.log(
                  "Image dimensions:",
                  img.naturalWidth,
                  "x",
                  img.naturalHeight
                );
              }}
            />
          </div>
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
            <a
              href={imageUrl}
              download={
                altText
                  ? `${altText.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.jpeg`
                  : `generated-image-${Date.now()}.jpeg`
              }
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-md hover:bg-sky-600"
            >
              Download Image
            </a>
          </div>
        </div>
      )}
      {videoScript && (
        <div>
          <div
            className="script-display mb-4"
            role="document"
          >
            {videoScript}
          </div>
          <button
            onClick={handleDownloadScript}
            className="px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-md hover:bg-sky-600 transition-colors"
          >
            Download Script
          </button>
        </div>
      )}
    </div>
  );
};
