import {FC} from 'react';

import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';

import { useCalcRoute } from '../hooks/useCalcRoute';

interface AdminPropsI {
}

const Admin:FC<AdminPropsI> = () => {
  const links = useCalcRoute();

  return (
    <main>
      <AccomplishedRoute links={links}/>
      <section>
        admin
      </section>
    </main>
  );
}


export default Admin;
