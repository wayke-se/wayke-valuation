interface AlertProps {
  type: 'error' | 'info' | 'warning';
  content: string | HTMLElement;
}

const Alert = ({ type, content }: AlertProps) => {
  const alert = document.createElement('div');
  alert.setAttribute('data-ecom-alert', type);

  const iconSection = document.createElement('div');
  iconSection.className = 'alert-icon-section';

  const alertIcon = document.createElement('div');
  alertIcon.className = 'alert-icon';

  const i = document.createElement('i');
  i.className = 'icon-exclamation no-margin';

  alertIcon.appendChild(i);
  iconSection.appendChild(alertIcon);
  alert.appendChild(iconSection);

  const contentSection = document.createElement('div');
  contentSection.className = 'alert-content';
  contentSection.appendChild(content as HTMLElement);
  alert.appendChild(contentSection);

  return alert;
};

export default Alert;
