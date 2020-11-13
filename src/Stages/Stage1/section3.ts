import Button from '../../Components/Button';
interface Section3Props {
  onClick: () => void;
}

const Section3 = ({ onClick }: Section3Props) => {
  const section = document.createElement('section');
  section.className = 'page-section';

  const button = Button({
    text: 'Nästa',
    onClick,
  });

  section.appendChild(button);

  return section;
};

export default Section3;
