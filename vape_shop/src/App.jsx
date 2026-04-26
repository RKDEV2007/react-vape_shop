import './App.css';
import { useMemo, useState } from 'react';
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import BorderGlow from './BorderGlow';
import Stack from './Stack';
import { getProductById, products } from './Poducts';

const NAV_ITEMS = [
  { label: 'Каталог', category: null },
  { label: 'Одноразки', category: 'Одноразка' },
  { label: 'Жидкости', category: 'Жидкость' },
  { label: 'Аксессуары', category: 'Аксессуар' },
  { label: 'Контакты', action: 'contacts' },
];

function productToStackCards(product) {
  return product.images.map((src, i) => (
    <img
      key={`${product.id}-${i}`}
      src={src}
      alt={`${product.name} — фото ${i + 1}`}
      className="card-image"
    />
  ));
}

function VapeProductCard({ product }) {
  const stackCards = useMemo(() => productToStackCards(product), [product]);

  return (
    <Link to={`/product/${product.id}`} className="vape-card-link">
      <BorderGlow
        edgeSensitivity={30}
        glowColor="292 88 72"
        backgroundColor="#120F17"
        borderRadius={18}
        glowRadius={20}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={['#a855f7', '#d946ef', '#f472b6']}
      >
        <article className="vape-slot">
          <div className="vape-photo-stack" aria-label={`Галерея: ${product.name}`}>
            <Stack
              key={product.id}
              cards={stackCards}
              sensitivity={120}
              sendToBackOnClick
              mobileClickOnly
            />
          </div>
          <span className="vape-category">{product.category}</span>
          <h2 className="vape-name">{product.name}</h2>
          <p className="vape-details">{product.details}</p>
          <p className="vape-price">{product.price}</p>
        </article>
      </BorderGlow>
    </Link>
  );
}

function SiteHeader({ categoryFilter, onCategoryChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavClick(item) {
    if (item.action === 'contacts') {
      document.getElementById('site-footer')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    onCategoryChange(item.category ?? null);
    if (location.pathname !== '/') {
      navigate('/');
    }
  }

  return (
    <header className="site-header">
      <div className="site-header-row">
        <Link to="/" className="site-logo" onClick={() => onCategoryChange(null)}>
          Vape Shop
        </Link>
        <p className="app-title">Добро пожаловать</p>
      </div>

      <nav className="nav-bar" aria-label="Основная навигация">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.action !== 'contacts' &&
            (item.category == null ? categoryFilter == null : categoryFilter === item.category);
          return (
            <button
              key={item.label}
              type="button"
              className={`nav-button${isActive ? ' nav-button--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => handleNavClick(item)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

function Catalog({ categoryFilter }) {
  const filtered = useMemo(() => {
    if (!categoryFilter) return products;
    return products.filter((p) => p.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <main className="catalog-main">
      <p className="catalog-intro">
        {categoryFilter
          ? `Категория: ${categoryFilter}. Товаров: ${filtered.length}.`
          : `В каталоге ${products.length} позиций. Выберите категорию или откройте карточку.`}
      </p>

      <section className="vape-grid" aria-label="Сетка товаров">
        {filtered.map((product) => (
          <VapeProductCard key={product.id} product={product} />
        ))}
      </section>

      {filtered.length === 0 && (
        <p className="catalog-empty">В этой категории пока нет товаров.</p>
      )}
    </main>
  );
}

function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = productId ? getProductById(productId) : undefined;
  const stackCards = useMemo(() => (product ? productToStackCards(product) : []), [product]);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="product-page">
      <button type="button" className="back-link" onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <div className="product-layout">
        <div className="product-visual">
          <div className="product-hero-stack" aria-label={`Интерактивная галерея: ${product.name}`}>
            <Stack
              key={product.id}
              cards={stackCards}
              sensitivity={160}
              sendToBackOnClick
              mobileClickOnly
            />
          </div>

          <section className="product-gallery-strip" aria-label="Все изображения товара">
            <h3 className="product-gallery-title">Галерея</h3>
            <div className="product-gallery-thumbs">
              {product.images.map((src, i) => (
                <img
                  key={`${product.id}-thumb-${i}`}
                  src={src}
                  alt={`${product.name} — миниатюра ${i + 1}`}
                  className="product-gallery-thumb"
                />
              ))}
            </div>
          </section>
        </div>

        <div className="product-panel">
          <span className="vape-category">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>
          <p className="vape-details product-details">{product.details}</p>
          <p className="vape-price product-price">{product.price}</p>
          <Link to="/" className="product-to-catalog">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    </main>
  );
}

function SiteFooter() {
  return (
    <footer id="site-footer" className="site-footer">
      <div className="site-footer-grid">
        <div className="site-footer-col">
          <h2 className="site-footer-heading">Магазин</h2>
          <ul className="site-footer-list">
            <li>
              <Link to="/">Каталог</Link>
            </li>
            <li>
              <a href="#site-footer">Доставка и оплата</a>
            </li>
            <li>
              <a href="#site-footer">Гарантия</a>
            </li>
          </ul>
        </div>
        <div className="site-footer-col">
          <h2 className="site-footer-heading">Контакты</h2>
          <ul className="site-footer-list">
            <li>г. Питер, пр. Примерный, 1</li>
            <li>
              <a href="tel:+78001234567">8 (800) 123-45-67</a>
            </li>
            <li>
              <a href="mailto:hello@vape-shop.example">hello@vape-shop.example</a>
            </li>
          </ul>
        </div>
        <div className="site-footer-col">
          <h2 className="site-footer-heading">Юридическое</h2>
          <p className="site-footer-note">
            Сайт демонстрационный. 18+ только для совершеннолетних. Не является публичной офертой.
          </p>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span className="site-footer-bottom-text">© {new Date().getFullYear()} Vape Shop</span>
      </div>
    </footer>
  );
}

function AppShell() {
  const [categoryFilter, setCategoryFilter] = useState(null);

  return (
    <div className="app">
      <div className="app-main">
        <SiteHeader categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter} />
        <Routes>
          <Route path="/" element={<Catalog categoryFilter={categoryFilter} />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
