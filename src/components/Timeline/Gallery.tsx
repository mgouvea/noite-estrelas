import { Box, Flex, Image } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import luaImg1 from '../../assets/gallery/lua1.jpg';
import luaImg2 from '../../assets/gallery/lua2.jpg';
import luaImg3 from '../../assets/gallery/lua3.jpg';
import luaImg4 from '../../assets/gallery/lua4.jpg';

export function Gallery() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const imgs = [luaImg1, luaImg2, luaImg3, luaImg4];

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
      autoPlaySpeed={1000}
      keyBoardControl={false}
      customTransition="all .10"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={['tablet', 'mobile']}
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {imgs.map((i) => (
        <Image src={i} />
      ))}
    </Carousel>
  );
}
