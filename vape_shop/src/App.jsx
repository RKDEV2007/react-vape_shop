import './App.css'
import BorderGlow from './BorderGlow';
import { products } from './Poducts';
function App() {
  const navItems = ['Каталог', 'Одноразки', 'Жидкости', 'Аксессуары', 'Контакты'];

//фильтрация продуктов
// потом сделать страницу основную, потом много страниц для каждого продукта
//галлерея для каждого продукта
//подвал

  return (
    <div className="app">
      <h1 className="app-title">Добро пожаловать</h1>

      <nav className="nav-bar" aria-label="Основная навигация">
        {navItems.map((item) => (
          <button key={item} className="nav-button" type="button">
            {item}
          </button>
        ))}
      </nav>

      <section className="vape-grid" aria-label="Сетка товаров">
        {products.map((product) => (
          <BorderGlow
            key={product.name}
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
              <img
                className="vape-photo-slot"
                src={product.image}
                alt={product.name}
              />
              <span className="vape-category">{product.category}</span>
              <h3 className="vape-name">{product.name}</h3>
              <p className="vape-details">{product.details}</p>
              <p className="vape-price">{product.price}</p>
            </article>
          </BorderGlow>
        ))}
      </section>
    </div>

  )

}

export default App
