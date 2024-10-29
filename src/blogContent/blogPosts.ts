import image1 from './1.png';
import image2 from './2.png';
import image3 from './3.png';
import image4 from './4.png';
import image5 from './5.png';

type Language = 'pt' | 'en' | 'es';

type Image = { src: string; width?: string; height?: string } | string;

export const blogData: Record<
  string,
  {
    translations: {
      [key in Language]: {
        title: string;
        subtitle: string;
        sections: {
          title: string;
          content: string;
          image?: Image;
          layout:
            | 'left-text-right-image'
            | 'right-text-left-image'
            | 'text-only';
        }[];
      };
    };
  }
> = {
  krux: {
    translations: {
      pt: {
        title: 'Krux: A melhor Carteira Bitcoin Air Gap e DIY',
        subtitle:
          'Uma carteira Bitcoin que te permite ter o maior nível de customização e segurança',
        sections: [
          {
            title: 'O que é Krux',
            content: `A Krux é uma carteira de Bitcoin inovadora 100% open-source que destaca-se por sua segurança e autonomia. 
              Em um cenário onde as criptomoedas ganham popularidade, a Krux se sobressai ao oferecer uma solução de armazenamento segura 
              e fácil de usar, ideal tanto para iniciantes quanto para usuários experientes.
              

              O diferencial da Krux está em seus recursos de segurança avançados. Ao contrário de outras carteiras que dependem de conexões 
              como Bluetooth ou NFC e atualizações enviadas por empresas, a Krux elimina esses riscos, não permitindo conexões à internet. 
              Além disso, a geração das 12 ou 24 palavras-chave é feita por um sistema entrópico exclusivo, garantindo que a escolha 
              seja única e protegida contra hacks.`,
            image: image1,
            layout: 'text-only',
          },
          {
            title: 'Principais Funcionalidades',
            content: `- Air-Gap (Armazenamento Offline): As chaves privadas são mantidas em um ambiente seguro e desconectado, reduzindo a exposição a malware e ataques cibernéticos.
              - Geração Manual de Entropia: Diferentemente da maioria das carteiras, a Krux permite que você use uma foto para garantir a aleatoriedade na criação de sua chave privada.
              - Carteira Amnésica: O sistema não armazena suas chaves privadas ou senhas, eliminando a necessidade de elementos seguros para proteger o hardware contra invasões físicas.`,
            image: { src: image2, width: '75%', height: 'auto' },
            layout: 'left-text-right-image',
          },
          {
            title: 'Funcionalidades Complementares',
            content: `- Carteira Isca: O sistema possui um processo de autenticação que garante que apenas você pode acessar e realizar transações em sua carteira.
              - Interface Amigável: A Krux oferece uma interface intuitiva, facilitando o gerenciamento de suas criptomoedas, mesmo para iniciantes.
              - Acesso Descentralizado: Em caso de perda ou roubo do dispositivo, você pode acessar seu saldo através de um dos quatro aplicativos descentralizados do Bitcoin.`,
            image: { src: image3, width: '100%', height: 'auto' },
            layout: 'text-only',
          },
          {
            title: 'Como receber e enviar seus Bitcoins',
            content: `A KRUX foi desenvolvida com base no código do Bitcoin, o que a torna compatível com os principais aplicativos da rede, como Blue, Sparrow, Nunchuk e Specter.

              Durante o processo de criação da chave privada, o usuário pode se conectar a um desses aplicativos apenas para visualizar o saldo e receber transferências. 
              Isso facilita o gerenciamento diário, pois não é necessário ter o dispositivo físico em mãos para receber transações.

              O objetivo é manter seu saldo sempre offline e protegido pela KRUX. Assim, toda vez que você desejar sacar seus Bitcoins, será necessário validar a transação 
              com a ajuda do leitor de QR Code do dispositivo. No entanto, caso não seja possível adquirir um novo aparelho em caso de perda, o usuário pode recuperar 
              seu saldo online utilizando um dos quatro aplicativos da rede.`,
            image: { src: image4, width: '100%', height: 'auto' },
            layout: 'left-text-right-image',
          },
          {
            title: 'Conclusão',
            content: `A Krux representa uma evolução significativa no armazenamento de criptomoedas, combinando segurança robusta com uma interface amigável e opções de personalização. 
              Ao escolher a Krux, você não apenas protege seus ativos digitais, mas também se torna um participante ativo no crescente ecossistema de criptomoedas.

              Empresas como a DIY SEC LAB são fundamentais nesse processo, oferecendo kits completos e suporte para garantir que a autocustódia seja realizada de ponta a ponta. 
              Isso assegura não apenas a segurança total do Bitcoin, mas também um armazenamento eficaz da chave privada, que é essencial.

              Se você busca uma maneira segura e eficiente de gerenciar suas criptomoedas, a Krux é a solução ideal. Com a crescente adoção das criptomoedas, investir em uma 
              carteira que prioriza a segurança e a autonomia é uma decisão sábia. Experimente a Krux e descubra uma nova forma de interagir com o universo das criptomoedas!`,
            image: { src: image5, width: '80%', height: 'auto' },
            layout: 'text-only',
          },
        ],
      },
      en: {
        title: 'Krux: The Best Air Gap Bitcoin Wallet and DIY',
        subtitle:
          'A Bitcoin wallet that allows you the highest level of customization and security',
        sections: [
          {
            title: 'What is Krux',
            content: `Krux is an innovative 100% open-source Bitcoin wallet that stands out for its security and autonomy. 
              In a scenario where cryptocurrencies gain popularity, Krux excels by offering a secure and easy-to-use storage solution, 
              ideal for both beginners and experienced users.
              
              The difference with Krux lies in its advanced security features. Unlike other wallets that rely on connections 
              like Bluetooth or NFC and updates sent by companies, Krux eliminates these risks by not allowing internet connections. 
              Additionally, the generation of 12 or 24 key phrases is done by a unique entropy system, ensuring that the choice 
              is unique and protected against hacks.`,
            image: { src: image1, width: '100%', height: 'auto' },
            layout: 'text-only',
          },
          {
            title: 'Main Features',
            content: `- Air-Gap (Offline Storage): Private keys are kept in a secure and disconnected environment, reducing exposure to malware and cyber attacks.
              - Manual Entropy Generation: Unlike most wallets, Krux allows you to use a photo to ensure randomness in creating your private key.
              - Amnesiac Wallet: The system does not store your private keys or passwords, eliminating the need for secure elements to protect the hardware against physical intrusions.`,
            image: { src: image2, width: '75%', height: 'auto' },
            layout: 'left-text-right-image',
          },
          {
            title: 'Complementary Features',
            content: `- Decoy Wallet: The system has an authentication process that ensures that only you can access and perform transactions in your wallet.
              - User-Friendly Interface: Krux offers an intuitive interface, making it easy to manage your cryptocurrencies, even for beginners.
              - Decentralized Access: In case of loss or theft of the device, you can access your balance through one of the four decentralized Bitcoin apps.`,
            image: { src: image3, width: '100%', height: 'auto' },
            layout: 'text-only',
          },
          {
            title: 'How to Receive and Send Your Bitcoins',
            content: `KRUX was developed based on Bitcoin's code, making it compatible with the main network applications like Blue, Sparrow, Nunchuk, and Specter.

              During the process of creating the private key, the user can connect to one of these applications only to view the balance and receive transfers. 
              This facilitates daily management, as you do not need to have the physical device on hand to receive transactions.

              The goal is to keep your balance always offline and protected by KRUX. Thus, every time you wish to withdraw your Bitcoins, it will be necessary to validate the transaction 
              with the help of the device's QR Code reader. However, if it is not possible to acquire a new device in case of loss, the user can recover 
              their balance online using one of the four network applications.`,
            image: { src: image4, width: '100%', height: 'auto' },
            layout: 'left-text-right-image',
          },
          {
            title: 'Conclusion',
            content: `Krux represents a significant evolution in cryptocurrency storage, combining robust security with a user-friendly interface and customization options. 
              By choosing Krux, you not only protect your digital assets but also become an active participant in the growing cryptocurrency ecosystem.

              Companies like DIY SEC LAB are crucial in this process, offering complete kits and support to ensure that self-custody is carried out end-to-end. 
              This ensures not only total security of Bitcoin but also effective storage of the private key, which is essential.

              If you are looking for a secure and efficient way to manage your cryptocurrencies, Krux is the ideal solution. With the growing adoption of cryptocurrencies, investing in a 
              wallet that prioritizes security and autonomy is a wise decision. Try Krux and discover a new way to interact with the cryptocurrency universe!`,
            image: { src: image5, width: '80%', height: 'auto' },
            layout: 'text-only',
          },
        ],
      },
      es: {
        title: 'Krux: La mejor billetera de Bitcoin Air Gap y DIY',
        subtitle:
          'Una billetera de Bitcoin que te permite tener el mayor nivel de personalización y seguridad',
        sections: [
          {
            title: 'Qué es Krux',
            content: `Krux es una billetera de Bitcoin innovadora 100% de código abierto que se destaca por su seguridad y autonomía. 
              En un escenario donde las criptomonedas ganan popularidad, Krux se destaca al ofrecer una solución de almacenamiento segura 
              y fácil de usar, ideal tanto para principiantes como para usuarios experimentados.
              
              La diferencia de Krux radica en sus características de seguridad avanzadas. A diferencia de otras billeteras que dependen de conexiones 
              como Bluetooth o NFC y actualizaciones enviadas por empresas, Krux elimina estos riesgos al no permitir conexiones a internet. 
              Además, la generación de 12 o 24 frases clave se realiza mediante un sistema único de entropía, lo que garantiza que la elección 
              sea única y protegida contra hacks.`,
            image: { src: image1, width: '100%', height: 'auto' },
            layout: 'text-only',
          },
          {
            title: 'Funciones Principales',
            content: `- Air-Gap (Almacenamiento Offline): Las claves privadas se mantienen en un entorno seguro y desconectado, reduciendo la exposición a malware y ataques cibernéticos.
              - Generación Manual de Entropía: A diferencia de la mayoría de las billeteras, Krux te permite usar una foto para garantizar la aleatoriedad en la creación de tu clave privada.
              - Billetera Amnésica: El sistema no almacena tus claves privadas o contraseñas, eliminando la necesidad de elementos seguros para proteger el hardware contra intrusiones físicas.`,
            image: { src: image2, width: '75%', height: 'auto' },
            layout: 'left-text-right-image',
          },
          {
            title: 'Funciones Complementarias',
            content: `- Billetera Cebo: El sistema tiene un proceso de autenticación que garantiza que solo tú puedes acceder y realizar transacciones en tu billetera.
              - Interfaz Amigable: Krux ofrece una interfaz intuitiva, facilitando la gestión de tus criptomonedas, incluso para principiantes.
              - Acceso Descentralizado: En caso de pérdida o robo del dispositivo, puedes acceder a tu saldo a través de una de las cuatro aplicaciones descentralizadas de Bitcoin.`,
            image: { src: image3, width: '100%', height: 'auto' },
            layout: 'text-only',
          },
          {
            title: 'Cómo recibir y enviar tus Bitcoins',
            content: `KRUX fue desarrollado con base en el código de Bitcoin, lo que lo hace compatible con las principales aplicaciones de la red como Blue, Sparrow, Nunchuk y Specter.

              Durante el proceso de creación de la clave privada, el usuario puede conectarse a una de estas aplicaciones solo para ver el saldo y recibir transferencias. 
              Esto facilita la gestión diaria, ya que no es necesario tener el dispositivo físico en manos para recibir transacciones.

              El objetivo es mantener tu saldo siempre offline y protegido por KRUX. Así, cada vez que desees retirar tus Bitcoins, será necesario validar la transacción 
              con la ayuda del lector de códigos QR del dispositivo. Sin embargo, si no es posible adquirir un nuevo aparato en caso de pérdida, el usuario puede recuperar 
              su saldo online utilizando una de las cuatro aplicaciones de la red.`,
            image: { src: image4, width: '100%', height: 'auto' },
            layout: 'left-text-right-image',
          },
          {
            title: 'Conclusión',
            content: `Krux representa una evolución significativa en el almacenamiento de criptomonedas, combinando seguridad robusta con una interfaz amigable y opciones de personalización. 
              Al elegir Krux, no solo proteges tus activos digitales, sino que también te conviertes en un participante activo en el creciente ecosistema de criptomonedas.

              Empresas como DIY SEC LAB son fundamentales en este proceso, ofreciendo kits completos y soporte para garantizar que la autocustodia se realice de punta a punta. 
              Esto asegura no solo la seguridad total del Bitcoin, sino también un almacenamiento efectivo de la clave privada, que es esencial.

              Si buscas una forma segura y eficiente de gestionar tus criptomonedas, Krux es la solución ideal. Con la creciente adopción de las criptomonedas, invertir en una 
              billetera que prioriza la seguridad y la autonomía es una decisión sabia. Prueba Krux y descubre una nueva forma de interactuar con el universo de las criptomonedas!`,
            image: { src: image5, width: '80%', height: 'auto' },
            layout: 'text-only',
          },
        ],
      },
    },
  },
};
