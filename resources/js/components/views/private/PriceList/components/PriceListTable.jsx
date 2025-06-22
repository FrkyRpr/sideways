import React, { useState } from 'react';
import { PriceListManager } from './PriceListManager';
import { Button, Table, Typography, Alert, Modal, Input, Form, Space } from 'antd';
import { EditOutlined, FolderOutlined, UndoOutlined, DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import '../scss/ListsTable.scss';
import ModalList from './Modal/ModalList';
import ModalStockEdit from './Modal/ModalStockEdit';
import ModalFilter from './Modal/ModalFilter';

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const ListsTable = () => {
  const { lists, archivedLists, error, addProduct, updateProduct, deleteProduct, restoreProduct, forceDeleteProduct, updateStock } = PriceListManager();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stockEditProduct, setStockEditProduct] = useState(null);
  const [onlyTrashed, setOnlyTrashed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterForm] = Form.useForm();
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const showConfirm = (action, ids, productNames) => {
    confirm({
      title: `Are you sure you want to ${action} ${ids.length} product${ids.length > 1 ? 's' : ''}?`,
      content: `Product${ids.length > 1 ? 's' : ''}: ${productNames.join(', ')}`,
      okText: 'Yes',
      cancelText: 'No',
      maskClosable: true,
      okButtonProps: { className: 'bg-[#225b29] border-[#225b29] hover:bg-[#3e6f43]' },
      cancelButtonProps: { className: 'bg-[#ff1818] border-[#ff1818] hover:bg-[#ee5d5d] text-white' },
      onOk() {
        if (action === 'archive') {
          ids.forEach(id => deleteProduct(id));
        } else if (action === 'restore') {
          ids.forEach(id => restoreProduct(id));
        } else if (action === 'delete') {
          ids.forEach(id => forceDeleteProduct(id));
        }
        setSelectedRowKeys([]);
      },
    });
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleUpdateClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleStockEditClick = (product) => {
    setStockEditProduct(product);
    setIsStockModalOpen(true);
  };

  const handleModalOk = (values) => {
    const updatedValues = {
      ...values,
      stock_available: Number(values.stock_available),
    };
    if (editingProduct) {
      updateProduct(editingProduct.id, updatedValues);
    } else {
      addProduct(updatedValues);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleStockModalOk = (amount) => {
    const newStock = Math.max(0, Number(stockEditProduct.stock_available) + Number(amount));
    updateStock(stockEditProduct.id, newStock);
    setIsStockModalOpen(false);
    setStockEditProduct(null);
  };

  const handleStockModalCancel = () => {
    setIsStockModalOpen(false);
    setStockEditProduct(null);
  };

  const handleArchive = (id, productName) => {
    showConfirm('archive', [id], [productName]);
  };

  const handleRestore = (id, productName) => {
    showConfirm('restore', [id], [productName]);
  };

  const handleForceDelete = (id, productName) => {
    showConfirm('delete', [id], [productName]);
  };

  const handleBulkAction = (action) => {
    const selectedProducts = (onlyTrashed ? archivedLists : lists).filter(product => selectedRowKeys.includes(product.id));
    const ids = selectedProducts.map(product => product.id);
    const productNames = selectedProducts.map(product => product.product_name);
    if (ids.length > 0) {
      showConfirm(action, ids, productNames);
    }
  };

  const uniqueBrands = [...new Set(lists.concat(archivedLists).map((item) => item.brand?.brand_name).filter(Boolean))];

  const applyFilters = (items) =>
    items.filter((item) => {
      const matchesSearch = item.product_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        if (key === 'brand') {
          return item.brand?.brand_name?.toLowerCase() === value.toLowerCase();
        }
        return item[key]?.toLowerCase().includes(value.toLowerCase());
      });
      return matchesSearch && matchesFilters;
    });

  const filteredLists = applyFilters(lists);
  const filteredArchivedLists = applyFilters(archivedLists);

  const handleFilterModalOk = () => {
    filterForm.validateFields().then((values) => {
      setFilters(values);
      setIsFilterModalOpen(false);
    });
  };

  const handleFilterModalCancel = () => {
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    filterForm.resetFields();
    setFilters({});
    setIsFilterModalOpen(false);
  };

  const handleTableChange = (newPagination) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns = [
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          {!onlyTrashed ? (
            <>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleUpdateClick(record)}
                aria-label="Update product"
                className="text-[#225b29] hover:text-[#3e6f43]"
              />
              <Button
                type="link"
                icon={<FolderOutlined />}
                onClick={() => handleArchive(record.id, record.product_name)}
                aria-label="Archive product"
                className="text-[#225b29] hover:text-[#3e6f43]"
              />
            </>
          ) : (
            <>
              <Button
                type="link"
                icon={<UndoOutlined />}
                onClick={() => handleRestore(record.id, record.product_name)}
                aria-label="Restore product"
                className="text-[#225b29] hover:text-[#3e6f43]"
              />
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => handleForceDelete(record.id, record.product_name)}
                aria-label="Delete product"
                className="text-[#225b29] hover:text-[#3e6f43]"
              />
            </>
          )}
        </Space>
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      width: '15%',
    },
    {
      title: 'Brand',
      dataIndex: ['brand', 'brand_name'],
      key: 'brand_name',
      sorter: (a, b) => (a.brand?.brand_name || '').localeCompare(b.brand?.brand_name || ''),
      render: (text) => text || '-',
      width: '10%',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      sorter: (a, b) => (a.size || '').localeCompare(b.size || ''),
      width: '8%',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => (a.category || '').localeCompare(b.category || ''),
      width: '10%',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      sorter: (a, b) => (a.color || '').localeCompare(b.color || ''),
      width: '8%',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
      sorter: (a, b) => a.unit_price - b.unit_price,
      width: '10%',
    },
    {
      title: 'Wholesale Price',
      dataIndex: 'wholesale_price',
      key: 'wholesale_price',
      sorter: (a, b) => a.wholesale_price - b.wholesale_price,
      width: '12%',
    },
    {
      title: 'Market Price',
      dataIndex: 'market_price',
      key: 'market_price',
      sorter: (a, b) => a.market_price - b.market_price,
      width: '10%',
    },
    {
      title: 'Stock Available',
      dataIndex: 'stock_available',
      key: 'stock_available',
      sorter: (a, b) => a.stock_available - b.stock_available,
      width: '10%',
    },
    {
      title: 'Edit Stock',
      key: 'edit_stock',
      width: '10%',
      render: (_, record) => (
        !onlyTrashed ? (
          <Button
            type="link"
            onClick={() => handleStockEditClick(record)}
            aria-label="Edit stock"
            className="text-[#225b29] hover:text-[#3e6f43]"
          >
            Edit Stock
          </Button>
        ) : (
          '-'
        )
      ),
    },
  ];

  const paginationConfig = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    pageSizeOptions: ['10', '20', '50'],
    showSizeChanger: true,
    total: onlyTrashed ? filteredArchivedLists.length : filteredLists.length,
  };

  return (
    <div className="lists-table-container">
      <Title level={2} className="table-title">
        {onlyTrashed ? 'Archived Products' : 'List of Products'}
      </Title>

      <div className="table-actions-container">
        <div className="table-actions">
          <Search
            placeholder="Search products"
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
            className="search-input"
          />
          <Button
            type="default"
            icon={<FilterOutlined />}
            onClick={() => setIsFilterModalOpen(true)}
            className="filter-button"
          >
            Filter
          </Button>
          <Button
            type="primary"
            onClick={handleAddClick}
            className="add-button"
          >
            + Add Product
          </Button>
          <Button
            type="default"
            onClick={() => setOnlyTrashed(!onlyTrashed)}
            className="toggle-button"
          >
            {onlyTrashed ? 'Show Active Products' : 'Show Archived Products'}
          </Button>
        </div>
        <div className="bulk-actions">
          {selectedRowKeys.length > 0 && (
            <Space>
              {!onlyTrashed ? (
                <Button
                  type="primary"
                  icon={<FolderOutlined />}
                  onClick={() => handleBulkAction('archive')}
                  className="archive-button"
                >
                  Archive Selected
                </Button>
              ) : (
                <>
                  <Button
                    type="primary"
                    icon={<UndoOutlined />}
                    onClick={() => handleBulkAction('restore')}
                    className="restore-button"
                  >
                    Restore Selected
                  </Button>
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => handleBulkAction('delete')}
                    className="delete-button"
                  >
                    Delete Selected
                  </Button>
                </>
              )}
            </Space>
          )}
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
          rowSelection={rowSelection}
          dataSource={onlyTrashed ? filteredArchivedLists : filteredLists}
          columns={columns}
          rowKey="id"
          pagination={paginationConfig}
          onChange={handleTableChange}
          locale={{
            emptyText: onlyTrashed ? 'No archived products available' : 'No active products available',
          }}
          className="product-table"
          rowClassName="table-row"
        />
      </div>

      <ModalList
        isModalOpen={isModalOpen}
        handleOk={handleModalOk}
        handleCancel={handleModalCancel}
        initialValues={editingProduct}
      />

      <ModalStockEdit
        isModalOpen={isStockModalOpen}
        handleOk={handleStockModalOk}
        handleCancel={handleStockModalCancel}
        initialStock={stockEditProduct?.stock_available || 0}
        productName={stockEditProduct?.product_name || ''}
      />

      <ModalFilter
        isFilterModalOpen={isFilterModalOpen}
        handleFilterModalOk={handleFilterModalOk}
        handleFilterModalCancel={handleFilterModalCancel}
        handleClearFilters={handleClearFilters}
        filterForm={filterForm}
        uniqueBrands={uniqueBrands}
      />
    </div>
  );
};

export default ListsTable;