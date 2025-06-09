import {
  CodeXml,
  KeyRound,
  SquareChartGantt,
  SquareChevronRight,
} from "lucide-react";
import { JSX } from "react";
import { Separator } from "./ui/separator";

interface TileType {
  id: number;
  title: string;
  description: string;
  Icon: JSX.Element;
}

const tiles: TileType[] = [
  {
    id: 1,
    title: "Vast Problem Library",
    description:
      "Access diverse collection of coding problems across various topics and difficulty levels. Challenge yourself with beginner to expert level tak and enhance your coding skills",
    Icon: <KeyRound />,
  },
  {
    id: 2,
    title: "Detailed Problem Description",
    description:
      "Each problem comes with clear and comprehensive descriptions, including input/output examples. Understand the task at hand and approach each problem with confidence",
    Icon: <SquareChartGantt />,
  },
  {
    id: 3,
    title: "Seamless Coding",
    description:
      "Code directly on platform with our interactive coding environment. Write, test and submit your solutions seamlessly without needing any external tools.",
    Icon: <CodeXml />,
  },
  {
    id: 4,
    title: "Multilingual Support",
    description:
      "Solve problems using your preffered programming language. Our platform supports multiple languages, allowing you to code comfortably in the language you excel at.",
    Icon: <SquareChevronRight />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="relative z-10 text-center text-4xl font-medium lg:text-5xl">
          How It Works
        </h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:gap-14 px-2 sm:px-0 py-2 sm:py-0">
          {tiles.map((tile: TileType) => (
            <FeatureTile key={tile.id} {...tile} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureTile({ Icon, description, title }: TileType) {
  return (
    <div className="flex flex-col px-6 gap-2 dark:bg-transparent">
      <div className="flex flex-row gap-2">
        <div className="flex items-center justify-center">{Icon}</div>
        <h3 className="text-lg">{title}</h3>
      </div>
      <Separator className=" w-full font-thin text-sm" />
      <div className="text-gray-600 dark:text-white">{description}</div>
    </div>
  );
}
