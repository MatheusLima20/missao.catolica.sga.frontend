import React, { useState, useEffect } from 'react';
import './App.css';
import { AppNavigation } from './app/app.navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import "animate.css/animate.min.css";
import { Col, ConfigProvider, Layout, Row, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Spinner } from 'react-bootstrap';


function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 500);

  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorderSecondary: '#fff',
          colorBgLayout: '#fff',
          colorBgContainer: '#010064',
          colorText: '#fff',
          colorBgBase: '#010064'
        }
      }}
    >
      <Layout>

        {!loading && (
          <AppNavigation />
        )}

        {loading && (
          <Space direction='vertical'>
            <Content style={{
              lineHeight: "100vh",
            }} className='content-skeleton '>

              <Row aria-orientation='horizontal' justify={"center"} align={"bottom"} style={{ textAlign: "center" }}>
                <Col>
                  <Spinner animation='grow' variant='primary' />
                </Col>
              </Row>
            </Content>
          </Space>
        )}
      </Layout>

    </ConfigProvider>
  );
}

export default App;
