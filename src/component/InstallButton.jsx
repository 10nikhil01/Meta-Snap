"use client";

import { usePWAInstall } from "@/utils/usePWAInstall";

export default function InstallButton() {
  const { isInstallable, installPWA } = usePWAInstall();

  const handleInstall = async () => {
    await installPWA();
  };
  if (!isInstallable) return null;
  return (
    <div className="fixed w-full bottom-4 px-4 inset-x-0 z-50">
      <button
        onClick={handleInstall}
        className="flex w-fit  items-center gap-4 rounded-lg bg-orange-400/20 border text-nowrap border-orange-600 p-4 text-lg text-white shadow transition hover:bg-orange-500 max-sm:w-full lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
          <rect x="3" y="19" width="18" height="2" rx="1" ry="1" />
        </svg>
        <span>Install the App</span>
      </button>
    </div>
  );
}
