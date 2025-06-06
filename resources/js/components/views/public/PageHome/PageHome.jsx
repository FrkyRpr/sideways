import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import HomeSection from './HomeSection';

export default function PageHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomeSection />
      </main>
      <Footer />
    </div>
  );
}