// PhotoSwipe v5 の ESモジュールインポート（CDN経由）
import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5/dist/photoswipe-lightbox.esm.js';

// Lightboxの初期化
const lightbox = new PhotoSwipeLightbox({
  gallery: '#my-gallery',
  children: 'a',
  // フル解像度画像の読み込みモジュール
  pswpModule: () => import('https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js'),
  // ズーム時のアニメーション設定
  showHideAnimationType: 'zoom',
  imageClickAction: 'zoom',
  tapAction: 'toggle-controls',
  bgOpacity: 0.95
});

// data-caption 属性からテキストを取得してキャプションを表示するカスタム機能
lightbox.on('uiRegister', function() {
  lightbox.pswp.ui.registerElement({
    name: 'custom-caption',
    order: 9,
    isButton: false,
    appendTo: 'wrapper',
    html: 'Caption text',
    onInit: (el, pswp) => {
      lightbox.pswp.on('change', () => {
        const currSlideElement = lightbox.pswp.currSlide.data.element;
        let captionHTML = '';
        if (currSlideElement) {
          const hiddenCaption = currSlideElement.getAttribute('data-caption');
          if (hiddenCaption) {
            // HTMLエンティティのエスケープ処理などをここで行うことも可能
            captionHTML = hiddenCaption;
          }
        }
        el.innerHTML = captionHTML || '';
        el.className = 'pswp__custom-caption';
        if (!captionHTML) {
          el.style.display = 'none';
        } else {
          el.style.display = 'block';
        }
      });
    }
  });
});

lightbox.init();

// ---
// Console確認用: CloudinaryのURLフォーマット規則の出力
console.log(`
[画像最適化エンジン稼働中]
Thumbnail: q_auto,f_auto (WebP/AVIF自動判別 & 圧縮)
Original:  無圧縮フル解像度データ
`);