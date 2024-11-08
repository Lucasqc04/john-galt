export function styleFirstWord(text: string): string | JSX.Element {
  const words = text.split(' ');

  if (words.length > 0) {
    const firstWord = words.shift();
    const remainingText = words.join(' ');

    return (
      <>
        <span className="text-orange-primary">{firstWord}</span> {remainingText}
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
        {remainingText} <span className="text-orange-primary">{lastWord}</span>
      </>
    );
  }

  return text;
}

export function styleThreeWordsAfterFourth(text: string): string | JSX.Element {
  const words = text.split(' ');

  if (words.length > 4) {
    const firstPart = words.slice(0, 4).join(' ');
    const styledWords = words.slice(4, 7).join(' ');
    const remainingPart = words.slice(7).join(' ');

    return (
      <>
        {firstPart}
        <span className="text-orange-primary"> {styledWords} </span>
        {remainingPart}
      </>
    );
  }

  return text;
}
