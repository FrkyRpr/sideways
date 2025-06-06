import React, { useState } from 'react';
import { Modal, Button, InputNumber } from 'antd';

const ModalStockEdit = ({ isModalOpen, handleOk, handleCancel, initialStock, productName }) => {
  const [amount, setAmount] = useState(1); // Default amount to add/subtract

  const handleAdd = () => {
    handleOk(Number(amount)); // Ensure amount is a number
  };

  const handleMinus = () => {
    handleOk(-Number(amount)); // Ensure amount is a number
  };

  return (
    <Modal
      title={`Edit Stock for ${productName} (Current: ${initialStock})`}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="minus" onClick={handleMinus} disabled={amount <= 0}>
          Subtract
        </Button>,
        <Button key="add" type="primary" onClick={handleAdd} disabled={amount <= 0}>
          Add
        </Button>,
      ]}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>Amount:</span>
        <InputNumber
          min={0}
          value={amount}
          onChange={(value) => setAmount(value ?? 0)} // Handle null/undefined
          parser={(value) => Number(value) || 0} // Ensure numeric input
          style={{ width: '100px' }}
        />
      </div>
    </Modal>
  );
};

export default ModalStockEdit;