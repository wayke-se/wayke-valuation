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
import { Settings } from '../@types/Settings';

export interface AppState {
  currentStage: number;
  vehicle: Vehicle;
  condition: ConditionType;
  contact: Contact;
}

class App {
  private props: Settings;
  private timeline: Timeline;
  private header: Header;

  constructor(props: Settings) {
    this.props = props;

    this.timeline = new Timeline();
    this.header = new Header({
      logo: this.props.logo || Logo,
      //eslint-disable-next-line
      close: this.close,
    });
    if (props.auto) {
      this.renderButton();
    }
  }
  private state: AppState = {
    currentStage: 1,
    vehicle: {
      registrationNumber: '',
      milage: '',
      description: '',
    },
    condition: 'VeryGood',
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      whenToSell: '1',
      confirmTerms: false,
    },
  };

  private onNextStage1(vehicle: Vehicle) {
    this.state = {
      ...this.state,
      vehicle: {
        ...vehicle,
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
          vehicle: this.state.vehicle,
          onNext: (vehicle: Vehicle) => this.onNextStage1(vehicle),
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
        this.timeline.changeStage(3);
        const stage3 = new Stage3({
          settings: this.props,
          state: this.state,
          changeStage1: () => this.setStage(1),
          changeStage2: () => this.setStage(2),
          onNext: () => this.onNextStage3(),
        });
        stage3.render();
        this.header.render(() => this.setStage(2));
        break;
      case 4:
        this.timeline.remove();
        const stage4 = new Stage4({ ...this.state, onNext: () => this.onNextStage4() });
        stage4.render();
        this.header.render(() => this.setStage(3));
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
  }

  renderButton() {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <img src="${this.props.logo || Logo}" alt="Logotype"></img>
        <h3>Vad är din bil värd?</h3>
        <p>Beskriv din bil i tre enkla steg så ger vi dig ett uppskattat försäljningspris. Du förbinder dig inte till något</p>
        <button>Gör en gratis värdering</button>
      </div>
    `;
    const button = container.querySelector('button');
    if (button) {
      button.addEventListener('click', () => this.render());
    }
    document.body.append(container);
  }

  render() {
    const app = document.createElement('div');
    app.innerHTML = `
      <div id="wayke-valuation-root" class="wayke-ecom" data-wayke-valuation-modal>
        <div class="modal-container">
          <div class="modal-center">
            <div class="modal-dialog">
              <div class="modal-dialog-main">
                <div data-wayke-valuation-frame>
                  <div class="frame-body">
                    <header data-wayke-valuation-header></header>
                    <div id="timeline-wrapper"></div>
                    <div data-wayke-valuation-page></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.append(app);
    this.timeline.render();
    this.setStage(1);
  }
}

export default App;
