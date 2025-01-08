import React, { useState } from 'react';
import { Form, Input, Button, Card, Space, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../assets/LoginScreen.css';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log('Login values:', values);
      message.success('Giriş başarılı!');
    } catch (error) {
      message.error('Giriş başarısız!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card 
        className="login-card"
        title={
          <div className="login-title">
            <h2>Stok Takip Sistemi</h2>
            <p>Hoş geldiniz! Lütfen giriş yapın.</p>
          </div>
        }
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="text"
            rules={[
              { required: true, message: 'Lütfen kullanıcı adı adresinizi girin!' },
              { type: 'text', message: 'Geçerli bir kullanıcı adı girin!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Kullanıcı adı" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Lütfen şifrenizi girin!' },
              { min: 6, message: 'Şifre en az 6 karakter olmalıdır!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Şifre"
            />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
              >
                Giriş Yap
              </Button>
              <Button type="link" block>
                Şifremi Unuttum
              </Button>
            </Space>
          </Form.Item>

          <Divider plain>veya</Divider>

          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
            <span className="login-info-text">
              Teknik destek için: support@sirket.com
            </span>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default LoginScreen;