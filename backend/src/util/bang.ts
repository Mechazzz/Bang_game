import { z } from "zod";
import { CardSchema, CharacterSchema, RoleSchema } from "../model";

type Card = z.infer<typeof CardSchema>;
type Character = z.infer<typeof CharacterSchema>;
type Role = z.infer<typeof RoleSchema>;

export const createDeck = () => {
  const bang: Omit<Card, "signature"> = {
    title: "Bang",
    isInstant: true,
    imgUrl: "pistolUrl",
  };

  const missed: Omit<Card, "signature"> = {
    title: "Nem talált!",
    isInstant: true,
    imgUrl: "missedUrl",
  };

  const beer: Omit<Card, "signature"> = {
    title: "Sör",
    isInstant: true,
    imgUrl: "beerUrl",
  };

  const panic: Omit<Card, "signature"> = {
    title: "Pánik!",
    isInstant: true,
    imgUrl: "panicUrl",
  };

  const catBalou: Omit<Card, "signature"> = {
    title: "Cat Balou",
    isInstant: true,
    imgUrl: "catBalouUrl",
  };

  const duel: Omit<Card, "signature"> = {
    title: "Párbaj",
    isInstant: true,
    imgUrl: "duelUrl",
  };

  const cart: Omit<Card, "signature"> = {
    title: "Postakocsi",
    isInstant: true,
    imgUrl: "cartUrl",
  };

  const store: Omit<Card, "signature"> = {
    title: "Szatócsbolt",
    isInstant: true,
    imgUrl: "storeUrl",
  };

  const indians: Omit<Card, "signature"> = {
    title: "Indiánok!",
    isInstant: true,
    imgUrl: "indiansUrl",
  };

  const wellsFargo: Omit<Card, "signature"> = {
    title: "Wells Fargo",
    isInstant: true,
    imgUrl: "wellsUrl",
  };

  const gatling: Omit<Card, "signature"> = {
    title: "Gatling",
    isInstant: true,
    imgUrl: "gatlingUrl",
  };

  const pub: Omit<Card, "signature"> = {
    title: "Kocsma",
    isInstant: true,
    imgUrl: "pubUrl",
  };

  const schofield: Omit<Card, "signature"> = {
    title: "Schofield (2)",
    isInstant: false,
    imgUrl: "schofieldUrl",
  };

  const vulcanic: Omit<Card, "signature"> = {
    title: "Gyorstüzelő (1)",
    isInstant: false,
    imgUrl: "vulcanicUrl",
  };

  const remington: Omit<Card, "signature"> = {
    title: "Remington (3)",
    isInstant: false,
    imgUrl: "vulcanicUrl",
  };

  const gun: Omit<Card, "signature"> = {
    title: "Gépkarabély (4)",
    isInstant: false,
    imgUrl: "gunUrl",
  };

  const winchester: Omit<Card, "signature"> = {
    title: "Winchester (5)",
    isInstant: false,
    imgUrl: "vulcanicUrl",
  };

  const prison: Omit<Card, "signature"> = {
    title: "Börtön",
    isInstant: false,
    imgUrl: "prisonUrl",
  };

  const barrel: Omit<Card, "signature"> = {
    title: "Hordó",
    isInstant: false,
    imgUrl: "barrelUrl",
  };

  const mustang: Omit<Card, "signature"> = {
    title: "Musztáng",
    isInstant: false,
    imgUrl: "mustangUrl",
  };

  const telescope: Omit<Card, "signature"> = {
    title: "Távcső",
    isInstant: false,
    imgUrl: "telescopeUrl",
  };

  const dynamite: Omit<Card, "signature"> = {
    title: "Dinamit",
    isInstant: false,
    imgUrl: "dynamiteUrl",
  };

  const cardsWithoutSignatures: Omit<Card, "signature">[] = [
    ...Array.from({ length: 25 }, () => ({ ...bang })),
    ...Array.from({ length: 12 }, () => ({ ...missed })),
    ...Array.from({ length: 6 }, () => ({ ...beer })),
    ...Array.from({ length: 4 }, () => ({ ...panic })),
    ...Array.from({ length: 4 }, () => ({ ...catBalou })),
    ...Array.from({ length: 3 }, () => ({ ...duel })),
    ...Array.from({ length: 2 }, () => ({ ...cart })),
    ...Array.from({ length: 2 }, () => ({ ...store })),
    ...Array.from({ length: 2 }, () => ({ ...indians })),
    ...Array.from({ length: 1 }, () => ({ ...wellsFargo })),
    ...Array.from({ length: 1 }, () => ({ ...gatling })),
    ...Array.from({ length: 1 }, () => ({ ...pub })),
    ...Array.from({ length: 3 }, () => ({ ...schofield })),
    ...Array.from({ length: 2 }, () => ({ ...vulcanic })),
    ...Array.from({ length: 1 }, () => ({ ...remington })),
    ...Array.from({ length: 1 }, () => ({ ...gun })),
    ...Array.from({ length: 1 }, () => ({ ...winchester })),
    ...Array.from({ length: 3 }, () => ({ ...prison })),
    ...Array.from({ length: 2 }, () => ({ ...barrel })),
    ...Array.from({ length: 2 }, () => ({ ...mustang })),
    ...Array.from({ length: 1 }, () => ({ ...telescope })),
    ...Array.from({ length: 1 }, () => ({ ...dynamite })),
  ];

  let shuffled = cardsWithoutSignatures
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const signs = ["kőr", "káró", "treff", "pikk"];
  const numbers = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ];

  const cards: Card[] = [];

  let index = 0;
  for (const sign of signs) {
    for (const number of numbers) {
      const card = shuffled[index];
      cards.push({
        ...card,
        signature: {
          sign,
          number,
        },
      });
      index += 1;
    }
  }

  const deck = cards
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return deck;
};

export const getCharacters = (number: number) => {
  const BartCassidy: Character = {
    name: "Bart Cassidy",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const CalamityJanet: Character = {
    name: "Calamity Janet",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const ElGringo: Character = {
    name: "El Gringo",
    imgUrl: "",
    description: "",
    life: 3,
  };

  const JesseJones: Character = {
    name: "Jesse Jones",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const Jourdannis: Character = {
    name: "Jourdannis",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const KitCarlson: Character = {
    name: "Kit Carlson",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const LuckyDuke: Character = {
    name: "Lucky Duke",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const PaulRegret: Character = {
    name: "Paul Regret",
    imgUrl: "",
    description: "",
    life: 3,
  };

  const PedroRamirez: Character = {
    name: "Pedro Ramirez",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const SidKetchum: Character = {
    name: "Sid Ketchum",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const SlabTheKiller: Character = {
    name: "Slab the Killer",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const SuzyLafayette: Character = {
    name: "Suzy Lafayette",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const VultureSam: Character = {
    name: "Vulture Sam",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const WillyTheKid: Character = {
    name: "Willy the Kid",
    imgUrl: "",
    description: "",
    life: 4,
  };

  const deck = [
    WillyTheKid,
    VultureSam,
    SuzyLafayette,
    SidKetchum,
    SlabTheKiller,
    PedroRamirez,
    PaulRegret,
    LuckyDuke,
    KitCarlson,
    Jourdannis,
    JesseJones,
    ElGringo,
    CalamityJanet,
    BartCassidy,
  ]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, number);

  return deck;
};

export const getRoles = (number: number): Role[] => {
  const characters: Role[] = [
    { name: "Sheriff", imgUrl: "" },
    { name: "Renegade", imgUrl: "" },
    { name: "Bandit", imgUrl: "" },
    { name: "Bandit", imgUrl: "" },
    { name: "Deputy", imgUrl: "" },
    { name: "Bandit", imgUrl: "" },
    { name: "Deputy", imgUrl: "" },
  ];

  const neededCharacters = characters.slice(0, number);

  return neededCharacters
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
