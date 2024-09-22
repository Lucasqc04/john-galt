import { FaMoon, FaSun } from 'react-icons/fa';

type ThemeToggleButtonProps = {
  onClick: () => void;
};

export function ThemeToggleButton({ onClick }: ThemeToggleButtonProps) {
  return (
    <label className="inline-flex items-center relative cursor-pointer">
      <input
        className="peer hidden"
        id="toggle"
        type="checkbox"
        onClick={onClick}
      />
      <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
      <FaSun
        className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]"
        style={{ position: 'absolute', left: '13px' }}
      />
      <FaMoon
        className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]"
        style={{ position: 'absolute', right: '13px' }}
      />
    </label>
  );
}
