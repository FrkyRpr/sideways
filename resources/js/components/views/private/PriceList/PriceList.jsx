import { Layout } from "antd"
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import PriceListTable from "./components/PriceListTable";

export default function PriceList() {
  return  ( 
          <div>
            <Header />
            <PriceListTable />
            <Footer />
          </div>
        );
}