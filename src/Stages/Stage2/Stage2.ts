import { ConditionType } from '../../@types/ConditionType';

import ConditionRows from './ConditionRows';

interface Stage2Props {
  onSelect: (condition: ConditionType) => void;
}

class Stage2 {
  private props: Stage2Props;

  constructor(props: Stage2Props) {
    this.props = props;
  }

  render() {
    const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
    if (element) {
      element.innerHTML = `
        <div class="page-main">
          <section class="page-section">
            <h6>Hur är bilens skick?</h6>
            <div data-ecom-content="">
              <p>Välj det alternativ som passar bilens skick bäst.</p>
            </div>
          </section>

          <section class="page-section page-section-accent">
            ${ConditionRows.map(
              (c) => `
              <div class="repeat-m-half">
                <div data-ecom-box="light">
                  <h2 class="h6">${c.header}</h2>
                  <div data-ecom-content="">
                    <ul>
                      ${c.usp
                        .map(
                          (u) => `
                        <li>${u}</li>
                      `
                        )
                        .join(' ')}
                    </ul>
                  </div>
                  <div class="box-footer box-footer-right">
                    <button data-ecom-button="small">Välj</button>
                  </div>
                </div>
              </div>
            `
            ).join(' ')}
        </div>
      `;

      element.querySelectorAll('button').forEach((button, i) => {
        button.addEventListener('click', () => this.props.onSelect(ConditionRows[i].condition));
      });
    }
  }
}

export default Stage2;
