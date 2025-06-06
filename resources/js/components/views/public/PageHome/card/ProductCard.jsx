import React from 'react';
import { Card } from 'antd';

const ProductCard = ({ product }) => {
  return (
    <Card className="card-hover fade-in text-center" bordered={false}>
      <h3 className="text-xl font-semibold mb-2">{product.product_name}</h3>
      <p className="text-gray-600">Brand: {product.brand?.brand_name || 'N/A'}</p>
      <p className="text-gray-600">Color: {product.color || 'N/A'}</p>
      <p className="text-gray-600">Stock: {product.stock_available}</p>
      <p className="text-gray-600">Price: ${product.unit_price}</p>
    </Card>
  );
};

export default ProductCard;