import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const ModalFilter = ({
  isFilterModalOpen,
  handleFilterModalOk,
  handleFilterModalCancel,
  handleClearFilters,
  filterForm,
  uniqueBrands,
}) => {
  return (
    <Modal
      title="Filter Products"
      open={isFilterModalOpen}
      onOk={handleFilterModalOk}
      onCancel={handleFilterModalCancel}
      footer={[
        <Button key="clear" onClick={handleClearFilters}>
          Clear Filters
        </Button>,
        <Button key="cancel" onClick={handleFilterModalCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleFilterModalOk}>
          Apply Filters
        </Button>,
      ]}
    >
      <Form form={filterForm} layout="vertical" style={{ marginBottom: '12px' }}>
        <Form.Item name="product_name" label="Product Name" style={{ marginBottom: '12px' }}>
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item name="brand" label="Brand" style={{ marginBottom: '12px' }}>
          <Select placeholder="Select brand" allowClear>
            {uniqueBrands.map((brand) => (
              <Option key={brand} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="size" label="Size" style={{ marginBottom: '12px' }}>
          <Input placeholder="Enter size" />
        </Form.Item>
        <Form.Item name="category" label="Category" style={{ marginBottom: '12px' }}>
          <Input placeholder="Enter category" />
        </Form.Item>
        <Form.Item name="color" label="Color" style={{ marginBottom: '12px' }}>
          <Input placeholder="Enter color" />
        </Form.Item>
        <Form.Item name="unit_price" label="Unit Price" style={{ marginBottom: '12px' }}>
          <Input placeholder="Enter unit price" />
        </Form.Item>
        <Form.Item name="wholesale_price" label="Wholesale Price" style={{ marginBottom: '12px' }}>
          <Input placeholder="Enter wholesale price" />
        </Form.Item>
        <Form.Item name="market_price" label="Market Price" style={{ marginBottom: '12px' }}>
          <Input placeholder="Enter market price" />
        </Form.Item>
        <Form.Item name="stock_available" label="Stock Available" style={{ marginBottom: '12px' }}>
          <Input placeholder="Enter stock available" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFilter;