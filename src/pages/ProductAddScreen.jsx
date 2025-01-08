import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  Card,
  Space,
  Divider,
  message,
  Row,
  Col
} from 'antd';
import {
  UploadOutlined,
  SaveOutlined,
  ClearOutlined,
  BarcodeOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const ProductAddScreen = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const categories = [
    { id: 1, name: 'Elektronik' },
    { id: 2, name: 'Giyim' },
    { id: 3, name: 'Gıda' },
    { id: 4, name: 'Kozmetik' },
  ];

  const units = ['Adet', 'Kg', 'Lt', 'Paket', 'Kutu'];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log('Form values:', values);
      message.success('Ürün başarıyla eklendi!');
      form.resetFields();
    } catch (error) {
      message.error('Ürün eklenirken bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Sadece JPG/PNG dosyaları yükleyebilirsiniz!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Resim 2MB\'dan küçük olmalıdır!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleBarcodeRead = () => {
    // Barkod okuyucu fonksiyonu
    message.info('Barkod okuyucu aktif...');
  };

  return (
    <Card title="Yeni Ürün Ekle" style={{ margin: '24px' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          unit: 'Adet',
          taxRate: 18,
          status: 'active'
        }}
      > 
        <div style={{ backgroundColor: '#fafafa', padding: '20px', borderRadius: '6px', marginBottom: '24px' }}>
          <h3>Temel Bilgiler</h3>
          <Divider />
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="barcode"
                label="Barkod"
                rules={[{ required: true, message: 'Barkod gereklidir!' }]}
              >
                <Input
                  prefix={<BarcodeOutlined />}
                  suffix={
                    <Button
                      type="link"
                      icon={<BarcodeOutlined />}
                      onClick={handleBarcodeRead}
                    />
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="productCode"
                label="Ürün Kodu"
                rules={[{ required: true, message: 'Ürün kodu gereklidir!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Ürün Adı"
                rules={[{ required: true, message: 'Ürün adı gereklidir!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="category"
                label="Kategori"
                rules={[{ required: true, message: 'Kategori seçiniz!' }]}
              >
                <Select>
                  {categories.map(cat => (
                    <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="brand"
                label="Marka"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="model"
                label="Model"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div style={{ backgroundColor: '#fafafa', padding: '20px', borderRadius: '6px', marginBottom: '24px' }}>
          <h3>Stok Bilgileri</h3>
          <Divider />
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="initialStock"
                label="Başlangıç Stok"
                rules={[{ required: true, message: 'Stok miktarı gereklidir!' }]}
              >
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="unit"
                label="Birim"
                rules={[{ required: true, message: 'Birim seçiniz!' }]}
              >
                <Select>
                  {units.map(unit => (
                    <Option key={unit} value={unit}>{unit}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="minStock"
                label="Minimum Stok"
                rules={[{ required: true, message: 'Minimum stok gereklidir!' }]}
              >
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="maxStock"
                label="Maksimum Stok"
              >
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div style={{ backgroundColor: '#fafafa', padding: '20px', borderRadius: '6px', marginBottom: '24px' }}>
          <h3>Fiyatlandırma</h3>
          <Divider />
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="purchasePrice"
                label="Alış Fiyatı"
                rules={[{ required: true, message: 'Alış fiyatı gereklidir!' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                  prefix="₺"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="salePrice"
                label="Satış Fiyatı"
                rules={[{ required: true, message: 'Satış fiyatı gereklidir!' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                  prefix="₺"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="taxRate"
                label="KDV Oranı (%)"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={100}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="currency"
                label="Para Birimi"
                initialValue="TRY"
              >
                <Select>
                  <Option value="TRY">TL</Option>
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div style={{ backgroundColor: '#fafafa', padding: '20px', borderRadius: '6px', marginBottom: '24px' }}>
          <h3>Ek Bilgiler</h3>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Açıklama"
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Ürün Görseli"
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                  ) : (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Görsel Yükle</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
            >
              Kaydet
            </Button>
            <Button
              icon={<ClearOutlined />}
              onClick={() => form.resetFields()}
            >
              Temizle
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductAddScreen;