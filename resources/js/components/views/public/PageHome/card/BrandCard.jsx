import React from 'react';
import { Card } from 'antd';

const BrandCard = ({ brand }) => {
  return (
    <Card className="card-hover fade-in text-center" bordered={false}>
      <h3 className="text-xl font-semibold mb-2">{brand.brand_name}</h3>
      <p className="text-gray-600">Warehouse: {brand.warehouse_location || 'N/A'}</p>
    </Card>
  );
};

export default BrandCard;