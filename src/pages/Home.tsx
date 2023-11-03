import {FC} from 'react';

import Landing from '../components/Landing/Landing';
import HomeShop from '../components/HomeShop/HomeShop';
import HomeSaleOff from '../components/HomeSaleOff/HomeSaleOff';
import Advertisement from '../components/Advertisement/Advertisements';
import Advantages from '../components/Advantages/Advantages';
import News from '../components/News/News';
import FeaturedProduct from '../components/FeaturedProduct/FeaturedProduct';
import SearchUI from '../UI/SearchUI/SearchUI';
import MobileCategory from '../components/MobileCategory/MobileCategory';
import MobileItemSlider from '../components/ModileItemSlider/MobileItemSlider';


interface HomePropsI {
}

const Home:FC<HomePropsI> = () => {

  return (
    <main className='home'>
      <Landing />
      <MobileCategory />
      <MobileItemSlider>
        Flash Sale
      </MobileItemSlider>
      
      <HomeSaleOff />
      <HomeShop />
      <Advertisement />
      <Advantages />
      <News />
      <FeaturedProduct />
      <SearchUI placeholder='Search query...'/>
    </main>
  );
}

export default Home;
