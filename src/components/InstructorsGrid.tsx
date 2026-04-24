import InstructorCard, { type InstructorCardProps } from './InstructorCard';

interface InstructorsGridProps {
  instructors: InstructorCardProps[];
}

export default function InstructorsGrid({ instructors }: InstructorsGridProps) {
  return (
    <section id="instruktorzy" className="w-full" style={{ backgroundColor: '#151E28', padding: '0 5% 64px' }}>
      <div
        className="mx-auto grid"
        style={{
          maxWidth: '1400px',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}
      >
        {instructors.map((instructor) => (
          <InstructorCard
            key={`${instructor.name}-${instructor.order}`}
            name={instructor.name}
            country={instructor.country}
            countryCode={instructor.countryCode}
            specializations={instructor.specializations}
            bioShort={instructor.bioShort}
            bioFull={instructor.bioFull}
            photo={instructor.photo}
            order={instructor.order}
          />
        ))}
      </div>
    </section>
  );
}
