import Alert from '../../Components/Alert';

const section4 = () => {
  const section = document.createElement('section');
  section.className = 'page-section';

  const bold = document.createElement('b');
  bold.innerText = 'Ungefärlig värdering';

  const span = document.createElement('span');
  span.innerText = ' Definitiv värdering sker vid möte med handlaren.';
  span.prepend(bold);

  section.appendChild(Alert({ type: 'info', content: span }));

  return section;
};

export default section4;
