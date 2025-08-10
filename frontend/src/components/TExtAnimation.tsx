import { TypeAnimation } from 'react-type-animation';

export const ExampleComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Ask About Code',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Ask About LifeStyle',
        1000,
        'Ask About Travel',
        1000,
        'Ask About Movies',
        1000
  
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' ,color:"whitesmoke"}}
      repeat={Infinity}
    />
  );
};