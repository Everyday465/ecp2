import { useState } from 'react';
import { Layout, Menu, Breadcrumb, Form, Input, DatePicker, Select, Button, theme, Space, Typography } from 'antd';

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;


const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

const Appointment = () => {
  const apiUrl2 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/ses-sender-function';
  const apiUrl5 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/lambdaA';
  const apiUrl6 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/posts';

  const [loading4, setLoading4] = useState(false);

  const [formData, setFormData] = useState({
    id: 'test',
    title: '',
    orderDate: Date.now(),
    scheduleDate: '',
    customer: '',
    therapist: '',
    receiver: '',
  });

  const [savedData, setSavedData] = useState('');

  const handleInputChange = (changedValues: any) => {
  const therapistEmailMap: Record<string, string> ={
    Ben: 'whoisyoutueber@gmail.com',
    John: 'agnotestorage1@gmail.com',
    Jake: 'agnoteelijah@gmail.com',
  };

  if (changedValues.therapist) {
    setFormData({
      ...formData,
      therapist: changedValues.therapist,
      receiver: therapistEmailMap[changedValues.therapist] || '',
    });
  } else if (changedValues.scheduleDate) {
    const date = changedValues.scheduleDate.format("YYYY-MM-DDTHH:mm"); // Format without time zone
    setFormData({
      ...formData,
      scheduleDate: date,
    });
  } else {
    setFormData({
      ...formData,
      ...changedValues,
    });
  }
};

  const saveInputData = () => {
    setSavedData(JSON.stringify(formData, null, 2));
  };

  const sendPost = async () => {
    const payload = { ...formData };

    setLoading4(true);
    try {
      const response = await fetch(apiUrl6, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '1I7GuREY7C1ZYn6yYzf3G3OHAjFntYAS9bSUgc9Q',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Appointment scheduled successfully!');
      } else {
        alert('Failed to schedule appointment: ' + data.error);
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Error: Failed to schedule appointment.');
    } finally {
      setLoading4(false);
    }

    try {
      const response = await fetch(apiUrl2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        alert('Failed to send email: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error: Failed to send email.');
    }

    try {
      const response = await fetch(apiUrl5, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        alert('Failed to send reminder: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
      alert('Error: Failed to send reminder.');
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items} style={{ flex: 1 }} />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Schedule Appointment</Breadcrumb.Item>
        </Breadcrumb>

        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Title level={3} style={{ textAlign: 'center' }}>
            Schedule Appointment
          </Title>

          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={formData}
            onValuesChange={handleInputChange}
            style={{ maxWidth: 600, margin: '0 auto' }}
          >
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>

            <Form.Item label="Schedule Date" name="scheduleDate">
              <DatePicker
                format="YYYY-MM-DDTHH:mm"
                showTime={{ format: 'HH:mm' }}
                inputReadOnly/>
            </Form.Item>

            <Form.Item label="Customer" name="customer">
              <Input />
            </Form.Item>

            <Form.Item label="Therapist" name="therapist">
              <Select>
                <Select.Option value="Ben">Ben</Select.Option>
                <Select.Option value="John">John</Select.Option>
                <Select.Option value="Jake">Jake</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Receiver Email" name="receiver">
  <Input type="email" disabled value={formData.receiver} />
</Form.Item>

            <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
              <Space>
                <Button type="primary" onClick={saveInputData}>
                  Save Information
                </Button>
                <Button type="primary" onClick={sendPost} loading={loading4}>
                  Schedule Appointment
                </Button>
              </Space>
            </Form.Item>
          </Form>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Text>Saved Information:</Text>
            <pre
              style={{
                background: '#f5f5f5',
                padding: '10px',
                borderRadius: '5px',
                marginTop: '10px',
              }}
            >
              {savedData || 'No data saved yet.'}
            </pre>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Appointment;
