import image1 from './image1/image1.jpg';
import image2 from './image2/image2.jpg';
import image3 from './image3/image3.jpg';
import image4 from './image4/image4.jpg';

type Language = 'pt' | 'en' | 'es';

export const blogData: Record<
  string,
  {
    translations: {
      [key in Language]: {
        title: string;
        subtitle: string;
        content: string[];
        citation?: string;
        author?: string;
        date?: string;
      };
    };
    image: string;
  }
> = {
  '1': {
    translations: {
      pt: {
        title: 'Crescimento das Criptomoedas',
        subtitle: 'A revolução financeira em andamento',
        content: [
          'Nos últimos anos, as criptomoedas deixaram de ser apenas uma curiosidade para se tornarem um dos principais tópicos de discussão no mundo financeiro.',
          'O Bitcoin, por exemplo, surgiu como uma forma de dinheiro digital, mas agora é visto como um ativo de investimento por muitos.',
          'As tecnologias de blockchain estão revolucionando não apenas o setor financeiro, mas também várias outras indústrias, desde a saúde até a cadeia de suprimentos.',
        ],
        citation:
          '“O futuro das finanças é digital, descentralizado e global.”',
        author: 'Autor Fictício 1',
        date: '01/01/2024',
      },
      en: {
        title: 'Growth of Cryptocurrencies',
        subtitle: 'The ongoing financial revolution',
        content: [
          'In recent years, cryptocurrencies have gone from being a curiosity to one of the main topics of discussion in the financial world.',
          'Bitcoin, for example, started as a form of digital money, but is now seen as an investment asset by many.',
          'Blockchain technologies are revolutionizing not only the financial sector but also various other industries, from healthcare to supply chains.',
        ],
        citation:
          '“The future of finance is digital, decentralized, and global.”',
        author: 'Fictional Author 1',
        date: '01/01/2024',
      },
      es: {
        title: 'Crecimiento de las Criptomonedas',
        subtitle: 'La revolución financiera en curso',
        content: [
          'En los últimos años, las criptomonedas han pasado de ser una curiosidad a uno de los principales temas de discusión en el mundo financiero.',
          'Bitcoin, por ejemplo, surgió como una forma de dinero digital, pero ahora se ve como un activo de inversión para muchos.',
          'Las tecnologías blockchain están revolucionando no solo el sector financiero, sino también varias otras industrias, desde la salud hasta la cadena de suministro.',
        ],
        citation:
          '“El futuro de las finanzas es digital, descentralizado y global.”',
        author: 'Autor Ficticio 1',
        date: '01/01/2024',
      },
    },
    image: image1,
  },
  '2': {
    translations: {
      pt: {
        title: 'O Impacto das Redes Sociais',
        subtitle: 'Transformando a comunicação moderna',
        content: [
          'As redes sociais mudaram a forma como nos comunicamos e interagimos com o mundo.',
          'Com plataformas como Facebook, Twitter e Instagram, as pessoas podem compartilhar suas vidas em tempo real e se conectar com amigos e familiares ao redor do globo.',
          'No entanto, esse novo meio de comunicação também trouxe desafios, como a desinformação e a privacidade online.',
        ],
        citation: '“A comunicação é a chave para a conexão humana.”',
        author: 'Autor Fictício 2',
        date: '02/01/2024',
      },
      en: {
        title: 'The Impact of Social Media',
        subtitle: 'Transforming Modern Communication',
        content: [
          'Social media has changed the way we communicate and interact with the world.',
          'With platforms like Facebook, Twitter, and Instagram, people can share their lives in real-time and connect with friends and family around the globe.',
          'However, this new medium of communication has also brought challenges, such as misinformation and online privacy.',
        ],
        citation: '“Communication is the key to human connection.”',
        author: 'Fictional Author 2',
        date: '02/01/2024',
      },
      es: {
        title: 'El Impacto de las Redes Sociales',
        subtitle: 'Transformando la Comunicación Moderna',
        content: [
          'Las redes sociales han cambiado la forma en que nos comunicamos e interactuamos con el mundo.',
          'Con plataformas como Facebook, Twitter e Instagram, las personas pueden compartir sus vidas en tiempo real y conectarse con amigos y familiares de todo el mundo.',
          'Sin embargo, este nuevo medio de comunicación también ha traído desafíos, como la desinformación y la privacidad en línea.',
        ],
        citation: '“La comunicación es la clave para la conexión humana.”',
        author: 'Autor Fictício 2',
        date: '02/01/2024',
      },
    },
    image: image2,
  },
  '3': {
    translations: {
      pt: {
        title: 'Sustentabilidade e Meio Ambiente',
        subtitle: 'Desafios e Oportunidades',
        content: [
          'Nos dias de hoje, a sustentabilidade tornou-se uma questão central em muitas discussões.',
          'As mudanças climáticas, a poluição e a degradação dos recursos naturais estão exigindo que repensemos nosso modo de vida.',
          'No entanto, essa crise também apresenta oportunidades para inovação e desenvolvimento de novas tecnologias sustentáveis.',
        ],
        citation:
          '“A sustentabilidade não é um objetivo, mas uma maneira de viver.”',
        author: 'Autor Fictício 3',
        date: '03/01/2024',
      },
      en: {
        title: 'Sustainability and the Environment',
        subtitle: 'Challenges and Opportunities',
        content: [
          'Today, sustainability has become a central issue in many discussions.',
          'Climate change, pollution, and the degradation of natural resources are forcing us to rethink our way of life.',
          'However, this crisis also presents opportunities for innovation and the development of new sustainable technologies.',
        ],
        citation: '“Sustainability is not a goal, but a way of life.”',
        author: 'Fictional Author 3',
        date: '03/01/2024',
      },
      es: {
        title: 'Sostenibilidad y Medio Ambiente',
        subtitle: 'Desafíos y Oportunidades',
        content: [
          'Hoy en día, la sostenibilidad se ha convertido en un tema central en muchas discusiones.',
          'El cambio climático, la contaminación y la degradación de los recursos naturales nos están obligando a replantear nuestra forma de vida.',
          'Sin embargo, esta crisis también presenta oportunidades para la innovación y el desarrollo de nuevas tecnologías sostenibles.',
        ],
        citation:
          '“La sostenibilidad no es un objetivo, sino una forma de vivir.”',
        author: 'Autor Fictício 3',
        date: '03/01/2024',
      },
    },
    image: image3,
  },
  '4': {
    translations: {
      pt: {
        title: 'Inteligência Artificial e o Futuro do Trabalho',
        subtitle: 'Como a IA está transformando o mercado de trabalho',
        content: [
          'A inteligência artificial está mudando a forma como trabalhamos, tornando muitas tarefas mais eficientes e automatizadas.',
          'Embora a IA possa substituir alguns empregos, também cria novas oportunidades em áreas que não existiam antes.',
          'É importante que os trabalhadores se adaptem e aprendam novas habilidades para prosperar nesse novo cenário.',
        ],
        citation:
          '“A tecnologia não substitui o trabalho humano; ela o transforma.”',
        author: 'Autor Fictício 4',
        date: '04/01/2024',
      },
      en: {
        title: 'Artificial Intelligence and the Future of Work',
        subtitle: 'How AI is Transforming the Job Market',
        content: [
          'Artificial intelligence is changing the way we work, making many tasks more efficient and automated.',
          'While AI may replace some jobs, it also creates new opportunities in areas that didn’t exist before.',
          'It’s important for workers to adapt and learn new skills to thrive in this new landscape.',
        ],
        citation: '“Technology doesn’t replace human work; it transforms it.”',
        author: 'Fictional Author 4',
        date: '04/01/2024',
      },
      es: {
        title: 'Inteligencia Artificial y el Futuro del Trabajo',
        subtitle: 'Cómo la IA está transformando el mercado laboral',
        content: [
          'La inteligencia artificial está cambiando la forma en que trabajamos, haciendo que muchas tareas sean más eficientes y automatizadas.',
          'Aunque la IA puede reemplazar algunos trabajos, también crea nuevas oportunidades en áreas que antes no existían.',
          'Es importante que los trabajadores se adapten y aprendan nuevas habilidades para prosperar en este nuevo escenario.',
        ],
        citation:
          '“La tecnología no reemplaza el trabajo humano; lo transforma.”',
        author: 'Autor Fictício 4',
        date: '04/01/2024',
      },
    },
    image: image4,
  },
};
