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

export function styleLastWord(text: string): string | JSX.Element {
  const words = text.split(' ');

  if (words.length > 0) {
    const lastWord = words.pop();
    const remainingText = words.join(' ');

    return (
      <>
        {remainingText} <span className="text-[#F6911D]">{lastWord}</span>
      </>
    );
  }

  return text;
}
