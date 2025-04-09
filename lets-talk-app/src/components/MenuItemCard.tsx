"use client";
import Image from "next/image";
import React from "react";

interface MenuItemCardProps {
  img: string;
  title: string;
  bgColor: string;
  hoverColor: string;
  handleClick?: () => void;
}

const MenuItemCard = ({
  bgColor,
  img,
  title,
  hoverColor,
  handleClick,
}: MenuItemCardProps) => {
  return (
    <section
      className={`${bgColor} ${hoverColor} max-h-60 max-w-[250px]  origin-center menu-item-card shadow-2xl`}
      onClick={handleClick}
    >
      <div>
        <Image src={img} alt="meeting" width={50} height={50} />
      </div>

      <div className=" ">
        <h1 className=" text-xl text-white w-full font-black text-center">{title}</h1>
      </div>
    </section>
  );
};

export default MenuItemCard;
