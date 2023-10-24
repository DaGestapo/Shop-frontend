import {FC} from 'react';
import ContactArticle from '../components/ContactArticle/ContactArticle';
import ContactForm from '../components/ContactForm/ContactForm';
import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';

import { useCalcRoute } from '../hooks/useCalcRoute';

interface ContactPropsI {
}

const Contact:FC<ContactPropsI> = () => {
  const links = useCalcRoute();

  return (
    <main>
     <AccomplishedRoute links={links} />
      <section className='contact'>
        <ContactArticle />
        <ContactForm />
      </section>
    </main>
  );
}

export default Contact;
