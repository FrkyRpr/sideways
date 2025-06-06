import { Layout } from "antd";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import GamesSection from "./GamesSection";

export default function Games() {
  return ( 
    <div>
      <Header />
      {/* <Footer /> */}
      <GamesSection />
    </div>
  );
}
