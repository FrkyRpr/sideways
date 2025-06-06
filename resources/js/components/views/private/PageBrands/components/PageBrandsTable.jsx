import React, { useState } from 'react';
import { PriceBrandsManager } from './PriceBrandsManager';
import { Button, Table, Typography, Alert, Modal, Space, Input } from 'antd';
import { EditOutlined, FolderOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import '../scss/BrandsTable.scss';
import ModalBrand from './Modal/ModalBrand';

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const PageBrandsTable = () => {
  const { brands, archivedBrands, error, addBrand, updateBrand, deleteBrand, restoreBrand, forceDeleteBrand } = PriceBrandsManager();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [onlyTrashed, setOnlyTrashed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const showConfirm = (action, id, brandName) => {
    confirm({
      title: `Are you sure you want to ${action} this brand?`,
      content: `Brand: ${brandName}`,
      okText: 'Yes',
      cancelText: 'No',
      maskClosable: true,
      okButtonProps: { className: 'bg-[#48a860] border-[#3a8a50] hover:bg-[#5abf6f]' },
      cancelButtonProps: { className: 'border-[#48a860] text-[#48a860] hover:bg-[#e6f4ea]' },
      onOk() {
        if (action === 'archive') {
          deleteBrand(id);
        } else if (action === 'restore') {
          restoreBrand(id);
        } else if (action === 'delete') {
          forceDeleteBrand(id);
        }
      },
    });
  };

  const handleAddClick = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  const handleUpdateClick = (brand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const handleModalOk = (values) => {
    if (editingBrand) {
      updateBrand(editingBrand.id, values);
    } else {
      addBrand(values);
    }
    setIsModalOpen(false);
    setEditingBrand(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingBrand(null);
  };

  const handleArchive = (id, brandName) => {
    showConfirm('archive', id, brandName);
  };

  const handleRestore = (id, brandName) => {
    showConfirm('restore', id, brandName);
  };

  const handleForceDelete = (id, brandName) => {
    showConfirm('delete', id, brandName);
  };

  // Filter brands based on search query
  const filteredBrands = brands.filter((brand) =>
    brand.brand_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArchivedBrands = archivedBrands.filter((brand) =>
    brand.brand_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTableChange = (newPagination) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const columns = [
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          {!onlyTrashed ? (
            <>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleUpdateClick(record)}
                aria-label="Update brand"
                className="text-[#48a860] hover:text-[#5abf6f]"
              />
              <Button
                type="link"
                icon={<FolderOutlined />}
                onClick={() => handleArchive(record.id, record.brand_name)}
                aria-label="Archive brand"
                className="text-[#48a860] hover:text-[#5abf6f]"
              />
            </>
          ) : (
            <>
              <Button
                type="link"
                icon={<UndoOutlined />}
                onClick={() => handleRestore(record.id, record.brand_name)}
                aria-label="Restore brand"
                className="text-[#48a860] hover:text-[#5abf6f]"
              />
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => handleForceDelete(record.id, record.brand_name)}
                aria-label="Delete brand"
                className="text-[#48a860] hover:text-[#5abf6f]"
              />
            </>
          )}
        </Space>
      ),
    },
    {
      title: 'Brand Name',
      dataIndex: 'brand_name',
      key: 'brand_name',
      sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      width: '45%',
    },
    {
      title: 'Warehouse Location',
      dataIndex: 'warehouse_location',
      key: 'warehouse_location',
      sorter: (a, b) => a.warehouse_location.localeCompare(b.warehouse_location),
      width: '55%',
    },
  ];

  const paginationConfig = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    pageSizeOptions: ['10', '20', '50'],
    showSizeChanger: true,
    total: onlyTrashed ? filteredArchivedBrands.length : filteredBrands.length,
  };

  return (
    <div className="brands-table-container">
      <Title level={2} className="table-title">
        {onlyTrashed ? 'Archived Brands' : 'List of Brands'}
      </Title>

      <div className="table-actions-container">
        <div className="table-actions">
          <Search
            placeholder="Search brands"
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
            className="search-input"
          />
          <Button
            type="primary"
            onClick={handleAddClick}
            className="add-button"
          >
            + Add Brand
          </Button>
          <Button
            type="default"
            onClick={() => setOnlyTrashed(!onlyTrashed)}
            className="toggle-button"
          >
            {onlyTrashed ? 'Show Active Brands' : 'Show Archived Brands'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          className="error-message"
        />
      )}

      <div className="table-wrapper">
        <div className="table-pagination-top">
          <Table
            pagination={paginationConfig}
            onChange={handleTableChange}
            dataSource={[]}
            columns={columns}
            showHeader={false}
            locale={{ emptyText: null }}
            className="pagination-only-table"
          />
        </div>
        <Table
          dataSource={onlyTrashed ? filteredArchivedBrands : filteredBrands}
          columns={columns}
          rowKey="id"
          pagination={paginationConfig}
          onChange={handleTableChange}
          locale={{
            emptyText: onlyTrashed ? 'No archived brands available' : 'No active brands available',
          }}
          className="brand-table"
          rowClassName="table-row"
        />
      </div>

      <ModalBrand
        isModalOpen={isModalOpen}
        handleOk={handleModalOk}
        handleCancel={handleModalCancel}
        initialValues={editingBrand}
      />
    </div>
  );
};

export default PageBrandsTable;