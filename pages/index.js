import Head from 'next/head';

export default function Home() {
  async function handleCheckout() {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('결제 오류: ' + data.error);
      }
    } catch (error) {
      alert('결제 처리 중 오류 발생');
    }
  }

  return (
    <>
      <Head>
        <title>영춘 - 자유를 향한 여정</title>
        <meta name="description" content="영춘 소개 페이지" />
      </Head>
      <main style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
        <h1>무한 자유와 부와 번영을 향한 여정</h1>
        <h2>About Youngchun</h2>
        <p>영춘은 현실적인 생각과 경제적 자유를 추구하는 사업자의 브랜드입니다. 무한한 자유와 풍요로운 번영을 꿈꾸며, 창립자인 병찬의 굴곡진 인생 여정을 통해 얻은 철학과 비전을 공유합니다.</p>
        <h2>Service Preview</h2>
        <p>우리는 ‘해외 부재 실시간 착신 서비스’를 비롯하여, 고객들이 언제 어디서나 연결될 수 있도록 돕는 다양한 기능을 준비하고 있습니다. 단순한 알림을 넘어 업무와 삶을 조율하는 통합 플랫폼을 목표로 하며, 향후에는 편리한 예약 시스템과 AI 기반 응대 서비스도 선보일 예정입니다.</p>
        <h2>Contact & Call to Action</h2>
        <p>궁금한 점이나 제안이 있으시면 언제든지 연락해 주세요. 현재 베타 이용권을 구매하실 수 있습니다. 아래 버튼을 통해 결제를 진행하시면, 해외 모드 설정 페이지로 이동합니다.</p>
        <button onClick={handleCheckout}>베타 이용권 구매 (₩5,000)</button>
      </main>
    </>
  );
}
