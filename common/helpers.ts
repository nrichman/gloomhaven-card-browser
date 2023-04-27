import { games } from "../data/games";
import { Card, Item, Spoilers } from "./types";

export const defaultDescription =
  "Gloomhaven Card Browser is a tool for viewing Ability, Item, Monster, and Event cards from the games Gloomhaven, Frosthaven, Forgotten Circles, Jaws of the Lion, Crimson Circles, and Trail of Ashes";
export const defaultTitle = "Gloomhaven Card Browser";

export function getBaseUrl(): string {
  return "https://raw.githubusercontent.com/cmlenius/gloomhaven-card-browser/images/images/";
}

const articles = new Set(["a", "an", "and", "of", "the"]);
const toTitleCase = (phrase: string | number) => {
  return phrase
    .toString()
    .toLowerCase()
    .split(" ")
    .map((word, i) =>
      i !== 0 && articles.has(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

export function getDescription(
  game: string,
  subject: string,
  cards: Card[]
): string {
  const gameName = games.find((g) => g.id === game)?.name;
  const description =
    gameName +
    " " +
    subject +
    "; " +
    cards.map((c) => toTitleCase(c.name)).join(", ");

  if (
    !gameName ||
    !subject ||
    !cards ||
    cards.length == 0 ||
    description.trim() == ""
  )
    return defaultDescription;

  return description.trim();
}

export function getTitle(game: string, subject: string): string {
  const gameName = games.find((g) => g.id === game)?.name;
  const title = gameName + " " + subject;

  if (!gameName || !subject || title.trim() == "") return defaultTitle;

  return title.trim();
}

export function verifyQueryParam(
  param: string | string[] | null,
  defaultValue?: string
): string | null {
  if (!param) return defaultValue;
  if (param instanceof Array) return param[0];
  return param;
}

export function getCharacterColor(char: string): string {
  const defaultColour = "#432423";
  return defaultColour;
}

interface SearchResult {
  name: number | string;
}

export function customSort(
  order: string,
  direction: string
): (a: SearchResult, b: SearchResult) => number {
  return (a, b) => {
    let sort = 1;
    if (a[order] > b[order]) {
      sort = 1;
    } else if (a[order] < b[order]) {
      sort = -1;
    } else {
      return a.name > b.name ? 1 : -1;
    }
    return direction === "asc" ? sort : -1 * sort;
  };
}

export function itemSpoilerFilter(spoilers: Spoilers): (item: Item) => boolean {
  return (card) => {
    if (spoilers.items.includes(card.id)) {
      return true;
    }
    return false;
  };
}
