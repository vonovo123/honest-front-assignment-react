import { useState, useEffect, useCallback, useRef } from 'react';
function PhoneCertification({
  onChangeCode,
  onClickSubmitBtn,
  value,
  goNavigtion,
  onClickReRegistBtn,
}) {
  const [token, code, loading, reLoading] = value;
  const [time, setTime] = useState(180);
  const [done, setDone] = useState(false);
  let timer = null;
  const checkValidate = useCallback(() => {
    let flag = true;
    if (code === '') flag = false;
    setDone(flag ? 'done' : '');
  }, [code]);
  const setTimer = useCallback(() => {
    return setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearTimeout(timer);
        alert('인증가능시간이 만료되었습니다. 처음화면으로 돌아갑니다.');
      }
    }, 1000);
  }, [time, timer]);
  useEffect(() => {
    if (!token) {
      alert('잘못된 접근입니다. 처음부터 다시 진행해주세요.');
      goNavigtion('/identity-authentication');
    }
  }, []);
  useEffect(() => {
    timer = setTimer();
  }, [time]);
  useEffect(() => {
    checkValidate();
  }, [code, checkValidate]);
  return (
    <main className="component">
      <div className="wrapper">
        <header>
          <h2>휴대폰 번호로 전송된</h2>
          <h2>인증번호를 입력해 주세요.</h2>
        </header>
        <div className="body">
          <fieldset>
            <legend>
              인증번호
              <span className="timer">
                {Math.floor(time / 60)}:
                {Math.floor(time % 60) < 10
                  ? '0' + Math.floor(time % 60)
                  : Math.floor(time % 60)}
              </span>
            </legend>
            <div className="input-wrapper">
              <input
                className="input"
                type="text"
                value={code}
                onChange={(e) => {
                  onChangeCode(e.target.value || '');
                }}
              />
              <div
                className="re-regist"
                onClick={(e) => {
                  onClickReRegistBtn();
                }}
              >
                {reLoading === 'true' ? (
                  <span className="loading">
                    <span className="loading-dot"></span>
                    <span className="loading-dot"></span>
                    <span className="loading-dot"></span>
                  </span>
                ) : (
                  '재전송'
                )}
              </div>
            </div>
          </fieldset>
          <button
            className={'next-btn ' + done}
            onClick={(e) => {
              if (done !== 'done') return;
              clearTimeout(timer);
              onClickSubmitBtn();
              timer = setTimer();
            }}
          >
            {loading === 'true' ? (
              <span className="loading">
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
              </span>
            ) : (
              '본인인증하기'
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default PhoneCertification;
