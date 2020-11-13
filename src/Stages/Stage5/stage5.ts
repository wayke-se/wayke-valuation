import SectionHeading from '../../Components/SectionHeading';

const stage5 = () => {
  const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
  if (element) {
    const pageMain = document.createElement('div');
    pageMain.className = 'page-main';

    const section1 = SectionHeading({
      header: 'Tack för din intresseanmälan!',
      body: 'En handlare kommer att kontakta dig inom 48h för att lämna bud på din bil.',
    });
    pageMain.appendChild(section1);

    element.appendChild(pageMain);
  }
};

export default stage5;
