import React, { useState, useRef } from 'react';
import { 
  Card, 
  Input, 
  Button, 
  Table, 
  Space, 
  InputNumber, 
  Row, 
  Col, 
  Typography, 
  Divider, 
  message,
  Tag,
  Modal,
  Form,
  Select
} from 'antd';
import {
  BarcodeOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
  PrinterOutlined,
  SaveOutlined,
  CreditCardOutlined,
  DollarOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const SalesScreen = () => {
  const [cart, setCart] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [paymentModal, setPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const barcodeInputRef = useRef(null);
  const [form] = Form.useForm();

  const products = {
    '1234': { id: '1234', name: 'Ürün A', price: 100, stock: 50 },
    '5678': { id: '5678', name: 'Ürün B', price: 150, stock: 30 },
    '9012': { id: '9012', name: 'Ürün C', price: 200, stock: 25 },
    '90212': { id: '903412', name: 'Ürün t', price: 200, stock: 25 },
    '90512': { id: '90512', name: 'Ürün g', price: 200, stock: 25 },
    '90412': { id: '96012', name: 'Ürün n', price: 200, stock: 25 },
    '90132': { id: '90712', name: 'Ürün b', price: 200, stock: 25 },
    '904412': { id: '906512', name: 'Ürün s', price: 200, stock: 25 },
    '9012': { id: '904312', name: 'Ürün C', price: 200, stock: 25 },
    '90212': { id: '905412', name: 'Ürün C', price: 2040, stock: 25 },
    '9f0e12': { id: '934012', name: 'Ürün C', price: 200, stock: 25 },
    '90w1r2': { id: '903412', name: 'Ürün C3', price: 200, stock: 25 },
    '9v012': { id: '901342', name: 'Ürün C', price: 200, stock: 25 },

  };

  // Barkod okutulduğunda
  const handleBarcodeSubmit = (e) => {
    if (e.key === 'Enter') {
      const product = products[barcodeInput];
      if (product) {
        addToCart(product);
        setBarcodeInput('');
      } else {
        message.error('Ürün bulunamadı!');
      }
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, total: product.price }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity, total: quantity * item.price }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const handlePayment = (values) => {
    setLoading(true);
    setTimeout(() => {
      message.success('Satış başarıyla tamamlandı');
      setPaymentModal(false);
      setCart([]);
      setLoading(false);
      form.resetFields();
    }, 1000);
  };

  const cartColumns = [
    {
      title: 'Ürün',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Birim Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₺${price.toFixed(2)}`,
    },
    {
      title: 'Miktar',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => updateQuantity(record.id, value)}
        />
      ),
    },
    {
      title: 'Toplam',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `₺${total.toFixed(2)}`,
    },
    {
      title: 'İşlem',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />}
          onClick={() => removeFromCart(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <Space direction="vertical" className="w-full">
              {/* Barkod Okuyucu */}
              <Input
                ref={barcodeInputRef}
                size="large"
                placeholder="Barkod okutun veya ürün arayın..."
                prefix={<BarcodeOutlined />}
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyPress={handleBarcodeSubmit}
              />
              
              <div className="flex flex-wrap gap-2 my-4">
                {Object.values(products).map(product => (
                  <Button 
                    key={product.id}
                    onClick={() => addToCart(product)}
                  >
                    {product.name}
                  </Button>
                ))}
              </div>

              {/* Sepet Tablosu */}
              <Table
                columns={cartColumns}
                dataSource={cart}
                rowKey="id"
                pagination={false}
                summary={() => (
                  <Table.Summary>
                    <Table.Summary.Row>
                      <Table.Summary.Cell colSpan={3}>
                        <Text strong>Genel Toplam</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <Text strong>₺{calculateTotal().toFixed(2)}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell />
                    </Table.Summary.Row>
                  </Table.Summary>
                )}
              />
            </Space>
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Space direction="vertical" className="w-full">
              <Title level={2}>Toplam: ₺{calculateTotal().toFixed(2)}</Title>
              
              <Button
                type="primary"
                size="large"
                icon={<CreditCardOutlined />}
                block
                onClick={() => setPaymentModal(true)}
                disabled={cart.length === 0}
              >
                Ödeme Al
              </Button>

              <Button 
                size="large" 
                icon={<SaveOutlined />}
                block
              >
                Siparişi Beklet
              </Button>

              <Button 
                size="large" 
                icon={<PrinterOutlined />}
                block
              >
                Fatura Yazdır
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Ödeme Modal */}
      <Modal
        title="Ödeme İşlemi"
        open={paymentModal}
        onCancel={() => setPaymentModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handlePayment} layout="vertical">
          <Form.Item name="paymentMethod" label="Ödeme Yöntemi" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="cash">
                <DollarOutlined /> Nakit
              </Select.Option>
              <Select.Option value="card">
                <CreditCardOutlined /> Kredi Kartı
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="amount" label="Ödenen Tutar">
            <InputNumber
              className="w-full"
              min={0}
              defaultValue={calculateTotal()}
              formatter={value => `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/₺\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Ödemeyi Tamamla
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SalesScreen;