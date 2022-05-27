import { useState, useEffect, useCallback } from 'react';
function IdentityAuthentication({
  onChangePhonenum,
  onChangeCivleCode,
  onChangeName,
  onClickRegistBtn,
  value,
}) {
  const [phonenum, civilCode, name, loading] = value;
  const [done, setDone] = useState(false);
  const checkValidate = useCallback(() => {
    let flag = true;
    phonenum.forEach((v) => {
      if (v === '') flag = false;
    });
    civilCode.forEach((v) => {
      if (v === '') flag = false;
    });
    if (name === '') flag = false;
    setDone(flag ? 'done' : '');
  }, [phonenum, civilCode, name]);
  useEffect(() => {
    checkValidate();
  }, [phonenum, civilCode, name, checkValidate]);
  return (
    <main className="component">
      <div className="wrapper">
        <header>
          <h2>비대면 대출을 위해 본인인증이 필요해요.</h2>
        </header>
        <div className="body">
          <fieldset>
            <legend>휴대폰 번호</legend>
            <div className="input-wrapper">
              <input
                className="input phonenum"
                type="text"
                value={phonenum[0]}
                onChange={(e) => onChangePhonenum(0, e.target.value)}
              />
              <span className="dash">-</span>
              <input
                className="input phonenum"
                type="text"
                value={phonenum[1]}
                onChange={(e) => onChangePhonenum(1, e.target.value)}
              />
              <span className="dash">-</span>
              <input
                className="input"
                type="text"
                value={phonenum[2]}
                onChange={(e) => onChangePhonenum(2, e.target.value)}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>주민등록번호</legend>
            <div className="input-wrapper">
              <input
                className="input"
                type="text"
                placeholder="앞 6자리"
                value={civilCode[0]}
                onChange={(e) => onChangeCivleCode(0, e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="뒤 7자리"
                value={civilCode[1]}
                onChange={(e) => onChangeCivleCode(1, e.target.value)}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>이름</legend>
            <div className="input-wrapper">
              <input
                className="input"
                type="text"
                placeholder="이름을 입력해 주세요."
                value={name}
                onChange={(e) => onChangeName(e.target.value)}
              />
            </div>
          </fieldset>
          <button
            className={'next-btn ' + done}
            onClick={(e) => {
              if (loading === 'true' || done !== 'done') return;
              onClickRegistBtn();
            }}
          >
            {loading === 'true' ? (
              <span className="loading">
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
              </span>
            ) : (
              '다음'
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default IdentityAuthentication;
