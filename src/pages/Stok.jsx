import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Select, 
  Input, 
  Button, 
  Table, 
  Tag, 
  message, 
  InputNumber,
  Radio,
  Form,
  Space,
  Divider
} from 'antd';
import { 
  BarcodeOutlined,
  PlusCircleOutlined, 
  MinusCircleOutlined, 
  SearchOutlined 
} from '@ant-design/icons';

const StockOperations = () => {
  const [form] = Form.useForm();
  const [inputMode, setInputMode] = useState('manual');
  const [operationType, setOperationType] = useState('in');
  const [stockMovements, setStockMovements] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const barcodeInputRef = useRef(null);

  const productOptions = [
    { value: '1', label: 'Ürün A' },
    { value: '2', label: 'Ürün B' },
    { value: '3', label: 'Ürün C' },
  ];

  const handleBarcodeSubmit = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      try {
        // Gerçek uygulamada API çağrısı yapılacak
        const product = productOptions.find(p => p.value === barcodeInput);
        if (product) {
          form.setFieldsValue({
            product: product.value,
            quantity: 1
          });
          message.success(`${product.label} bulundu`);
        } else {
          message.error('Ürün bulunamadı!');
        }
      } catch (error) {
        message.error('Bir hata oluştu!');
      }
      setLoading(false);
      setBarcodeInput('');
    }
  };

  const handleSubmit = (values) => {
    const newMovement = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      product: productOptions.find(p => p.value === values.product)?.label,
      type: operationType === 'in' ? 'Giriş' : 'Çıkış',
      quantity: values.quantity,
      user: 'Admin'
    };

    setStockMovements([newMovement, ...stockMovements]);
    message.success('İşlem başarıyla kaydedildi');
    form.resetFields();

    if (inputMode === 'barcode' && barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  };

  const columns = [
    {
      title: 'Tarih',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Ürün',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'İşlem Tipi',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'Giriş' ? 'green' : 'red'}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Miktar',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Kullanıcı',
      dataIndex: 'user',
      key: 'user',
    },
  ];

  return (
    <div className="p-6">
      <Card title="Stok İşlemi" className="mb-6">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Space direction="vertical" className="w-full">
            <Radio.Group 
              value={inputMode} 
              onChange={(e) => setInputMode(e.target.value)}
              className="mb-4"
            >
              <Radio.Button value="manual">Manuel Giriş</Radio.Button>
              <Radio.Button value="barcode">Barkod Okuyucu</Radio.Button>
            </Radio.Group>

            <Select
              value={operationType}
              onChange={setOperationType}
              className="w-full"
              options={[
                { value: 'in', label: 'Stok Girişi' },
                { value: 'out', label: 'Stok Çıkışı' }
              ]}
            />

            <Divider />

            {inputMode === 'barcode' ? (
              /* Barkod Okuyucu Alanı */
              <div className="mb-4">
                <Input
                  ref={barcodeInputRef}
                  prefix={<BarcodeOutlined />}
                  placeholder="Barkodu okutun veya girin..."
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  onKeyPress={handleBarcodeSubmit}
                  size="large"
                />
              </div>
            ) : null}

            <Form.Item 
              name="product" 
              label="Ürün"
              rules={[{ required: true, message: 'Lütfen ürün seçin!' }]}
            >
              <Select
                showSearch
                placeholder="Ürün seçin"
                options={productOptions}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item 
              name="quantity" 
              label="Miktar"
              rules={[{ required: true, message: 'Lütfen miktar girin!' }]}
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                icon={operationType === 'in' ? <PlusCircleOutlined /> : <MinusCircleOutlined />}
                className="w-full"
                size="large"
              >
                İşlemi Kaydet
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>

      <Card 
        title="Stok Hareketleri" 
        extra={
          <Input
            placeholder="Ara..."
            prefix={<SearchOutlined />}
            className="w-64"
          />
        }
      >
        <Table
          columns={columns}
          dataSource={stockMovements}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
          }}
        />
      </Card>
    </div>
  );
};

export default StockOperations;