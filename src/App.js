import { Navigate, Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import IdentityAuthentication from './IdentityAuthentication';
import PhoneCertification from './PhoneCertification';
import './styles.css';
import { useState } from 'react';
import fetchData from './API.js';
function App() {
  const [phonenum, setPhonenum] = useState(['010', '', '']);
  const [civilCode, setCivilCode] = useState(['', '']);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState('false');
  const [reLoading, setReLoading] = useState('false');
  const [token, setToken] = useState('');
  const [code, setCode] = useState('');

  const navigate = useNavigate();

  const onChangePhonenum = (idx, value) => {
    let newPhonenum = [...phonenum];
    newPhonenum[idx] = value;
    setPhonenum(newPhonenum);
  };

  const onChangeCivleCode = (idx, value) => {
    let newCivilCode = [...civilCode];
    newCivilCode[idx] = value;
    setCivilCode(newCivilCode);
  };

  const onChangeName = (value) => {
    setName(value);
  };

  const onChangeCode = (value) => {
    setCode(value);
  };

  const goNavigtion = (to) => {
    navigate(to);
  };
  const onClickRegistBtn = async () => {
    const payLoad = {
      name,
      civilcodeFirst: civilCode[0],
      civilCodeLast: civilCode[1],
      mobile: phonenum.join(''),
    };
    try {
      setLoading('true');
      const result = await fetchData('request', payLoad);
      if (result.error) throw new Error(result.error);
      setToken(result.response.token);
      goNavigtion('/phone-certification');
    } catch (e) {
      alert(e);
    } finally {
      setLoading('false');
    }
  };

  const onClickSubmitBtn = async () => {
    const payLoad = {
      token,
      code,
    };
    try {
      setLoading('true');
      const result = await fetchData('submit', payLoad);
      alert('인증완료');
      goNavigtion('/');
      clearInputDate();
    } catch (e) {
      alert(e);
    } finally {
      setLoading('false');
      setCode('');
    }
  };
  const onClickReRegistBtn = async () => {
    const payLoad = {
      name,
      civilcodeFirst: civilCode[0],
      civilCodeLast: civilCode[1],
      mobile: phonenum.join(''),
    };
    try {
      setReLoading('true');
      const result = await fetchData('request', payLoad);
      if (result.error) throw new Error(result.error);
      setToken(result.response.token);
      alert('인증번호가 재전송 되었습니다.');
    } catch (e) {
      alert(e);
    } finally {
      setReLoading('false');
      setCode('');
    }
  };
  const clearInputDate = () => {
    setCode('');
    setPhonenum(['010', '', '']);
    setCivilCode(['', '']);
    setName('');
  };
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/identity-authentication" replace />}
      />
      <Route
        path="/identity-authentication"
        element={
          <IdentityAuthentication
            value={[phonenum, civilCode, name, loading]}
            onChangePhonenum={onChangePhonenum}
            onChangeCivleCode={onChangeCivleCode}
            onChangeName={onChangeName}
            onClickRegistBtn={onClickRegistBtn}
          />
        }
      />
      <Route
        path="/phone-certification"
        element={
          <PhoneCertification
            value={[token, code, loading, reLoading]}
            onChangeCode={onChangeCode}
            onClickSubmitBtn={onClickSubmitBtn}
            goNavigtion={goNavigtion}
            onClickReRegistBtn={onClickReRegistBtn}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
