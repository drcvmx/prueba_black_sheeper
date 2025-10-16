import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-[#211C18]">
      <Navbar />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
           <p className="text-xl text-[#E0E0E0] font-light">
            Desarrollado por
          </p>
          <h1 className="text-8xl font-black text-[#FFB800] mb-4 tracking-tight">
            DRCV
          </h1>
        </div>
      </main>
    </div>
  );
}

export default App;
