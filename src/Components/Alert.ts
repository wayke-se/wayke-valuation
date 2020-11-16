interface AlertProps {
  type: 'error' | 'info' | 'warning';
  header: string;
  body: string;
}

const Alert = ({ type, header, body }: AlertProps) => {
  return `
    <div data-wayke-valuation-alert="${type}">
      <div class="alert-icon-section">
        <div class="alert-icon">
          <i class="icon-exclamation no-margin"></i>
        </div>
      </div>
      <div class="alert-content">
        <div class="font-medium">${header}</div>
        ${body}
      </div>
    </div>
    `;
};

export default Alert;
