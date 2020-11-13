import Button from '../../Components/Button';
interface Section3Props {
  onClick: () => void;
}

const section3 = ({ onClick }: Section3Props) => {
  const section = document.createElement('section');
  section.className = 'page-section';

  const button = Button({
    text: 'Skicka intresseanmälan',
    onClick,
  });

  section.appendChild(button);

  return section;
};

export default section3;
