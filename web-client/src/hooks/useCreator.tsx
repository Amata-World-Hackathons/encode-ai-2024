"use client";

import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

export function useCreator() {
  let creatorId = "";

  if (typeof window !== "undefined") {
    creatorId = localStorage.getItem("creator_id") || "";

    if (!creatorId) {
      creatorId = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: "-",
        style: "lowerCase",
      });

      localStorage.setItem("creator_id", creatorId);
    }
  }

  return creatorId;
}
