import style from './Footer.module.css';

const Footer = () => {
  return (
    <div>
      <footer
        className={style.footerNewForm}
        style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#f0f0f0', padding: '10px' }}
      >
        <button className={style.saveButton} type='submit' style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
          Save
        </button>
      </footer>
    </div>
  );
};

export default Footer;
