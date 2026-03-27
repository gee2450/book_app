import { ui } from "@/assets/images";
import React from "react";


type HomeMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

function HomeMenuItem({
  icon,
  label,
  onClick,
}: HomeMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-col items-center justify-center",
        "gap-1",
        "text-sm",
        "leading-none",
        "cursor-pointer",
      ].join(" ")}
    >
      <span className="text-2xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}


const Icon = (file: string) => {
  return (
    <img
      src={file}
      alt={file}
      draggable={false}
      style={{ width: 50, height: 40, imageRendering: "pixelated" }}
    />
  )
}

type BottomNavigationProps = {
  onRecordClick?: () => void;
  onCollectionClick?: () => void;
  onSettingsClick?: () => void;
};

function HomeMenu({
  onRecordClick,
  onCollectionClick,
  onSettingsClick,
}: BottomNavigationProps) {
  return (
    <nav className="flex justify-around items-center">
      <HomeMenuItem
        icon={Icon(ui("record_icon.png"))}
        label="기록"
        onClick={onRecordClick}
      />
      <HomeMenuItem
        icon={Icon(ui("collection_icon.png"))}
        label="도감"
        onClick={onCollectionClick}
      />
      <HomeMenuItem
        icon={Icon(ui("setting_icon.png"))}
        label="설정"
        onClick={onSettingsClick}
      />
    </nav>
  );
}

export default HomeMenu;