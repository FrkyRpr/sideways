import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const ModalList = ({ isModalOpen, handleOk, handleCancel, initialValues }) => {
  const [form] = Form.useForm();
  const [brands, setBrands] = useState([]);

  // Fetch brands when the component mounts
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('/api/brands');
        setBrands(response.data.brands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        brand_id: initialValues.brand?.id || null, // Set brand_id for editing
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onSubmit = () => {
    form.validateFields()
      .then(values => {
        form.resetFields();
        handleOk(values);
      })
      .catch(info => {
        console.log('Validation failed:', info);
      });
  };

  return (
    <Modal
      title={initialValues ? 'Update Product' : 'Add New Product'}
      open={isModalOpen}
      onOk={onSubmit}
      onCancel={handleCancel}
      okText={initialValues ? 'Update' : 'Add'}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="product_name" label="Product Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="brand_id" label="Brand">
              <Select allowClear placeholder="Select a brand">
                {brands.map(brand => (
                  <Option key={brand.id} value={brand.id}>
                    {brand.brand_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="size" label="Size" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="color" label="Color" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="unit_price" label="Unit Price" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="wholesale_price" label="Wholesale Price" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="market_price" label="Market Price" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="stock_available" label="Stock Available" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalList;