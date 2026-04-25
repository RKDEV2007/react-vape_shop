import './App.css'
import BorderGlow from './BorderGlow';
import Button from './Button';



function App() {


  return (
   <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '16px' }}>
    <BorderGlow
  edgeSensitivity={30}
  glowColor="292 88 72"
  backgroundColor="#120F17"
  borderRadius={20}
  glowRadius={24}
  glowIntensity={1}
  coneSpread={25}
  animated={false}
  colors={['#a855f7', '#d946ef', '#f472b6']}
>
  <div style={{ padding: '20px 24px', width: '300px', textAlign: 'center', color: '#ffffff' }}>
    <h2 style={{ fontSize: '22px', marginBottom: '8px' }}>Добро пожаловать</h2>
    <p style={{ fontSize: '14px', opacity: 0.85 }}>в наш магазин</p>
    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
      <Button />
    </div>
  </div>
</BorderGlow>

   </div>

  )

}

export default App
