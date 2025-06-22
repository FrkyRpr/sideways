import { Layout } from "antd";
import Header from "../../layouts/Header";
import PageBrandsTable from "./components/PageBrandsTable";
import Footer from "../../layouts/Footer";

export default function PageBrands() {
  return ( 
    <div>
      <Header />
      <PageBrandsTable />
      <Footer />
    </div>
  );
}