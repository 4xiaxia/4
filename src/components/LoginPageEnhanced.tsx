import { useState } from 'react';
import { Button, Input, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginWithCode, sendLoginCode } from '../services/apiService';

const LoginPageEnhanced = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return message.error('请输入有效的手机号');
    }
    try {
      await sendLoginCode(phone);
      message.success('验证码已发送');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '发送失败');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginWithCode(phone, code);
      localStorage.setItem('authToken', response.data.token);
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '登录失败');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%' }}>
      <Card title="登录/注册" style={{ width: 400 }}>
        <Input
          placeholder="手机号"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Input.Group compact style={{ marginBottom: 16 }}>
          <Input
            style={{ width: 'calc(100% - 100px)' }}
            placeholder="验证码"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button onClick={handleSendCode}>发送验证码</Button>
        </Input.Group>
        <Button type="primary" onClick={handleLogin} block>
          登录
        </Button>
      </Card>
    </div>
  );
};

export default LoginPageEnhanced;
