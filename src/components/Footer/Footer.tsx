import {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './Footer.module.scss';


import { twitterIcon, facebookIcon } from '../../utils/icons-utf';

import logo from '../../styles/assets/Icon.png';
import westernUni from '../../styles/assets/Western-union.png';
import marterCard from '../../styles/assets/Group 19.png';
import payPal from '../../styles/assets/Paypal.png';
import visa from '../../styles/assets/Shape 327.png';

export interface FooterPropsI {
}

const Footer:FC<FooterPropsI> = () => {
  return (
    <footer className={module.footer}>
     <section className={module.firstRow}>
        <article>
          <div className={module.logo}>
            <img src={logo} alt='logo'/>
            <h3>E-Comm</h3>
          </div>
          <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
           industry. Lorem Ipsum has been the industry's standard dummy
            text ever.Since the 1500s, when an unknown printer.
          </p>
        </article>
         <article>
            <h3>Follow Us</h3>
            <p>
            Since the 1500s, when an unknown printer took a galley of type and scrambled.
            </p>
            <div className={module.icons}>
              <FontAwesomeIcon icon={twitterIcon} />
              <FontAwesomeIcon icon={facebookIcon} />
            </div>
        </article>
         <article>
            <h3>Contact Us</h3>
            <address>
            E-Comm , 4578 Marmora
             Road, Glasgow D04 89GR
            </address>
        </article>
     </section>
     <section className={module.secondRow}>
        <article>
          <h3>Infomation</h3>
          <ul>
            <li>About us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </article>
         <article>
         <h3>Service</h3>
          <ul>
            <li>About us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </article>
         <article>
         <h3>My Account</h3>
          <ul>
            <li>About us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </article>
        <article>
        <h3>Our Offers</h3>
          <ul>
            <li>About us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </article>
     </section>
     <div className={module.thirdRow}>
        <img src={westernUni} alt="img" />
        <img src={marterCard} alt="img" />
        <img src={payPal} alt="img" />
        <img src={visa} alt="img" />
     </div>
    </footer>
  );
}

export default Footer;
