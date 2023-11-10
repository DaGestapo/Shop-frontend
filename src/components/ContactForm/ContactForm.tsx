import {FC} from 'react';
import module from './ContactForm.module.scss';

import FormInputUI from '../../UI/FormInputUI/FormInputUI';

import { useInputData } from '../../hooks/useInputData';

interface ContactFormropsI {
}

const ContactForm:FC<ContactFormropsI> = () => {
  const [data, setData, changeDataByFieldName] = useInputData({
    name: '',
    email: '',
    message: ''
  });

  return (
    <form 
      className={module.contactForm}
      onKeyDown={(e) => {}}
      >
      <div className={module.inputUI}>
        <span>Fullname</span>
        <FormInputUI 
            border={'gray'}
            placeholder='fullname'
            value={data.name}
            setValue={changeDataByFieldName('name')}
            />
        </div>
      <div className={module.inputUI}>
        <span>Email</span>
      <FormInputUI 
          border={'gray'}
          placeholder='Email'
          value={data.email}
          setValue={changeDataByFieldName('email')}
          />
      </div>
        <textarea 
          placeholder='Type your message'
          value={data.message}
          onChange={changeDataByFieldName('message')}>
        </textarea>
    </form>
  );
}

export default ContactForm;
