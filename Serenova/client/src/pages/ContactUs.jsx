import ContactLeft from '../components/ContactLeft'
import ContactForm from '../components/ContactForm'

const ContactUs = () => {
  return (
    <div className='flex flex-wrap md:gap-[4rem] justify-evenly my-2 items-center gap-2 p-[6rem]'>
      <ContactLeft/>
      <ContactForm/>
    </div>
  )
}

export default ContactUs
