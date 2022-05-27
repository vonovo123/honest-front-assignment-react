const fetchData = async (type, payLoad) => {
  try {
    const result = await fetch(`/tech/frontend/personal/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    });
    if (!result.ok) {
      const { error } = await result.json();
      if (error) {
        throw new Error(error);
      }
      throw new Error('API 조회 오류입니다. 다시 시도해주세요.');
    }
    return result.json();
  } catch (e) {
    throw e;
  }
};

export default fetchData;
