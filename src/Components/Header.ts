interface HeaderProps {
  logo: string;
  close: () => void;
}

class Header {
  props: HeaderProps;
  constructor(props: HeaderProps) {
    this.props = props;
  }
  remove() {
    const headerElement = document.querySelector('[data-ecom-header]') as HTMLElement | null;
    if (headerElement) {
      headerElement.innerHTML = '';
    }
  }

  render(back?: () => void) {
    const headerElement = document.querySelector('[data-ecom-header]') as HTMLElement | null;
    if (headerElement) {
      headerElement.innerHTML = `
        <div class="header">
          <div class="header-action"></div>
          <div class="header-logo-container">
            <img src="${this.props.logo}" class="header-logo" alt="Logotype">
          </div>
          <div class="header-action">
            <button class="header-action-btn" title="Stäng"><i class="icon-close no-margin"></i></button>
          </div>
        </div>
      `;
      const firstAction = headerElement.querySelectorAll('.header-action');
      if (firstAction.item(0)) {
        if (back) {
          if (firstAction) {
            firstAction.item(0).innerHTML = `
            <button>
              <i class="icon-chevron-left m-r-half"></i> Tillbaka
            </button>
          `;
            const button = firstAction.item(0).querySelector('button');
            if (button) {
              button.addEventListener('click', back);
            }
          }
        } else {
          firstAction.item(0).innerHTML = '';
        }
      }

      if (firstAction.item(1)) {
        const button = firstAction.item(1).querySelector('button');
        if (button) {
          button.addEventListener('click', this.props.close);
        }
      }
    }
  }
}

export default Header;
