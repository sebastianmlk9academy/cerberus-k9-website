interface TeamMember {
    rank: string;
    role: string;
    role_pl?: string;
    name: string;
    military: string;
    bio: string;
    bio_short_pl?: string;
    initials: string;
    photo?: string;
  }

interface TeamMemberInput {
  name: string;
  role: string;
  role_pl?: string;
  photo?: string;
  unit?: string;
  bioShort: string;
  bio_short_pl?: string;
  email?: string;
}

interface TeamSectionProps {
  lang?: string;
  members?: TeamMemberInput[];
}

const teamCopy: Record<string, { sectionTag: string; role1: string; role2: string }> = {
  pl: { sectionTag: 'ZARZĄD FUNDACJI', role1: 'PREZES ZARZĄDU', role2: 'WICEPREZES ZARZĄDU' },
  en: { sectionTag: 'FOUNDATION BOARD', role1: 'PRESIDENT', role2: 'VICE-PRESIDENT' },
  de: { sectionTag: 'VORSTAND', role1: 'VORSITZENDER', role2: 'STELLVERTRETENDER VORSITZENDER' },
  fr: { sectionTag: 'CONSEIL DE FONDATION', role1: 'PRÉSIDENT', role2: 'VICE-PRÉSIDENT' },
};
  
  const membersByLang = (c: { role1: string; role2: string }): TeamMember[] => [
    {
      rank: "01",
      role: c.role1,
      name: "Mariusz Lis",
      military:
        "POLICJA · SAPER · EMERYTOWANY ATK · SZKOLENIOWIEC CENTRUM SZKOLENIA POLICJI · INSTRUKTOR K9",
      bio: "Mariusz Lis to emerytowany funkcjonariusz Policji z wieloletnim doświadczeniem w pracy z psami K9. Certyfikowany saper, członek Grupy ATK, szkoleniowiec Centrum Szkolenia Policji. Prezes Fundacji PACTA K9.",
      initials: "ML",
    },
    {
      rank: "02",
      role: c.role2,
      name: "Sebastian Bożek",
      military: "WOJSKA OBRONY TERYTORIALNEJ · 7 PBOT · INSTRUKTOR K9",
      bio: "Sebastian Bożek to żołnierz Wojsk Obrony Terytorialnej ze stażem ponad 8 lat w 7 Pomorskiej Brygadzie Obrony Terytorialnej oraz wieloletni członek organizacji proobronnej. Instruktor K9, koordynator strategiczny i operacyjny CERBERUS K9. Odpowiada za całość strategii, logistyki, dokumentacji i kontaktów instytucjonalnych Fundacji PACTA K9.",
      initials: "SB",
    },
  ];
  
  function MemberCard({ member, photoSrc }: { member: TeamMember; photoSrc?: string }) {
    return (
      <article
        className="relative overflow-hidden flex flex-col"
        style={{
          backgroundColor: "#1E2B38",
          border: "1px solid #253344",
        }}
      >
        {/* Photo area */}
        <div
          className="relative w-full aspect-square flex items-center justify-center"
          style={{ backgroundColor: "#151E28" }}
        >
          {photoSrc || member.name === "Mariusz Lis" || member.name === "Sebastian Bożek" ? (
            <div className="absolute inset-0">
              <img
                src={photoSrc || "/images/instruktorzy/test_instruktor_photo.webp"}
                alt={member.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </div>
          ) : (
            <>
              {/* Initials placeholder */}
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: "120px",
                  height: "120px",
                  border: "1px solid #253344",
                  backgroundColor: "#1E2B38",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "44px",
                    color: "#C4922A",
                    letterSpacing: "2px",
                  }}
                >
                  {member.initials}
                </span>
              </div>
            </>
          )}
  
          {/* Bottom overlay gradient */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background: "linear-gradient(to bottom, transparent, #1E2B38)",
            }}
          />
  
          {/* Rank badge */}
          <div
            className="absolute top-4 right-4 px-3 py-1"
            style={{
              backgroundColor: "rgba(196,146,42,0.85)",
              color: "#0F1720",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "9px",
              letterSpacing: "2px",
              fontWeight: 700,
            }}
          >
            {member.rank}
          </div>
        </div>
  
        {/* Content */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto auto auto 1fr",
            gap: "0px",
            padding: "20px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              minHeight: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "9px",
                letterSpacing: "5px",
                color: "#C42B2B",
                fontWeight: 700,
                marginBottom: "6px",
                whiteSpace: "nowrap",
              }}
            >
              {member.role_pl ?? member.role ?? ''}
            </div>
          </div>
          <div
            style={{
              minHeight: "48px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "28px",
                color: "#E4DDD0",
                letterSpacing: "1px",
                margin: 0,
                lineHeight: 1.1,
                whiteSpace: "nowrap",
              }}
            >
              {member.name}
            </h3>
          </div>
          <div
            style={{
              fontFamily: "'Rajdhani', sans-serif",
                fontSize: "11px",
              letterSpacing: "2px",
              color: "#C4922A",
              marginTop: "8px",
              marginBottom: "12px",
              minHeight: "48px",
              overflow: "hidden",
            }}
          >
            {member.military}
          </div>
          <p
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "13px",
              color: "#5A6A7A",
              lineHeight: 1.7,
              margin: 0,
              alignSelf: "start",
            }}
          >
            {member.bio_short_pl ?? member.bio ?? ''}
          </p>
        </div>
      </article>
    );
  }
  
  export function TeamSection({ lang, members: membersProp }: TeamSectionProps) {
    const c = teamCopy[lang ?? 'pl'] ?? teamCopy['en'];
    const members = membersProp && membersProp.length > 0
      ? membersProp.map((m, idx) => ({
          rank: String(idx + 1).padStart(2, "0"),
          role: m.role ?? '',
          role_pl: m.role_pl,
          name: m.name,
          military: m.unit ?? "",
          bio: m.bioShort ?? '',
          bio_short_pl: m.bio_short_pl,
          initials: m.name.split(" ").map((part) => part[0] ?? "").join("").slice(0, 2).toUpperCase(),
          photo: m.photo ?? "",
        }))
      : membersByLang(c).map((m) => ({ ...m, photo: "" }));
    return (
      <section style={{ backgroundColor: "#151e28", padding: "80px 24px" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
              <span className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]">
                {c.sectionTag}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
            </div>
            <h2
              className="font-[family-name:var(--font-rajdhani)] uppercase text-2xl sm:text-3xl lg:text-[32px]"
              style={{
                fontWeight: 700,
                color: "#E4DDD0",
                letterSpacing: "2px",
              }}
            >
              PACTA K9
            </h2>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {members.map((m) => (
              <MemberCard key={member_key(m)} member={m} photoSrc={m.photo} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  function member_key(m: TeamMember) {
    return m.name;
  }
  
  export default TeamSection;
  