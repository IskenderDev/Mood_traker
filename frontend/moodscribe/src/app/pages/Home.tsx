import { FC } from 'react';
import sea from '../../assets/sea-waves.mp4';
import { Header } from '../../components/Header';

const Home: FC = () => {
  return (
    <div className='fixed h-full w-full'>
      <Header />
      <video autoPlay loop muted className='w-full h-full object-cover'>
        <source src={sea} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className=' absolute top-16 left-0 w-full h-full bg-sky-900 bg-opacity-45 text-white'>
        <div className='flex justify-center items-center h-full px-4'>
          <p className='max-w-2xl text-2xl leading-relaxed text-center -mt-28'>
            Discover the power of self-awareness and personal growth with
            MoodScribe, your personal mental health journaling companion. Log
            your daily moods, reflect on your experiences, and gain valuable
            insights to enhance your emotional well-being.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
