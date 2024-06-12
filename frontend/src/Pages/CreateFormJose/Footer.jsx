import style from './Footer.module.css';

const Footer = () => {
  return (
    <div>
      <footer
        className={style.footer}
      >
        <button className={style.saveButton} type='submit' style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
          Save
        </button>
      </footer>
    </div>
  );
};

export default Footer;
