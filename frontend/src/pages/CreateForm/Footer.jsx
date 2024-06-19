import style from './Footer.module.css';

const Footer = ({ onSubmit }) => {
  return (
    <footer
      className={style.footer}
    >
      <button
        className={style.saveButton}
        type='button'
        onClick={onSubmit}>
        Save
      </button>
    </footer>
  );
};

export default Footer;
