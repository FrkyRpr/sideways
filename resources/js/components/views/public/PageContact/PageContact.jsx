import { Layout } from "antd"
import Header from "../../layouts/Header";
import ContactUsSection from "./ContactUsSection";
import Footer from "../../layouts/Footer";

export default function PageContact() {
  return  ( 
          <div>
            <Header />
            <ContactUsSection />
            <Footer />
          </div>
        );
}