import { FC } from "react";
import Image from "next/image";

interface SidebarItemProps {
  label: string;
  image: string;
  handleOnClick: () => void;
}

const SidebarItem: FC<SidebarItemProps> = ({ label, image, handleOnClick }) => {
  return (
    <div
      className="flex p-4 hover:bg-[#2C3680] hover:rounded-r-full"
      onClick={handleOnClick}
    >
      <Image src={image} width={18} height={18} alt="icon" />
      <p className=" ml-4 text-sm text-white">{label}</p>
    </div>
  );
};

export default SidebarItem;
