import VideoGenerator from "./VideoGenerator";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 flex flex-col items-center p-4 selection:bg-sky-500 selection:text-white">
        <VideoGenerator/>
      </div>
    </>
  );
}
