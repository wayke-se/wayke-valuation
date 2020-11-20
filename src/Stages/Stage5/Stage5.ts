interface Stage5State {
  render: () => void;
}

class Stage5 implements Stage5State {
  render() {
    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    if (element) {
      element.innerHTML = `
          <section class="page-section">
            <h2 class="h6">Tack för din intresseanmälan!</h2>
            <div data-wayke-valuation-content="">
              <p>En handlare kommer att kontakta dig inom 48h för att lämna bud på din bil.</p>
            </div>
          </section>
      `;
    }
  }
}

export default Stage5;
