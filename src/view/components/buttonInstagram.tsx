import { FaInstagram } from 'react-icons/fa';

function InstagramButton() {
  return (
    <button
      onClick={() =>
        window.open(
          'https://www.instagram.com/alfredp2p/', // Substitua pelo link do seu perfil no Instagram
          '_blank',
        )
      }
      title="Instagram Button"
      className="fixed bottom-8 right-20 text-pink-500 rounded-full p-4 text-3xl cursor-pointer hover:text-pink-600"
    >
      <FaInstagram />
    </button>
  );
}

export default InstagramButton;
