export function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full bg-black bg-[url('/bg-hero.png')] bg-cover opacity-90" />
      <div className="fixed inset-0 -z-10 w-full h-full bg-black opacity-40" />
    </>
  );
}
