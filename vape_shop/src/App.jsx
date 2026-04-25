import './App.css'
import BorderGlow from './BorderGlow';
function App() {
  const navItems = ['Каталог', 'Одноразки', 'Жидкости', 'Аксессуары', 'Контакты'];
  const products = [
    { category: 'Одноразка', name: 'WAKA SoPro PA10000', details: 'Вкус: Berry Ice • 20 мг', price: '1 390 ₽' },
    { category: 'Одноразка', name: 'WAKA Smash 6000', details: 'Вкус: Mango Peach • 20 мг', price: '1 090 ₽' },
    { category: 'Pod-система', name: 'Smoant Pasito 3', details: 'Мощность: до 50W • Картридж 3 мл', price: '3 990 ₽' },
    { category: 'Жидкость', name: 'Chaser Salt Grape Soda 30 мл', details: 'Крепость: 20 мг • Соотношение 50/50', price: '790 ₽' },
    { category: 'Аксессуар', name: 'Smoant хлопок (веревка)', details: 'Для намотки и обслуживания', price: '350 ₽' },
  ];

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
              <div className="vape-photo-slot" aria-label={`Место для фото: ${product.name}`} />
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
