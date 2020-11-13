interface Section3Props {
  estimatedValue: number;
}
const section3 = ({ estimatedValue }: Section3Props) => {
  const section = document.createElement('section');
  section.className = 'page-section';

  const result = document.createElement('div');
  result.innerHTML = `${estimatedValue} kr`;

  section.appendChild(result);

  return section;
};

export default section3;
