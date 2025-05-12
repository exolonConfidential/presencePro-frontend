// components/AuroraOutlineText.tsx
const AuroraLetter = ({ letter }: { letter: string }) => (
  <span className="aurora-text inline-block mx-[2px] cursor-default select-none md:text-[4rem] text-[3rem]">
    {letter}
  </span>
);

export default function AuroraText({lines}:{lines:string}) {
  const text = lines;

  return (
    <div className="flex items-center justify-center p-2">
      <h1 className="flex flex-wrap justify-center">
        {text.split("").map((char, i) => (
          <AuroraLetter key={i} letter={char === " " ? "\u00A0" : char} />
        ))}
      </h1>
    </div>
  );
}
