import Head from 'next/head';
import ContactForm from '../components/contact/contact-form';

function ContactPage() {
  return (
    <>
      <Head>
        <title>聯絡我</title>
        <meta name="description" content="傳送一些訊息給我吧!" />
      </Head>
      <ContactForm />
    </>
  );
}

export default ContactPage;
