import AuthorBio from '../../components/AuthorBio'
import HelloMsg from '../../components/HelloMsg'
import AboutImg from '../../assets/images/about_me.svg'

function About() {
  return (
    <div className='max-w-4xl mx-auto py-12 flex flex-col items-center gap-12'>
      <div className='text-center space-y-4'>
        <HelloMsg />
        <div className='h-1 w-20 bg-accent mx-auto rounded-full'></div>
      </div>

      <div className='glass-premium !rounded-[3rem] p-8 md:p-16 relative overflow-hidden group'>
        <div className='absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-700'></div>
        <div className='absolute -bottom-24 -left-24 w-48 h-48 bg-stone-900/5 dark:bg-white/5 rounded-full blur-3xl'></div>

        <div className='relative z-10 flex flex-col md:flex-row items-center gap-12'>
          <div className='flex-1'>
            <AuthorBio />
          </div>
          <div className='w-full md:w-1/3'>
            <img
              src={AboutImg}
              className='w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-2xl'
              alt='About me'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
