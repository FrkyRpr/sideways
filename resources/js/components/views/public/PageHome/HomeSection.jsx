import React from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { PriceBrandsManager } from '../../private/PageBrands/components/PriceBrandsManager';
import { PriceListManager } from '../../private/PriceList/components/PriceListManager';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './scss/HomeSection.scss';

const { Title, Paragraph } = Typography;

export default function HomeSection() {
  const { brands, archivedBrands } = PriceBrandsManager();
  const { lists, archivedLists } = PriceListManager();

  // Calculate statistics
  const totalBrands = brands.length + archivedBrands.length;
  const activeBrands = brands.length;
  const totalProducts = lists.length + archivedLists.length;
  const activeProducts = lists.length;
  const totalStock = lists.reduce((sum, product) => sum + Number(product.stock_available || 0), 0);

  // Data for bar charts
  const brandData = [
    { name: 'Total Brands', value: totalBrands },
    { name: 'Active Brands', value: activeBrands },
  ];
  const productData = [
    { name: 'Total Products', value: totalProducts },
    { name: 'Active Products', value: activeProducts },
  ];
  const stockData = [
    { name: 'Total Stock', value: totalStock },
  ];

  return (
    <div className="home-section">
      {/* Hero Section */}
      <div className="hero-container">
        <Title className="hero-title">Welcome to Sideways Inventory System</Title>
        <Paragraph className="hero-description">
          Streamline your inventory with our intuitive platform. Manage brands, track products, and optimize your workflow with ease and efficiency.
        </Paragraph>
        <div className="hero-cta">
          <Link to="/brands">
            <Button type="primary" size="large" className="cta-button">
              Manage Brands
            </Button>
          </Link>
          <Link to="/lists">
            <Button type="default" size="large" className="cta-button">
              View Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-container">
        <div className="stat-card">
          <Title level={4} className="stat-title">Brand Statistics</Title>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={brandData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3a8a50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <Title level={4} className="stat-title">Product Statistics</Title>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={productData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#48a860" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <Title level={4} className="stat-title">Stock Statistics</Title>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stockData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#5abf6f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-container">
        <div className="feature-card">
          <Title level={3}>Efficient Management</Title>
          <Paragraph>
            Organize your brands and products effortlessly with our user-friendly interface designed for speed and simplicity.
          </Paragraph>
        </div>
        <div className="feature-card">
          <Title level={3}>Real-Time Insights</Title>
          <Paragraph>
            Gain instant access to inventory statistics, helping you make informed decisions to optimize stock levels.
          </Paragraph>
        </div>
        <div className="feature-card">
          <Title level={3}>Reliable Tracking</Title>
          <Paragraph>
            Track stock levels, archive items, and restore them with ease, ensuring your inventory is always up-to-date.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}