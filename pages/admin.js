import { useState, useEffect } from 'react'
import Head from 'next/head'

const DEFAULT_PW = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin1234'

// ===== 스타일 =====
const S = {
  page: {
    minHeight: '100vh',
    background: '#0c0c0c',
    fontFamily: "'Outfit', sans-serif",
    color: '#f0f0f0',
    padding: '0 0 60px',
  },
  wrap: { maxWidth: 820, margin: '0 auto', padding: '0 20px' },
  card: {
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: 14,
    padding: 28,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 700,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  row: {
    background: '#1f1f1f',
    border: '1px solid #2a2a2a',
    borderRadius: 10,
    padding: '14px 18px',
    marginBottom: 8,
  },
  code: { color: '#ff8888', fontFamily: 'monospace', fontSize: 13 },
  label: { color: '#888', fontSize: 13, marginTop: 3 },
  example: { color: '#555', fontSize: 12, fontFamily: 'monospace' },
  input: {
    background: '#1f1f1f',
    border: '1px solid #333',
    borderRadius: 8,
    padding: '10px 14px',
    color: '#f0f0f0',
    fontFamily: "'Outfit', sans-serif",
    fontSize: 15,
    outline: 'none',
    width: '100%',
  },
  btn: (color = '#e63946') => ({
    background: color,
    color: '#fff',
    border: 'none',
    borderRadius: 9,
    padding: '11px 28px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
  }),
}

// ===== 토글 컴포넌트 =====
function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 50,
        height: 28,
        borderRadius: 14,
        background: value ? '#e63946' : '#333',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          background: '#fff',
          position: 'absolute',
          top: 3,
          left: value ? 25 : 3,
          transition: 'left 0.2s',
        }}
      />
    </div>
  )
}

// ===== 로그인 화면 =====
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (pw === DEFAULT_PW) {
      onLogin()
    } else {
      setErr(true)
      setTimeout(() => setErr(false), 2000)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0c0c0c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;900&display=swap"
        rel="stylesheet"
      />
      <div
        style={{
          background: '#161616',
          border: '1px solid #2a2a2a',
          borderRadius: 14,
          padding: 40,
          width: 360,
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: '#e63946',
              borderRadius: 11,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              marginBottom: 16,
            }}
          >
            ▶
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#f0f0f0' }}>
            Admin
          </h1>
          <p style={{ color: '#666', fontSize: 14, marginTop: 4 }}>
            Thumb-Down 관리자 패널
          </p>
        </div>
        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            style={{
              ...S.input,
              borderColor: err ? '#e63946' : '#333',
              marginBottom: 8,
            }}
          />
          {err && (
            <p style={{ color: '#e63946', fontSize: 13, marginBottom: 8 }}>
              비밀번호가 틀렸습니다
            </p>
          )}
          <button type="submit" style={{ ...S.btn(), width: '100%', marginTop: 8 }}>
            로그인
          </button>
        </form>
        <p style={{ color: '#444', fontSize: 12, marginTop: 16, textAlign: 'center' }}>
          기본 비밀번호: admin1234 (환경변수로 변경 권장)
        </p>
      </div>
    </div>
  )
}

// ===== 대시보드 =====
export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [cooldownDur, setCooldownDur] = useState(12)
  const [adsOn, setAdsOn] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('admin_ok') === '1') setAuthed(true)
    const c = localStorage.getItem('yt_cooldown_dur')
    const a = localStorage.getItem('yt_ads_on')
    if (c) setCooldownDur(parseInt(c))
    if (a !== null) setAdsOn(a !== 'false')
  }, [])

  const handleLogin = () => {
    setAuthed(true)
    sessionStorage.setItem('admin_ok', '1')
  }

  const handleSave = () => {
    localStorage.setItem('yt_cooldown_dur', cooldownDur.toString())
    localStorage.setItem('yt_ads_on', adsOn.toString())
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (!authed) return <LoginScreen onLogin={handleLogin} />

  return (
    <>
      <Head>
        <title>Admin · Thumb-Down</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={S.page}>
        {/* 헤더 */}
        <div
          style={{
            borderBottom: '1px solid #1f1f1f',
            padding: '18px 0',
            marginBottom: 36,
          }}
        >
          <div
            style={{
              ...S.wrap,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800 }}>관리자 대시보드</h1>
              <p style={{ color: '#555', fontSize: 13, marginTop: 2 }}>
                Thumb-Down Admin Panel
              </p>
            </div>
            <a
              href="/"
              style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}
            >
              ← 사이트 보기
            </a>
          </div>
        </div>

        <div style={S.wrap}>
          {/* ===== 섹션 1: 광고 설정 ===== */}
          <div style={S.card}>
            <h2 style={S.cardTitle}>💰 애드센스 연동 가이드</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>
              Vercel 대시보드 → 프로젝트 → Settings → Environment Variables 에서 아래 값을 추가하세요.
            </p>

            {[
              {
                key: 'NEXT_PUBLIC_ADSENSE_CLIENT',
                desc: '애드센스 게시자 ID',
                example: 'ca-pub-1234567890123456',
                important: true,
              },
              {
                key: 'NEXT_PUBLIC_AD_SLOT_TOP',
                desc: '상단 배너 광고 슬롯 ID',
                example: '1111111111',
              },
              {
                key: 'NEXT_PUBLIC_AD_SLOT_COOLDOWN',
                desc: '⭐ 쿨다운 광고 슬롯 ID (가장 중요! 사용자가 반드시 봄)',
                example: '2222222222',
                important: true,
              },
              {
                key: 'NEXT_PUBLIC_AD_SLOT_MIDDLE',
                desc: '결과 하단 광고 슬롯 ID',
                example: '3333333333',
              },
              {
                key: 'NEXT_PUBLIC_AD_SLOT_FOOTER',
                desc: '하단 광고 슬롯 ID',
                example: '4444444444',
              },
              {
                key: 'NEXT_PUBLIC_ADMIN_PASSWORD',
                desc: '관리자 비밀번호 (반드시 변경!)',
                example: '안전한_비밀번호_입력',
                important: true,
              },
            ].map(({ key, desc, example, important }) => (
              <div
                key={key}
                style={{
                  ...S.row,
                  borderColor: important ? '#3a2a2a' : '#2a2a2a',
                  borderLeftColor: important ? '#e63946' : '#2a2a2a',
                  borderLeftWidth: important ? 3 : 1,
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}
                >
                  <div>
                    <span style={S.code}>{key}</span>
                    <p style={S.label}>{desc}</p>
                  </div>
                  <span style={S.example}>{example}</span>
                </div>
              </div>
            ))}

            <div
              style={{
                background: '#0d1f0d',
                border: '1px solid #1a3a1a',
                borderRadius: 10,
                padding: 16,
                marginTop: 16,
              }}
            >
              <p style={{ color: '#5a9a5a', fontSize: 13, lineHeight: 1.7 }}>
                ✅ <strong>설정 순서:</strong><br />
                1. Google AdSense 가입 및 사이트 승인<br />
                2. 광고 단위 생성 → 슬롯 ID 복사<br />
                3. Vercel 환경변수에 위 값들 추가<br />
                4. Vercel에서 재배포 (Redeploy)
              </p>
            </div>
          </div>

          {/* ===== 섹션 2: 수익 전략 ===== */}
          <div style={S.card}>
            <h2 style={S.cardTitle}>📊 수익화 전략 설명</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 14,
              }}
            >
              {[
                {
                  icon: '⏱️',
                  title: '쿨다운 광고',
                  color: '#2a1a1a',
                  accent: '#e63946',
                  desc: '검색 후 10~15초 대기 동안 광고 강제 노출. 가장 높은 수익 구간.',
                },
                {
                  icon: '📍',
                  title: '4개 광고 슬롯',
                  color: '#1a1a2a',
                  accent: '#4a6aff',
                  desc: '상단/쿨다운/결과하단/푸터에 배치. 페이지뷰당 최대 수익.',
                },
                {
                  icon: '🌐',
                  title: '한/영 이중 언어',
                  color: '#1a2a1a',
                  accent: '#4aaa6a',
                  desc: '한국어 + 영어 지원으로 글로벌 트래픽 확보. 영어권 CPC가 더 높음.',
                },
                {
                  icon: '🔍',
                  title: 'SEO 기본 설정',
                  color: '#2a2a1a',
                  accent: '#aaaa4a',
                  desc: 'meta title/description 최적화. "유튜브 썸네일 다운로드" 키워드 타겟.',
                },
              ].map(({ icon, title, desc, color, accent }) => (
                <div
                  key={title}
                  style={{
                    background: color,
                    border: `1px solid ${accent}33`,
                    borderRadius: 10,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontWeight: 700, marginBottom: 6, color: accent }}>
                    {title}
                  </div>
                  <div style={{ color: '#888', fontSize: 13, lineHeight: 1.5 }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== 섹션 3: 사이트 설정 ===== */}
          <div style={S.card}>
            <h2 style={S.cardTitle}>⚙️ 사이트 설정</h2>

            {/* 쿨다운 설정 */}
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <label style={{ fontWeight: 600 }}>쿨다운 시간</label>
                <span
                  style={{
                    background: '#e63946',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '3px 12px',
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {cooldownDur}초
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                value={cooldownDur}
                onChange={(e) => setCooldownDur(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#e63946', cursor: 'pointer' }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 6,
                }}
              >
                <span style={{ color: '#555', fontSize: 12 }}>5초 (이탈 낮음)</span>
                <span style={{ color: '#555', fontSize: 12 }}>30초 (광고 수익 높음)</span>
              </div>
              <div
                style={{
                  background: '#1f1f1f',
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 12,
                }}
              >
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6 }}>
                  💡 <strong style={{ color: '#888' }}>최적값: 10~15초</strong>
                  &nbsp;— 쿨다운이 짧으면 이탈률이 낮지만 광고 수익이 줄고,
                  너무 길면 사용자가 이탈합니다. 10~15초가 수익과 UX의 균형점입니다.
                </p>
              </div>
            </div>

            {/* 광고 on/off */}
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>광고 활성화</div>
                  <div style={{ color: '#666', fontSize: 13, marginTop: 2 }}>
                    {adsOn ? '광고가 표시됩니다' : '광고가 숨겨집니다'}
                  </div>
                </div>
                <Toggle value={adsOn} onChange={setAdsOn} />
              </div>
            </div>

            <button
              onClick={handleSave}
              style={{
                ...S.btn(saved ? '#2d7a2d' : '#e63946'),
                transition: 'background 0.3s',
              }}
            >
              {saved ? '✅ 저장 완료!' : '설정 저장'}
            </button>
          </div>

          {/* ===== 섹션 4: 배포 가이드 ===== */}
          <div style={S.card}>
            <h2 style={S.cardTitle}>🚀 Vercel 배포 가이드</h2>
            <div style={{ counterReset: 'step' }}>
              {[
                {
                  title: 'GitHub에 코드 업로드',
                  desc: 'git init → git add . → git commit → GitHub 새 저장소에 push',
                },
                {
                  title: 'Vercel 연결',
                  desc: 'vercel.com → Add New Project → GitHub 저장소 선택',
                },
                {
                  title: '환경 변수 설정',
                  desc: 'Settings → Environment Variables → 위 NEXT_PUBLIC_* 키들 모두 추가',
                },
                {
                  title: '배포 & 애드센스 신청',
                  desc: '사이트 URL이 생기면 Google AdSense에 사이트 등록 → 승인 대기 (보통 1~2주)',
                },
                {
                  title: '도메인 연결 (선택)',
                  desc: '카페24/가비아 등에서 도메인 구매 후 Vercel에 연결하면 SEO에 유리',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 16,
                    padding: '14px 0',
                    borderBottom: i < 4 ? '1px solid #1f1f1f' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      background: '#e63946',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 14,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
