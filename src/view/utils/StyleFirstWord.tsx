export function styleFirstWord(text: string): string | JSX.Element {
  const words = text.split(' ');

  if (words.length > 0) {
    const firstWord = words.shift();
    const remainingText = words.join(' ');

    return (
      <>
        <span className="text-[#F6911D]">{firstWord}</span> {remainingText}
      </>
    );
  }

  return text;
}
