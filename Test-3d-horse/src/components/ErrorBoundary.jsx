import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[RTMS Equine Clinic] 3D Engine Error Caught:', error, errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  handleResetFallback = () => {
    try {
      localStorage.setItem('rtms_horse_fallback', 'true')
    } catch {
      // ignore
    }
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <div className="error-card">
            <div className="error-icon-badge">⚠️</div>
            <h2 className="error-title">Sự Cố Không Gian 3D (WebGL / Canvas Exception)</h2>
            <p className="error-desc">
              Hệ thống dựng hình 3D gặp trục trặc trong quá trình kết xuất mô hình giải phẫu hoặc tài nguyên đồ họa.
            </p>
            <div className="error-details-box">
              <code>{this.state.error?.message || 'Lỗi không xác định khi tải shader hoặc đối tượng 3D.'}</code>
            </div>
            <div className="error-actions">
              <button
                type="button"
                className="btn-error-primary"
                onClick={this.handleReload}
              >
                🔄 Thử Tải Lại Trang
              </button>
              <button
                type="button"
                className="btn-error-secondary"
                onClick={this.handleResetFallback}
              >
                🐎 Khôi Phục Mô Hình Cơ Bản
              </button>
            </div>
            <p className="error-hint">
              Khuyến nghị: Sử dụng trình duyệt Chrome/Edge mới nhất có hỗ trợ WebGL 2.0 và bật tăng tốc phần cứng.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
