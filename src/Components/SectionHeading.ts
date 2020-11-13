interface SectionHeadingProps {
  header: string;
  body: string;
}

const SectionHeading = ({ header, body }: SectionHeadingProps) => {
  const _section1 = document.createElement('section');
  _section1.className = 'page-section';

  const section1H1 = document.createElement('h6');
  section1H1.innerText = header;

  const section1Content = document.createElement('div');
  section1Content.setAttribute('data-ecom-content', '');

  const section1ContentP = document.createElement('p');
  section1ContentP.innerText = body;

  section1Content.appendChild(section1ContentP);
  _section1.appendChild(section1H1);
  _section1.appendChild(section1Content);

  return _section1;
};

export default SectionHeading;
