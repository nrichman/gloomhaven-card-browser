node items.js
echo "$(echo -n 'import { Item } from "../common/types"; export const itemCards: Record<string, Item[]> = '; cat item-cards.js)" > item-cards.js
prettier --write item-cards.js
mv item-cards.js ../data/item-cards.ts