import Head from 'next/head'
import Link from 'next/link'

export default function Terms() {
  return (
    <>
      <Head>
        <title>이용약관 | Thumb-Down</title>
        <meta name="description" content="Thumb-Down 이용약관 — 서비스 이용 조건 및 주의사항을 안내합니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* HEADER */}
      <header className="header">
        <div className="wrap header-inner">
          <Link href="/" className="logo">
            <div className="logo-icon">▶</div>
            <span className="logo-text">Thumb<span>-Down</span></span>
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <main className="wrap" style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div style={{ maxWidth: 680 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 6 }}>
            이용약관
          </h1>
          <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 48 }}>
            최종 업데이트: 2025년 1월 1일
          </p>

          <Section title="1. 서비스 소개">
            <p>
              Thumb-Down(thumb-down.com)은 YouTube 영상의 썸네일 이미지를 무료로 다운로드할 수 있는
              도구 서비스입니다. 본 서비스를 이용함으로써 아래 약관에 동의한 것으로 간주합니다.
            </p>
          </Section>

          <Section title="2. 서비스 이용 조건">
            <p>다음 조건에 동의하는 경우에만 서비스를 이용할 수 있습니다.</p>
            <ul>
              <li>만 14세 이상이어야 합니다.</li>
              <li>관련 법령 및 YouTube 서비스 이용약관을 준수해야 합니다.</li>
              <li>다운로드한 이미지의 저작권은 원 콘텐츠 제작자에게 있습니다.</li>
              <li>서비스를 상업적 목적으로 무단 이용하거나 자동화(크롤링)하는 것을 금지합니다.</li>
            </ul>
          </Section>

          <Section title="3. 저작권 안내">
            <p>
              Thumb-Down은 YouTube의 공개 이미지 서버(img.youtube.com)를 통해 썸네일을 제공합니다.
              다운로드된 이미지의 저작권은 해당 유튜버 또는 YouTube에 있으며, 개인적인 참고 목적
              외의 무단 상업적 사용은 저작권법 위반이 될 수 있습니다.
            </p>
          </Section>

          <Section title="4. 면책 조항">
            <p>
              Thumb-Down은 이용자가 다운로드한 이미지의 사용으로 인한 법적 문제에 대해 책임을
              지지 않습니다. 서비스는 "있는 그대로" 제공되며, 특정 목적에 대한 적합성을 보증하지
              않습니다.
            </p>
          </Section>

          <Section title="5. 서비스 변경 및 중단">
            <p>
              Thumb-Down은 사전 고지 없이 서비스를 변경하거나 일시 중단할 수 있습니다.
              서비스 중단으로 인한 손해에 대해 책임을 지지 않습니다.
            </p>
          </Section>

          <Section title="6. 광고">
            <p>
              본 서비스는 Google AdSense를 통한 광고를 포함합니다. 광고 콘텐츠는 Google이
              관리하며 Thumb-Down과 무관합니다.
            </p>
          </Section>

          <Section title="7. 준거법">
            <p>
              본 약관은 대한민국 법률에 따라 해석되며, 분쟁 발생 시 대한민국 법원을 관할 법원으로
              합니다.
            </p>
          </Section>

          <Section title="8. 문의">
            <ul>
              <li>이메일: contact@thumb-down.com</li>
              <li>운영자: Thumb-Down 운영팀</li>
            </ul>
          </Section>

          <div style={{ marginTop: 48, display: 'flex', gap: 16 }}>
            <Link href="/privacy" style={{ color: 'var(--text3)', fontSize: 13, textDecoration: 'none' }}>
              개인정보처리방침 →
            </Link>
            <Link href="/faq" style={{ color: 'var(--text3)', fontSize: 13, textDecoration: 'none' }}>
              자주 묻는 질문 →
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <p className="footer-text">© 2024 Thumb-Down. 유튜브 썸네일 무료 다운로더.</p>
          <Link href="/admin" className="admin-link">admin</Link>
        </div>
      </footer>

      <style jsx>{`
        .section {
          margin-bottom: 40px;
        }
        .section-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 14px;
          padding-left: 12px;
          border-left: 3px solid var(--accent);
        }
        .section-body {
          color: var(--text2);
          font-size: 14px;
          line-height: 1.85;
        }
        .section-body p { margin-bottom: 8px; }
        .section-body ul {
          list-style: disc;
          padding-left: 20px;
          margin-top: 8px;
        }
        .section-body ul li { margin-bottom: 4px; }
      `}</style>
    </>
  )
}

function Section({ title, children }) {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      <div className="section-body">{children}</div>
    </div>
  )
}
