import Header from './Header';
import Stage1 from '../Stages/Stage1/Stage1';
import Stage2 from '../Stages/Stage2/Stage2';
import Stage3 from '../Stages/Stage3/Stage3';
import Stage4 from '../Stages/Stage4/Stage4';
import Stage5 from '../Stages/Stage5/Stage5';
import Timeline from './Timeline';
import { Vehicle } from '../@types/Vehicle';
import { Contact } from '../@types/Contact';
import { ConditionType } from '../@types/ConditionType';
import Logo from '../logo';
import CreateLogo from '../CreateLogo';
import { AppSettings, Settings } from '../@types/Settings';
import { Valuation } from '../@types/Valuation';
import verifySettings from '../verifySettings';

export interface AppState {
  currentStage: number;
  vehicle: Vehicle;
  condition: ConditionType;
  contact: Contact;
  valuation?: Valuation;
}

export type NonOptionalAppState = Omit<AppState, 'valuation'> & {
  valuation: Valuation;
};

const initialState = (props: Settings): AppState => ({
  currentStage: 1,
  vehicle: {
    registrationNumber: '',
    milage: '',
  },
  condition: 'veryGood',
  contact: {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    branchId: props.branches[0].id,
    whenToSell: '1',
    description: '',
    confirmTerms: false,
  },
});

class App {
  private props: AppSettings;
  private state: AppState;
  private timeline: Timeline;
  private header: Header;

  constructor(props: Settings) {
    verifySettings(props);
    this.props = { ...props, url: process.env.WAYKE_URL as string };
    this.state = initialState(props);

    this.timeline = new Timeline();
    this.header = new Header({
      logo: this.props.logo ? CreateLogo(this.props.logo) : Logo,
      //eslint-disable-next-line
      close: () => this.close(),
    });
    if (!props.manualTrigger) {
      this.renderButton();
    }
  }

  private onNextStage1(vehicle: Vehicle, valuation: Valuation) {
    this.state = {
      ...this.state,
      vehicle: {
        ...vehicle,
      },
      valuation: {
        ...valuation,
      },
    };
    this.setStage(2);
  }

  private onNextStage2(condition: ConditionType) {
    this.state = {
      ...this.state,
      condition,
    };
    this.setStage(3);
  }

  private onNextStage3() {
    this.setStage(4);
  }

  private onNextStage4() {
    this.setStage(5);
  }

  private setStage(nextStage: number) {
    this.state = {
      ...this.state,
      currentStage: nextStage,
    };

    switch (this.state.currentStage) {
      case 1:
        this.timeline.changeStage(1);
        const stage1 = new Stage1({
          settings: this.props,
          vehicle: this.state.vehicle,
          onNext: (vehicle: Vehicle, valuation: Valuation) => this.onNextStage1(vehicle, valuation),
        });

        stage1.render();
        this.header.render();
        break;
      case 2:
        this.timeline.changeStage(2);
        const stage2 = new Stage2({
          onSelect: (condition: ConditionType) => this.onNextStage2(condition),
        });
        stage2.render();
        this.header.render(() => this.setStage(1));
        break;
      case 3:
        if (this.state.valuation) {
          this.timeline.changeStage(3);
          const stage3 = new Stage3({
            settings: this.props,
            state: this.state as NonOptionalAppState,
            changeStage1: () => this.setStage(1),
            changeStage2: () => this.setStage(2),
            onNext: () => this.onNextStage3(),
          });
          stage3.render();
          this.header.render(() => this.setStage(2));
        }
        break;
      case 4:
        if (this.state.valuation) {
          this.timeline.remove();
          const stage4 = new Stage4({
            settings: this.props,
            state: this.state as NonOptionalAppState,
            onNext: () => this.onNextStage4(),
          });
          stage4.render();
          this.header.render(() => this.setStage(3));
        }
        break;
      case 5:
        const stage5 = new Stage5();
        stage5.render();
        this.header.render();
        break;
      default:
        break;
    }
  }

  public close() {
    const app = document.querySelector('#wayke-valuation-root');
    if (app && app.parentElement) {
      app.parentElement.removeChild(app);
    }

    if (this.state.currentStage === 5) {
      this.state = initialState(this.props);
    }
  }

  private destroy() {
    const app = document.querySelector('#wayke-valuation-root-button');
    if (app && app.parentElement) {
      app.parentElement.removeChild(app);
    }
  }

  renderTheme() {
    if (document.querySelector('#wayke-valuation-theme')) {
      return;
    }

    if (!this.props.colorPrimary?.background && !this.props.colorPrimary?.text) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'wayke-valuation-theme';
    style.innerHTML = `
            [data-wayke-valuation-timeline] .timeline-indicator {
                background-color: ${this.props.colorPrimary.background};
                border-color: ${this.props.colorPrimary.background};
            }

            .wayke-valuation [data-wayke-valuation-button] {
                background-color: ${this.props.colorPrimary.background};
                color: ${this.props.colorPrimary.text};
            }

            [data-wayke-valuation-floatingpanel] {
                background-color: ${this.props.colorPrimary.background};
                color: ${this.props.colorPrimary.text};
            }

            [data-wayke-valuation-inputselection] input[type=checkbox].is-checked+label:before,
            [data-wayke-valuation-inputselection] input[type=checkbox]:checked+label:before,
            [data-wayke-valuation-inputselection] input[type=radio].is-checked+label:before,
            [data-wayke-valuation-inputselection] input[type=radio]:checked+label:before {
                background-color: ${this.props.colorPrimary.background};
            }

            [data-wayke-valuation-inputselection] input[type=checkbox].is-checked+label:after,
            [data-wayke-valuation-inputselection] input[type=checkbox]:checked+label:after,
            [data-wayke-valuation-inputselection] input[type=radio].is-checked+label:after,
            [data-wayke-valuation-inputselection] input[type=radio]:checked+label:after {
                color: ${this.props.colorPrimary.text};
            }

            [data-wayke-valuation-timeline] .timeline-item.is-active:before {
                background-color: ${this.props.colorPrimary.background};
            }
        `;
    document.head.append(style);
  }

  renderButton() {
    this.renderTheme();
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="wayke-valuation" id="wayke-valuation-root-button">
            <div data-wayke-valuation-floatingpanel="">
                <button title="Gör en gratis värdering" class="floating-panel-content" id="wayke-valuation-open">
                    <svg class="floating-panel-logo" viewBox="0 0 185.57 109.13" preserveAspectRatio="xMinYMid" xmlns="http://www.w3.org/2000/svg">
                        <title>Wayke logotyp</title>
                        <circle class="wayke-logo-dot-1" cx="4.25" cy="39.68" r="4.25" />
                        <circle class="wayke-logo-dot-2" cx="25.15" cy="68.03" r="4.96" />
                        <circle class="wayke-logo-dot-3" cx="46.04" cy="96.38" r="6.38" />
                        <circle class="wayke-logo-dot-4" cx="66.93" cy="68.03" r="7.09" />
                        <circle class="wayke-logo-dot-5" cx="87.82" cy="39.68" r="8.5" />
                        <circle class="wayke-logo-dot-6" cx="108.72" cy="68.03" r="10.63" />
                        <circle class="wayke-logo-dot-7" cx="129.61" cy="96.38" r="12.76" />
                        <circle class="wayke-logo-dot-8" cx="150.5" cy="68.03" r="13.47" />
                        <circle class="wayke-logo-dot-9" cx="171.4" cy="39.68" r="14.17" />
                        <circle class="wayke-logo-dot-10" cx="129.61" cy="39.68" r="12.05" />
                        <circle class="wayke-logo-dot-11" cx="66.93" cy="11.34" r="7.09" />
                        <circle class="wayke-logo-dot-12" cx="150.5" cy="11.34" r="11.34" />
                        <circle class="wayke-logo-dot-13" cx="108.72" cy="11.34" r="10.63" />
                        <circle class="wayke-logo-dot-14" cx="46.04" cy="39.68" r="6.38" />
                        <circle class="wayke-logo-dot-15" cx="25.15" cy="11.34" r="4.96" />
                    </svg>
                    <div class="floating-panel-text">Vad är din bil värd? <span class="floating-panel-highlight">Gör en gratis värdering</span></div>
                </button>
                <button title="Dölj" class="floating-panel-action"  id="wayke-valuation-close">
                    <i class="icon-close no-margin"></i>
                </button>
            </div>
        </div>
    `;
    const buttonOpen = container.querySelector('#wayke-valuation-open');
    if (buttonOpen) {
      buttonOpen.addEventListener('click', () => this.render());
    }

    const buttonClose = container.querySelector('#wayke-valuation-close');
    if (buttonClose) {
      buttonClose.addEventListener('click', () => this.destroy());
    }
    document.body.append(container);
  }

  render() {
    this.renderTheme();
    const app = document.createElement('div');
    app.innerHTML = `
      <article id="wayke-valuation-root" class="wayke-valuation" data-wayke-valuation-modal>
        <div class="modal-container">
          <div class="modal-center">
            <div class="modal-dialog">
              <div class="modal-dialog-main">
                <div data-wayke-valuation-frame>
                  <div class="frame-body">
                    <header data-wayke-valuation-header></header>
                    <div id="timeline-wrapper"></div>
                    <div data-wayke-valuation-page></div>
                    <div data-wayke-valuation-power="">
                        <div class="power-logo">
                            <svg class="power-logo-svg" viewBox="0 0 185.57 109.13" preserveAspectRatio="xMinYMid" xmlns="http://www.w3.org/2000/svg">
                                <title>Wayke logotyp</title>
                                <circle class="wayke-logo-dot-1" cx="4.25" cy="39.68" r="4.25"></circle>
                                <circle class="wayke-logo-dot-2" cx="25.15" cy="68.03" r="4.96"></circle>
                                <circle class="wayke-logo-dot-3" cx="46.04" cy="96.38" r="6.38"></circle>
                                <circle class="wayke-logo-dot-4" cx="66.93" cy="68.03" r="7.09"></circle>
                                <circle class="wayke-logo-dot-5" cx="87.82" cy="39.68" r="8.5"></circle>
                                <circle class="wayke-logo-dot-6" cx="108.72" cy="68.03" r="10.63"></circle>
                                <circle class="wayke-logo-dot-7" cx="129.61" cy="96.38" r="12.76"></circle>
                                <circle class="wayke-logo-dot-8" cx="150.5" cy="68.03" r="13.47"></circle>
                                <circle class="wayke-logo-dot-9" cx="171.4" cy="39.68" r="14.17"></circle>
                                <circle class="wayke-logo-dot-10" cx="129.61" cy="39.68" r="12.05"></circle>
                                <circle class="wayke-logo-dot-11" cx="66.93" cy="11.34" r="7.09"></circle>
                                <circle class="wayke-logo-dot-12" cx="150.5" cy="11.34" r="11.34"></circle>
                                <circle class="wayke-logo-dot-13" cx="108.72" cy="11.34" r="10.63"></circle>
                                <circle class="wayke-logo-dot-14" cx="46.04" cy="39.68" r="6.38"></circle>
                                <circle class="wayke-logo-dot-15" cx="25.15" cy="11.34" r="4.96"></circle>
                            </svg>
                        </div>
                        <div class="power-text">
                            Powered by <a href="https://wayke.se" target="_blank" rel="noopener" title="Gå till wayke.se" class="power-link">Wayke</a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
    document.body.append(app);
    this.timeline.render();
    this.setStage(1);
  }
}

export default App;
