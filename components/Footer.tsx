
'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1 - Información de la empresa */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <img 
                src="https://static.readdy.ai/image/cb6ca7f6c3078da1085a9be5e4fc7971/8d2f6f7f7f8e0bc692a739566f5202b9.png"
                alt="8craft Store Logo"
                className="h-12 w-auto"
              />
            </div>
            <h3 className="text-lg font-semibold text-red-400">Dante Rojas</h3>
            <p className="text-gray-300">Creador de Experiencias 3D</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Transformando ideas en realidades tangibles con tecnología de impresión 3D de última generación.
            </p>
          </div>

          {/* Columna 2 - Contacto */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-phone-line text-red-400"></i>
                </div>
                <span className="text-gray-300">+56 9 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-mail-line text-red-400"></i>
                </div>
                <span className="text-gray-300">hola@8craftstore.cl</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-map-pin-line text-red-400"></i>
                </div>
                <span className="text-gray-300">Santiago, Chile</span>
              </div>
            </div>
          </div>

          {/* Columna 3 - Servicios */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer">Figuras Personalizadas</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer">Prototipos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer">Maquetas</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer">Reparaciones 3D</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer">Consultoría</a></li>
            </ul>
          </div>

          {/* Columna 4 - Redes Sociales */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-instagram-line text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-facebook-line text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-youtube-line text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-whatsapp-line text-white"></i>
              </a>
            </div>
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-gray-400 mb-2">Horarios de Atención</h5>
              <p className="text-sm text-gray-300">Lun - Vie: 9:00 - 18:00</p>
              <p className="text-sm text-gray-300">Sáb: 10:00 - 14:00</p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 8craft Store. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">Términos de Servicio</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">Política de Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
