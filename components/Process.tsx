
'use client';

const processSteps = [
  {
    step: 1,
    title: "Análisis de referencias fotográficas",
    description: "Estudiamos cada detalle de tus fotos para capturar la esencia perfecta",
    icon: "ri-camera-line"
  },
  {
    step: 2,
    title: "Modelado 3D profesional (Blender + Shapr3D)",
    description: "Creamos el modelo digital con precisión milimétrica usando software profesional",
    icon: "ri-3d-model-line"
  },
  {
    step: 3,
    title: "Evaluación complejidad",
    description: "Mensaje post-solicitud sobre segmentación y ajustes necesarios",
    icon: "ri-search-eye-line"
  },
  {
    step: 4,
    title: "Optimización para impresión",
    description: "Preparamos soportes y estructura para garantizar calidad perfecta",
    icon: "ri-settings-3-line"
  },
  {
    step: 5,
    title: "Impresión Saturn 4 Ultra 16K",
    description: "Tecnología de precisión micrométrica para detalles excepcionales",
    icon: "ri-printer-line"
  },
  {
    step: 6,
    title: "Wash & Cure",
    description: "Limpieza con IPA + curado UV 360° para acabado profesional",
    icon: "ri-drop-line"
  },
  {
    step: 7,
    title: "Acabado final",
    description: "Lijado perfecto + pintado artístico manual por expertos",
    icon: "ri-brush-line"
  },
  {
    step: 8,
    title: "¡En tus manos!",
    description: "Tu figura única lista para formar parte de tu colección",
    icon: "ri-gift-line"
  }
];

export default function Process() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">NUESTRO PROCESO</h2>
          <p className="text-xl text-gray-300">De la idea a la realidad en 8 pasos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="relative bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Número del paso */}
              <div className="absolute -top-4 left-6 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {step.step}
              </div>
              
              {/* Icono */}
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4 mt-2">
                <i className={`${step.icon} text-2xl text-red-400`}></i>
              </div>
              
              {/* Contenido */}
              <h3 className="text-lg font-bold mb-3 text-white leading-tight">
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Línea de proceso visual */}
        <div className="mt-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400 transform -translate-y-1/2 hidden lg:block"></div>
          <div className="flex justify-between items-center relative z-10">
            {processSteps.map((_, index) => (
              <div
                key={index}
                className="w-4 h-4 bg-red-600 rounded-full border-4 border-gray-900 hidden lg:block"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
