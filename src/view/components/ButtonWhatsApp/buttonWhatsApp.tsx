import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppButton() {
  return (
    <button
      onClick={() =>
        window.open(
          'https://api.whatsapp.com/send?phone=+5511994458337&text=Ol%C3%A1,%20Tudo%20bem?%0A%0AEu%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20DIY%20LAB...',
          '_blank',
        )
      }
      className="fixed bottom-8 right-5 bg-green-500 text-white rounded-full p-4 text-3xl cursor-pointer hover:bg-green-600"
    >
      <FaWhatsapp />
    </button>
  );
}

export default WhatsAppButton;
