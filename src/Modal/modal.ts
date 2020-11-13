const modal = () => {
  const _modal = document.createElement('div');
  _modal.className = 'wayke-ecom';
  _modal.setAttribute('data-ecom-modal', '');

  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';

  const modalCenter = document.createElement('div');
  modalCenter.className = 'modal-center';

  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog';

  const modalDialogMain = document.createElement('div');
  modalDialogMain.className = 'modal-dialog-main';

  const frame = document.createElement('div');
  frame.setAttribute('data-ecom-frame', '');

  const frameBody = document.createElement('div');
  frameBody.className = 'frame-body';

  const header = document.createElement('header');
  header.setAttribute('data-ecom-header', '');

  const timeline = document.createElement('div');
  timeline.setAttribute('data-ecom-timeline', '');

  const page = document.createElement('div');
  page.setAttribute('data-ecom-page', '');

  frameBody.appendChild(header);
  frameBody.appendChild(timeline);
  frameBody.appendChild(page);
  frame.appendChild(frameBody);
  modalDialogMain.appendChild(frame);
  modalDialog.appendChild(modalDialogMain);
  modalCenter.appendChild(modalDialog);
  modalContainer.appendChild(modalCenter);
  _modal.appendChild(modalContainer);
  document.body.appendChild(_modal);
};

export default modal;
