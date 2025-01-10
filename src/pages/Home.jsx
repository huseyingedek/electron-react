import React from 'react';
import { Card, Row, Col, Typography, Layout, Button } from 'antd';
import {
  PlusCircleOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  UserOutlined,
  SettingOutlined,
  BarcodeOutlined,
  DollarOutlined,
  FileTextOutlined,
  AlertOutlined,
  TeamOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const DashboardScreen = () => {
    const navigate = useNavigate();
  const menuItems = [
    {
      title: 'Ürün Ekle',
      icon: <PlusCircleOutlined style={{ fontSize: '32px' }} />,
      description: 'Yeni ürün ekleme ve düzenleme',
      color: '#1890ff',
      route: '/urun-ekle',
    },
    {
      title: 'Stok İşlemleri',
      icon: <ShoppingCartOutlined style={{ fontSize: '32px' }} />,
      description: 'Stok giriş ve çıkış işlemleri',
      color: '#52c41a',
      route: '/stok-islemleri',
    },
    {
      title: 'Satış Ekranı',
      icon: <DollarOutlined style={{ fontSize: '32px' }} />,
      description: 'Hızlı satış işlemleri',
      color: '#722ed1',
      route: '/satis',

    },
    {
      title: 'Raporlar',
      icon: <BarChartOutlined style={{ fontSize: '32px' }} />,
      description: 'Satış ve stok raporları',
      color: '#faad14',
      route: '/reports',

    },
    {
      title: 'Müşteriler',
      icon: <TeamOutlined style={{ fontSize: '32px' }} />,
      description: 'Müşteri yönetimi',
      color: '#eb2f96'
    },
    {
      title: 'Barkod İşlemleri',
      icon: <BarcodeOutlined style={{ fontSize: '32px' }} />,
      description: 'Barkod basım ve okutma',
      color: '#13c2c2'
    },
    {
      title: 'Faturalar',
      icon: <FileTextOutlined style={{ fontSize: '32px' }} />,
      description: 'Fatura görüntüleme ve yazdırma',
      color: '#fa541c'
    },
    {
      title: 'Kritik Stok',
      icon: <AlertOutlined style={{ fontSize: '32px' }} />,
      description: 'Kritik seviyedeki ürünler',
      color: '#f5222d'
    },
    {
      title: 'Kullanıcılar',
      icon: <UserOutlined style={{ fontSize: '32px' }} />,
      description: 'Kullanıcı yönetimi',
      color: '#2f54eb'
    },
    {
      title: 'Ayarlar',
      icon: <SettingOutlined style={{ fontSize: '32px' }} />,
      description: 'Sistem ayarları',
      color: '#595959'
    },
    {
      title: 'Çıkış',
      icon: <LogoutOutlined style={{ fontSize: '32px' }} />,
      description: 'Çıkış yap',
      color: '#f5222d',
      route: '/login',

    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Title level={3} style={{ margin: '16px 0' }}>Stok Takip Sistemi</Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          {menuItems.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                style={{ 
                  height: '100%',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => handleCardClick(item.route)}
              >
                <div style={{ color: item.color }}>
                  {item.icon}
                </div>
                <Title level={4} style={{ margin: '16px 0 8px' }}>
                  {item.title}
                </Title>
                <Typography.Text type="secondary">
                  {item.description}
                </Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default DashboardScreen;