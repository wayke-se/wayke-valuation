interface HeaderProps {
  logo: string;
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
          <div class="header-action"></div>
        </div>
      `;
      const firstAction = headerElement.querySelector('.header-action');
      if (firstAction) {
        if (back) {
          if (firstAction) {
            firstAction.innerHTML = `
            <button>
              <i class="icon-chevron-left m-r-half"></i> Tillbaka
            </button>
          `;
            const button = firstAction.querySelector('button');
            if (button) {
              button.addEventListener('click', back);
            }
          }
        } else {
          firstAction.innerHTML = '';
        }
      }
    }
  }
}

export default Header;
