import React from 'react';
import { Modal, Form, Input } from 'antd';

const ModalBrand = ({ isModalOpen, handleOk, handleCancel, initialValues }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleOk(values);
  };

  return (
    <Modal
      title={initialValues ? 'Edit Brand' : 'Add Brand'}
      open={isModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          name="brand_name"
          label="Brand Name"
          rules={[{ required: true, message: 'Please input the brand name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="warehouse_location"
          label="Warehouse Location"
          rules={[{ required: true, message: 'Please input the warehouse location!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalBrand;