export function FabricStandardsSection() {
  const pillars = [
    {
      index: '01.',
      title: 'Full Unstitched Yardage',
      description:
        'Every 3-piece suite includes clearly specified cloth lengths—typically 2.50 to 2.75 meters for the shirt, 2.50 meters for the trouser, and 2.50 meters for the dupatta or shawl—giving your tailor ample fabric for relaxed or structured silhouettes.',
    },
    {
      index: '02.',
      title: 'Season-Matched Weaves',
      description:
        'Our fabrics are chosen for climate comfort and clean drape: high-twist Swiss voile lawn for summer breathability, combed cambric for transitional months, cotton-silk jacquard for daytime formals, and slub karandi for winter.',
    },
    {
      index: '03.',
      title: 'Transparent Nationwide Delivery',
      description:
        'All prices are listed cleanly in Pakistani Rupees with Cash on Delivery available across major cities and towns. Orders above PKR 10,000 qualify for complimentary nationwide shipping.',
    },
  ];

  return (
    <section id="fabric-standards" className="border-t border-[#E7E3DC] bg-[#F3F1ED]/60 py-16 md:py-24">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-[#57534E] mb-2">
            Fabric Guide &amp; Standards
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1C1917] tracking-tight text-balance">
            Thoughtful cloth specifications, clearly presented.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-10 border-t border-[#E7E3DC]">
          {pillars.map((pillar) => (
            <div key={pillar.index} className="flex flex-col">
              <span className="text-xs font-medium text-[#113D32] tabular-nums">
                {pillar.index}
              </span>
              <h3 className="mt-2 font-display text-2xl font-medium text-[#1C1917]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#57534E]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
