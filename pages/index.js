import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'

// ====================================================
// 번역 텍스트
// ====================================================
const LANGS = {
  ko: {
    metaTitle: 'Thumb-Down - YouTube 썸네일 무료 다운로드',
    metaDesc: '유튜브 영상 URL만 입력하면 HD, HQ, SD 등 모든 해상도의 썸네일을 무료로 즉시 다운로드하세요.',
    badge: '무료 · 빠름 · 간편',
    heroTitle1: 'YouTube 썸네일을',
    heroTitle2: '바로 다운로드',
    heroSub: '유튜브 URL을 붙여넣으면 모든 해상도의 썸네일을 무료로 받을 수 있어요.',
    placeholder: '유튜브 URL을 여기에 붙여넣으세요...',
    btnGet: '썸네일 가져오기',
    btnLoading: '불러오는 중...',
    btnWait: (n) => `${n}초 후 사용 가능`,
    errorInvalid: '올바른 유튜브 URL을 입력해주세요.',
    cooldownTitle: '다음 검색 대기 중',
    cooldownSub: '아래 광고를 잠시 봐주세요 :)',
    adLabel: '광고',
    resultsTitle: '다운로드할 해상도를 선택하세요',
    dlBtn: '다운로드',
    qualities: {
      maxres: 'HD · 1280×720',
      sd: 'SD · 640×480',
      hq: 'HQ · 480×360',
      mq: 'MQ · 320×180',
    },
    notAvail: '이 해상도는 없는 영상도 있어요',
    howTitle: '사용 방법',
    how1: '유튜브 영상에서 URL 복사',
    how2: '위 입력창에 URL 붙여넣기',
    how3: '원하는 해상도 선택 후 다운로드',
    footer: '© 2024 Thumb-Down. 유튜브 썸네일 무료 다운로더.',
  },
  en: {
    metaTitle: 'Thumb-Down - Free YouTube Thumbnail Downloader',
    metaDesc: 'Download YouTube thumbnails in HD, HQ, SD and all qualities for free. Just paste the video URL.',
    badge: 'Free · Fast · Easy',
    heroTitle1: 'Download YouTube',
    heroTitle2: 'Thumbnails Instantly',
    heroSub: 'Paste any YouTube URL and get all thumbnail qualities for free.',
    placeholder: 'Paste YouTube URL here...',
    btnGet: 'Get Thumbnails',
    btnLoading: 'Loading...',
    btnWait: (n) => `Wait ${n}s`,
    errorInvalid: 'Please enter a valid YouTube URL.',
    cooldownTitle: 'Getting next thumbnails ready...',
    cooldownSub: 'Please view the ad below while you wait.',
    adLabel: 'Advertisement',
    resultsTitle: 'Choose a resolution to download',
    dlBtn: 'Download',
    qualities: {
      maxres: 'HD · 1280×720',
      sd: 'SD · 640×480',
      hq: 'HQ · 480×360',
      mq: 'MQ · 320×180',
    },
    notAvail: 'Not available for all videos',
    howTitle: 'How to Use',
    how1: 'Copy the URL from any YouTube video',
    how2: 'Paste it into the input box above',
    how3: 'Choose your preferred quality and download',
    footer: '© 2024 Thumb-Down. Free YouTube Thumbnail Downloader.',
  }
}

// ====================================================
// 유틸
// ====================================================
function extractVideoId(url) {
  const str = url.trim()
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /\/embed\/([a-zA-Z0-9_-]{11})/,
    /\/shorts\/([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]
  for (const p of patterns) {
    const m = str.match(p)
    if (m) return m[1]
  }
  return null
}

function getThumbs(videoId) {
  const base = `https://img.youtube.com/vi/${videoId}`
  return [
    { key: 'maxres', url: `${base}/maxresdefault.jpg`, label: LANGS.ko.qualities.maxres },
    { key: 'sd',     url: `${base}/sddefault.jpg`,     label: LANGS.ko.qualities.sd },
    { key: 'hq',     url: `${base}/hqdefault.jpg`,     label: LANGS.ko.qualities.hq },
    { key: 'mq',     url: `${base}/mqdefault.jpg`,     label: LANGS.ko.qualities.mq },
  ]
}

// ====================================================
// AdSense 슬롯 컴포넌트
// ====================================================
function AdSlot({ slot, format = 'auto', tall = false, label = '광고', style: extraStyle = {} }) {
  const ref = useRef(null)
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  useEffect(() => {
    if (!client || !ref.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [client])

  if (!client) {
    return (
      <div className={`ad-slot${tall ? ' tall' : ''}`} style={extraStyle}>
        <span style={{ fontSize: 20 }}>📢</span>
        <span>{label} 영역</span>
        <span style={{ fontSize: 11, color: '#444', marginTop: 4 }}>
          Vercel 환경변수에 NEXT_PUBLIC_ADSENSE_CLIENT 설정 후 표시됩니다
        </span>
      </div>
    )
  }

  return (
    <div style={extraStyle}>
      <p className="ad-tag">{label}</p>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// ====================================================
// 사이드바 광고 컴포넌트 (PC 전용)
// ====================================================
function SidebarAd({ slot, label = '광고' }) {
  const ref = useRef(null)
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  useEffect(() => {
    if (!client || !ref.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [client])

  if (!client) {
    return (
      <div className="sidebar-ad-placeholder">
        <span style={{ fontSize: 18 }}>📢</span>
        <span style={{ fontSize: 12, color: '#555', marginTop: 6 }}>{label}</span>
        <span style={{ fontSize: 10, color: '#444', marginTop: 4, textAlign: 'center' }}>
          160×600
        </span>
      </div>
    )
  }

  return (
    <div className="sidebar-ad-wrap">
      <p className="ad-tag">{label}</p>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block', width: '160px', height: '600px' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="vertical"
        data-full-width-responsive="false"
      />
    </div>
  )
}

// ====================================================
// 메인 컴포넌트
// ====================================================
export default function Home() {
  const [lang, setLang] = useState('ko')
  const [url, setUrl] = useState('')
  const [thumbs, setThumbs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const [maxCooldown, setMaxCooldown] = useState(12)
  const [showCooldownAd, setShowCooldownAd] = useState(false)
  const [soundDownBanner, setSoundDownBanner] = useState(false)
  const [adsOn, setAdsOn] = useState(true)

  const t = LANGS[lang]

  // 설정 불러오기
  useEffect(() => {
    const savedLang = localStorage.getItem('yt_lang')
    const savedCooldown = localStorage.getItem('yt_cooldown_dur')
    if (savedLang && LANGS[savedLang]) setLang(savedLang)
    if (savedCooldown) setMaxCooldown(parseInt(savedCooldown))

    // 진행 중인 쿨다운 복원
    const end = localStorage.getItem('yt_cooldown_end')
    if (end) {
      const rem = Math.ceil((parseInt(end) - Date.now()) / 1000)
      if (rem > 0) {
        setCooldown(rem)
        setShowCooldownAd(true)
      }
    }

    // Supabase에서 설정 불러오기
    fetch('/api/settings/get')
      .then(r => r.json())
      .then(data => {
        if (data.cooldown) setMaxCooldown(data.cooldown)
        if (data.soundDownBanner !== undefined) setSoundDownBanner(data.soundDownBanner)
        if (data.adsOn !== undefined) setAdsOn(data.adsOn)
      })
      .catch(() => {})
  }, [])

  // 쿨다운 타이머
  useEffect(() => {
    if (cooldown <= 0) {
      setShowCooldownAd(false)
      return
    }
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  const toggleLang = () => {
    const next = lang === 'ko' ? 'en' : 'ko'
    setLang(next)
    localStorage.setItem('yt_lang', next)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (cooldown > 0 || loading) return
    setError('')

    const id = extractVideoId(url)
    if (!id) {
      setError(t.errorInvalid)
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 300))
    setThumbs(getThumbs(id))
    setLoading(false)

    // 쿨다운 시작 (핵심 광고 전략!)
    const dur = maxCooldown
    setCooldown(dur)
    setShowCooldownAd(true)
    localStorage.setItem('yt_cooldown_end', (Date.now() + dur * 1000).toString())
  }

  const handleDownload = async (thumbUrl, key) => {
    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(thumbUrl)}`)
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `youtube_thumbnail_${key}.jpg`
      a.click()
      URL.revokeObjectURL(a.href)
    } catch {
      window.open(thumbUrl, '_blank')
    }
  }

  const cooldownPct = maxCooldown > 0 ? cooldown / maxCooldown : 0
  const circumference = 2 * Math.PI * 24 // r=24

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="google-site-verification" content="4s-t07Ji_IxVyEEVbpH---jQxGWU_6kAY-WbsI-lBZ4" />
        <meta name="google-adsense-account" content="ca-pub-2161169464776476" />
        <meta name="description" content={t.metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDesc} />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        <style>{`
          .page-layout {
            display: flex;
            justify-content: center;
            gap: 0;
            align-items: flex-start;
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 12px;
          }
          .sidebar {
            display: none;
            flex-shrink: 0;
            width: 180px;
            padding-top: 24px;
            position: sticky;
            top: 24px;
          }
          .sidebar-ad-placeholder {
            width: 160px;
            height: 600px;
            background: #161616;
            border: 1px dashed #2a2a2a;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #555;
            font-size: 12px;
          }
          .sidebar-ad-wrap {
            width: 160px;
          }
          .main-content {
            flex: 1;
            min-width: 0;
            max-width: 780px;
          }
          @media (min-width: 1100px) {
            .sidebar { display: block; }
          }
        `}</style>
      </Head>

      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="wrap header-inner">
          <a href="/" className="logo">
            <div className="logo-icon">▶</div>
            <span className="logo-text">Thumb<span>-Down</span></span>
          </a>
          <div className="header-right">
            {soundDownBanner && (
              <a
                href="https://www.sound-down.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#1a1a2e',
                  border: '1px solid #2a2a4a',
                  borderRadius: 8,
                  padding: '6px 12px',
                  color: '#8888ff',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#5555cc'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a4a'}
              >
                🔊 Sound-Down
              </a>
            )}
            <button className="lang-btn" onClick={toggleLang}>
              {lang === 'ko' ? '🇺🇸 English' : '🇰🇷 한국어'}
            </button>
          </div>
        </div>
      </header>

      {/* 상단 광고 */}
      {adsOn && (
        <div className="wrap" style={{ marginTop: 24 }}>
          <AdSlot
            slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP || '1111111111'}
            label={t.adLabel}
          />
        </div>
      )}

      {/* ===== 좌우 사이드바 + 메인 레이아웃 ===== */}
      <div className="page-layout">

        {/* 왼쪽 사이드바 광고 */}
        {adsOn && (
          <aside className="sidebar">
            <SidebarAd
              slot={process.env.NEXT_PUBLIC_AD_SLOT_LEFT || '5555555555'}
              label={t.adLabel}
            />
          </aside>
        )}

        {/* 메인 콘텐츠 */}
        <main className="main-content">
          {/* ===== HERO ===== */}
          <section className="hero">
            <div className="hero-badge">{t.badge}</div>
            <h1 className="hero-title">
              {t.heroTitle1} <span className="highlight">{t.heroTitle2}</span>
            </h1>
            <p className="hero-sub">{t.heroSub}</p>
          </section>

          {/* ===== SEARCH FORM ===== */}
          <form onSubmit={handleSubmit}>
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder={t.placeholder}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading || cooldown > 0}
              />
              <button
                type="submit"
                className={`search-btn${cooldown > 0 ? ' waiting' : ''}`}
                disabled={loading || cooldown > 0}
              >
                {loading
                  ? t.btnLoading
                  : cooldown > 0
                  ? t.btnWait(cooldown)
                  : t.btnGet}
              </button>
            </div>
            {error && <p className="error-text">{error}</p>}
          </form>

          {/* ===== 쿨다운 + 광고 ===== */}
          {showCooldownAd && cooldown > 0 && (
            <div className="cooldown-block">
              <div className="cooldown-top">
                <div className="ring-wrap">
                  <svg className="ring-svg" viewBox="0 0 56 56">
                    <circle className="ring-bg" cx="28" cy="28" r="24" />
                    <circle
                      className="ring-progress"
                      cx="28"
                      cy="28"
                      r="24"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference * (1 - cooldownPct)}
                    />
                  </svg>
                  <span className="ring-num">{cooldown}</span>
                </div>
                <div className="cooldown-text">
                  <strong>{t.cooldownTitle}</strong>
                  <p>{t.cooldownSub}</p>
                </div>
              </div>
              {adsOn && (
                <AdSlot
                  slot={process.env.NEXT_PUBLIC_AD_SLOT_COOLDOWN || '2222222222'}
                  format="rectangle"
                  tall={true}
                  label={t.adLabel}
                />
              )}
            </div>
          )}

          {/* ===== 결과 썸네일 ===== */}
          {thumbs.length > 0 && (
            <section className="results-section">
              <h2 className="results-title">{t.resultsTitle}</h2>
              <div className="thumb-grid">
                {thumbs.map((thumb) => (
                  <div key={thumb.key} className="thumb-card">
                    <div className="thumb-img-wrap">
                      <img
                        src={thumb.url}
                        alt={thumb.label}
                        className="thumb-img"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="thumb-na">
                        <span>🚫</span>
                        <span style={{ fontSize: 12 }}>{t.notAvail}</span>
                      </div>
                    </div>
                    <div className="thumb-footer">
                      <span className="quality-badge">{thumb.label}</span>
                      <button
                        className="dl-btn"
                        onClick={() => handleDownload(thumb.url, thumb.key)}
                      >
                        ↓ {t.dlBtn}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 결과 하단 광고 */}
          {thumbs.length > 0 && adsOn && (
            <AdSlot
              slot={process.env.NEXT_PUBLIC_AD_SLOT_MIDDLE || '3333333333'}
              label={t.adLabel}
            />
          )}

          {/* ===== 사용 방법 ===== */}
          <section className="how-section">
            <h2 className="section-title">{t.howTitle}</h2>
            <div className="steps">
              {[t.how1, t.how2, t.how3].map((text, i) => (
                <div key={i} className="step">
                  <div className="step-num">{i + 1}</div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* 오른쪽 사이드바 광고 */}
        {adsOn && (
          <aside className="sidebar">
            <SidebarAd
              slot={process.env.NEXT_PUBLIC_AD_SLOT_RIGHT || '6666666666'}
              label={t.adLabel}
            />
          </aside>
        )}

      </div>

      {/* ===== Sound-Down 크로스 프로모션 배너 ===== */}
      {soundDownBanner && (
        <div className="wrap" style={{ marginBottom: 24 }}>
        <a
          href="https://www.sound-down.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #0d0d2b 0%, #1a1a3e 100%)',
            border: '1px solid #2a2a5a',
            borderRadius: 14,
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 36 }}>🔊</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#aaaaff', marginBottom: 4 }}>
                  Sound-Down
                </div>
                <div style={{ color: '#6666aa', fontSize: 13 }}>
                  {lang === 'ko'
                    ? '무료 효과음 다운로드 — 유튜버·크리에이터를 위한 CC0 사운드'
                    : 'Free Sound Effects — CC0 Sounds for YouTubers & Creators'}
                </div>
              </div>
            </div>
            <div style={{
              background: '#3333aa',
              color: '#fff',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}>
              {lang === 'ko' ? '바로가기 →' : 'Visit →'}
            </div>
          </div>
        </a>
      </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="wrap">
          {adsOn && (
            <AdSlot
              slot={process.env.NEXT_PUBLIC_AD_SLOT_FOOTER || '4444444444'}
              label={t.adLabel}
            />
          )}
          <p className="footer-text">{t.footer}</p>
          <a href="/admin" className="admin-link">admin</a>
        </div>
      </footer>
    </>
  )
}
