import React from "react";
import { styled } from "@mui/material";

import ClubsImg from "./clubs.svg";
import DiamondsImg from "./diamonds.svg";
import HeartsImg from "./hearts.svg";
import NoTrumpImg from "./notrump.svg";
import SpadesImg from "./spades.svg";

export interface SuitDisplayProps {
  className?: string;
  suit: string;
}

export const SuitDisplay: React.FC<SuitDisplayProps> = ({
  className,
  suit,
}) => {
  const suitImgSrc = resolveSuitImgSrc(suit);
  return <SuitImg src={suitImgSrc} alt={suit} className={className} />;
};

function resolveSuitImgSrc(suit: string): string {
  switch (suit) {
    case "clubs":
      return ClubsImg;
    case "diamonds":
      return DiamondsImg;
    case "hearts":
      return HeartsImg;
    case "spades":
      return SpadesImg;
    default:
      return NoTrumpImg;
  }
}

const SuitImg = styled("img")({ height: 55 });
