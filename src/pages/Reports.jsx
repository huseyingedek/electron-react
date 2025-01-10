import React, { useState } from 'react';
import { Card, DatePicker } from 'antd';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

const { RangePicker } = DatePicker;

const ReportsDashboard = () => {
  const [salesData] = useState([
    { date: '2024-01', sales: 4000, stock: 2400 },
    { date: '2024-02', sales: 3000, stock: 1398 },
    { date: '2024-03', sales: 2000, stock: 9800 },
    { date: '2024-04', sales: 2780, stock: 3908 },
    { date: '2024-05', sales: 1890, stock: 4800 },
    { date: '2024-06', sales: 2390, stock: 3800 },
  ]);

  const [topProducts] = useState([
    { name: 'Ürün A', value: 400 },
    { name: 'Ürün B', value: 300 },
    { name: 'Ürün C', value: 200 },
    { name: 'Ürün D', value: 150 },
    { name: 'Ürün E', value: 100 },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Satış ve Stok Raporları</h1>
        <div className="flex gap-4">
          <RangePicker className="w-64" />
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Download className="w-4 h-4" />
            Raporu İndir
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Satış ve Stok Trendi" className="w-full">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Satışlar" />
                <Line type="monotone" dataKey="stock" stroke="#82ca9d" name="Stok" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="En Çok Satan Ürünler" className="w-full">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={topProducts}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Satış Adedi" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Stok Durumu Özeti" className="w-full">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Toplam Ürün Sayısı</span>
              <span className="font-bold">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Kritik Stok Seviyesinde</span>
              <span className="font-bold text-red-500">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tükenen Ürünler</span>
              <span className="font-bold text-orange-500">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Stok Değeri</span>
              <span className="font-bold">₺123,456</span>
            </div>
          </div>
        </Card>

        <Card title="Son İşlemler" className="w-full">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex justify-between items-center border-b pb-2">
                <div>
                  <div className="font-medium">Ürün {item}</div>
                  <div className="text-sm text-gray-500">Stok Girişi</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">+50 adet</div>
                  <div className="text-sm text-gray-500">2 saat önce</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsDashboard;