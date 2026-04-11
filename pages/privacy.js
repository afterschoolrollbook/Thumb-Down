import Head from 'next/head'
import Link from 'next/link'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>개인정보처리방침 | Thumb-Down</title>
        <meta name="description" content="Thumb-Down 개인정보처리방침 — 수집 정보, 이용 목적, 보관 기간을 안내합니다." />
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
            개인정보처리방침
          </h1>
          <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 48 }}>
            최종 업데이트: 2025년 1월 1일
          </p>

          <Section title="1. 수집하는 정보">
            <p>Thumb-Down은 서비스 제공을 위해 아래와 같은 정보를 처리할 수 있습니다.</p>
            <ul>
              <li>입력한 YouTube URL (서버에 저장되지 않음, 브라우저에서만 처리)</li>
              <li>Google AdSense를 통한 쿠키 및 광고 관련 데이터</li>
              <li>Google Analytics를 통한 방문 통계 (익명 처리됨)</li>
            </ul>
          </Section>

          <Section title="2. 정보 이용 목적">
            <p>수집된 정보는 다음 목적으로만 사용됩니다.</p>
            <ul>
              <li>YouTube 썸네일 다운로드 기능 제공</li>
              <li>서비스 품질 개선 및 통계 분석</li>
              <li>Google AdSense 맞춤형 광고 표시</li>
            </ul>
          </Section>

          <Section title="3. 정보 보관 및 파기">
            <p>
              입력된 YouTube URL은 어떠한 서버에도 저장되지 않으며, 브라우저 세션 종료 시
              자동으로 삭제됩니다. 광고 관련 쿠키는 Google의 개인정보처리방침에 따라 관리됩니다.
            </p>
          </Section>

          <Section title="4. 제3자 제공">
            <p>
              Thumb-Down은 수집한 개인정보를 제3자에게 제공하지 않습니다. 단, Google AdSense 및
              Google Analytics 서비스 이용 시 해당 서비스의 약관이 적용됩니다.
            </p>
            <ul>
              <li>
                Google 개인정보처리방침:{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent)' }}
                >
                  policies.google.com/privacy
                </a>
              </li>
            </ul>
          </Section>

          <Section title="5. 쿠키 사용">
            <p>
              본 사이트는 Google AdSense 광고 최적화를 위해 쿠키를 사용합니다. 브라우저 설정을
              통해 쿠키를 비활성화할 수 있으나, 일부 기능이 제한될 수 있습니다.
            </p>
          </Section>

          <Section title="6. 이용자의 권리">
            <p>이용자는 언제든지 아래 방법으로 개인정보 관련 문의를 할 수 있습니다.</p>
            <ul>
              <li>이메일: contact@thumb-down.com</li>
              <li>처리 기간: 요청일로부터 7일 이내</li>
            </ul>
          </Section>

          <Section title="7. 개인정보처리방침 변경">
            <p>
              본 방침은 법령 또는 서비스 변경에 따라 수정될 수 있습니다. 변경 시 본 페이지를 통해
              안내합니다.
            </p>
          </Section>

          <div style={{ marginTop: 48, display: 'flex', gap: 16 }}>
            <Link href="/terms" style={{ color: 'var(--text3)', fontSize: 13, textDecoration: 'none' }}>
              이용약관 →
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
        .section-body a:hover { text-decoration: underline; }
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
