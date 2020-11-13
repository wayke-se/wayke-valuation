import Button from '../../Components/Button';
interface Section5Props {
  onClick: () => void;
}

const section5 = ({ onClick }: Section5Props) => {
  const section = document.createElement('section');
  section.className = 'page-section';

  const button = Button({
    text: 'Sälj via Wayke',
    onClick,
  });

  section.appendChild(button);

  return section;
};

export default section5;
