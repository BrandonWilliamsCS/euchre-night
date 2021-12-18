import React from "react";
import { Stack } from "@mui/material";

import { Player } from "data/Player";
import { PlayerDisplay } from "displays/PlayerDisplay";
import { SelectButtonList } from "./SelectButtonList";

export interface PlayerSelectControlProps {
  onSelect: (player: Player) => void;
  selectedPlayer: Player | undefined;
}

export const PlayerSelectControl: React.FC<PlayerSelectControlProps> = ({
  onSelect,
  selectedPlayer,
}) => {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      <SelectButtonList<Player>
        onSelect={onSelect}
        currentValue={selectedPlayer}
        items={players.map((player) => ({
          buttonSx: { flexGrow: 1 },
          value: player,
          display: <PlayerDisplay player={player} />,
        }))}
      />
    </Stack>
  );
};

const players: Player[] = [
  {
    name: "Brandon",
    displayName: "The Great Brandini",
    color: "#FF00FF",
  },
  {
    name: "Angelique",
    displayName: "Angelique",
    color: "#800000",
  },
  {
    name: "Persephone",
    displayName: "Persephone",
    color: "#80FFFF",
  },
  {
    name: "Rupert",
    displayName: "The Pert",
    color: "#FFD000",
  },
];
