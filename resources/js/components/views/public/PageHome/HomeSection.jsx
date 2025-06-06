import React from 'react';
import { Card, Statistic, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { PriceBrandsManager } from '../../private/PageBrands/components/PriceBrandsManager';
import { PriceListManager } from '../../private/PriceList/components/PriceListManager';
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
        <Card className="stat-card">
          <Statistic title="Total Brands" value={totalBrands} />
        </Card>
        <Card className="stat-card">
          <Statistic title="Active Brands" value={activeBrands} />
        </Card>
        <Card className="stat-card">
          <Statistic title="Total Products" value={totalProducts} />
        </Card>
        <Card className="stat-card">
          <Statistic title="Active Products" value={activeProducts} />
        </Card>
        <Card className="stat-card">
          <Statistic title="Total Stock" value={totalStock} />
        </Card>
      </div>

      {/* Features Section */}
      <div className="features-container">
        <Card className="feature-card">
          <Title level={3}>Efficient Management</Title>
          <Paragraph>
            Organize your brands and products effortlessly with our user-friendly interface designed for speed and simplicity.
          </Paragraph>
        </Card>
        <Card className="feature-card">
          <Title level={3}>Real-Time Insights</Title>
          <Paragraph>
            Gain instant access to inventory statistics, helping you make informed decisions to optimize stock levels.
          </Paragraph>
        </Card>
        <Card className="feature-card">
          <Title level={3}>Reliable Tracking</Title>
          <Paragraph>
            Track stock levels, archive items, and restore them with ease, ensuring your inventory is always up-to-date.
          </Paragraph>
        </Card>
      </div>
    </div>
  );
}