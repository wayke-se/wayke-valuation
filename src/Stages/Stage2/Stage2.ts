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
    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    if (element) {
      element.innerHTML = `
        <section class="page-section">
        <h2 class="h6">Hur är bilens skick?</h2>
        <div data-wayke-valuation-content="">
            <p>Välj det alternativ som passar bilens skick bäst.</p>
        </div>
        </section>

        <section class="page-section page-section-accent">
        ${ConditionRows.map(
          (c) => `
            <div class="repeat-m-half">
            <div data-wayke-valuation-box="">
                <h3 class="h6">${c.header}</h3>
                <div data-wayke-valuation-content="">
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
                <button data-wayke-valuation-button="small">Välj</button>
                </div>
            </div>
            </div>
        `
        ).join(' ')}
      `;

      element.querySelectorAll('button').forEach((button, i) => {
        button.addEventListener('click', () => this.props.onSelect(ConditionRows[i].condition));
      });
    }
  }
}

export default Stage2;
