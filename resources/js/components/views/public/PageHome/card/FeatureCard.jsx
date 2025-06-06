import React from 'react';
import { Card } from 'antd';

const FeatureCard = ({ title, description, icon }) => {
  return (
    <Card className="card-hover fade-in text-center" bordered={false}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
};

export default FeatureCard;