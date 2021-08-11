import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/yicheng.jpg"
          alt="An image showing Max"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, 我是貽丞</h1>
      <p>我正在努力朝前端工程師之路邁進，一起加油吧！</p>
    </section>
  );
}

export default Hero;
