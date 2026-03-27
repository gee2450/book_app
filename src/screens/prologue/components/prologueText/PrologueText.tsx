type PrologueTextProps = {
  lines: string[];
};

const PrologueText = ({ lines }: PrologueTextProps) => {
  return (
    <div className="flex flex-col items-center text-center mx-3">
      {lines.map((line, i) =>
        line === "" ? (
          <div
            key={i}
            className="h-6 opacity-0 animate-prologue-text"
            style={{
              animationDelay: `${i * 0.5}s`,
              animationFillMode: "forwards",
            }}
          />
        ) : (
          <p
            key={i}
            className="opacity-0 animate-prologue-text text-xl"
            style={{
              animationDelay: `${i * 0.5}s`,
              animationFillMode: "forwards",
            }}
          >
            {line}
          </p>
        )
      )}
    </div>
  );
};

export default PrologueText;