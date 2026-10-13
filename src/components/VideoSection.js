'use client'

export default function VideoSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Proses Pembuatan Pagar
            </h3>
            <p className="text-gray-600">
              Mulai dari pengukuran, pembuatan rangka, hingga pemasangan
              di lokasi pelanggan.
            </p>
          </div>

          {/* VIDEO */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="relative h-[420px] rounded-xl overflow-hidden shadow-lg">
              <video
                src="/video/pagar.mp4"
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
