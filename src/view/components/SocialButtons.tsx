import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function SocialButtons() {
  return (
    <div className="fixed bottom-8 right-5 flex flex-col mb-16">
      <button
        onClick={() =>
          window.open('https://www.instagram.com/alfredp2p/', '_blank')
        }
        title="Instagram Button"
        className="text-pink-500 rounded-full p-4 text-3xl cursor-pointer hover:text-pink-600"
      >
        <FaInstagram />
      </button>

      <button
        onClick={() => window.open('https://x.com/alfredp2p', '_blank')}
        title="X Button"
        className="text-white rounded-full p-4 text-3xl cursor-pointer hover:text-gray-400"
      >
        <FaXTwitter />
      </button>
    </div>
  );
}

export default SocialButtons;
