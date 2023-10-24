import {FC} from 'react';
import module from './ContactArticle.module.scss';

interface ContactArticlePropsI {
}

const ContactArticle:FC<ContactArticlePropsI> = () => {

  return (
    <section className={module.contactArticle}>
        <article>
          <h2>Get in touch</h2>
          <ul>
            <li>contact@e-comm.ng</li>
            <li>+234 4556 6665 34</li>
            <li>20 Prince Hakerem Lekki Phase 1, Lagos.</li>
          </ul>
        </article>
      </section>
  );
}

export default ContactArticle;
