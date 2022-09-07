import Control from './control';

export const onEmptyFields = () => {
  const warning = new Control(document.body, {
    tagName: 'p',
    className: 'error-on-update',
    content: 'Необходимо заполнить все поля!',
  });
  setTimeout(() => warning.destroy(), 3000);
};

export const onVictory = (value: string) => {
  const message = new Control(document.body, {
    tagName: 'p',
    className: 'message-on-victory',
    content: `Победил ${value}`,
  });
  setTimeout(() => message.destroy(), 4000);
};
