interface AlertProps {
  type: 'error' | 'info' | 'warning';
  header: string;
  body: string;
}

const Alert = ({ type, header, body }: AlertProps) => {
  return `
    <div data-ecom-alert="${type}">
      <div class="alert-icon-section">
        <div class="alert-icon">
          <i class="icon-exclamation no-margin"></i>
        </div>
      </div>
      <div class="alert-content">
        <span><b>${header}</b> ${body}</span>
      </div>
    </div>
    `;
};

export default Alert;
