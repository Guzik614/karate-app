import type { Metadata } from "next";
import Image from "next/image";
import { academy50, club, contact, photos, team, type TeamMember } from "@/content/club";

export const metadata: Metadata = {
  title: "O Klubie & Trenerze",
  description: `${club.name}: karate Kyokushin, kickboxing, boks, capoeira, trening hybrydowy i Akademia 50+ w Radomiu.`,
};

export default function ClubPage() {
  const [headCoach, ...staff] = team;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;
  const contactRows = [
    { label: "Adres", value: [contact.address, contact.city].filter(Boolean).join(", ") },
    { label: "Telefon", value: contact.phone, href: `tel:+48${contact.phone.replace(/\s/g, "")}` },
    { label: "WhatsApp", value: contact.whatsapp && "Napisz do nas", href: `https://wa.me/${contact.whatsapp}` },
    { label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Facebook", value: contact.facebook && "Profil klubu", href: contact.facebook },
    { label: "Instagram", value: contact.instagram && "Profil klubu", href: contact.instagram },
    { label: "Strona", value: club.website.replace(/^https?:\/\/|\/$/g, ""), href: club.website },
  ].filter((row) => row.value);

  return (
    <div className="space-y-14">
      {/* Nagłówek ze zdjęciem sali */}
      <section className="relative overflow-hidden rounded-2xl border border-border">
        <Image src={club.heroImage} alt="Sala Dragon Fight Club" fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="relative px-6 py-12 md:px-10 md:py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-accent-text">
            Od {club.founded} roku · {club.traditionYears} lat tradycji
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">{club.name}</h1>
          <p className="mt-4 max-w-xl text-foreground/85">{club.lead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:+48${contact.phone.replace(/\s/g, "")}`} className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-white hover:bg-accent-hover">
              Zadzwoń: {contact.phone}
            </a>
            <a href="#kontakt" className="rounded-lg border border-border bg-background/60 px-5 py-2.5 font-semibold hover:border-accent hover:text-accent-text">
              Jak do nas trafić
            </a>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section>
        <SectionTitle>O klubie</SectionTitle>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-3 leading-relaxed">
            {club.history.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <blockquote className="border-l-4 border-accent pl-4 text-lg font-semibold italic">„{club.motto}”</blockquote>
          </div>
          <dl className="grid grid-cols-2 gap-3 self-start">
            {club.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-3xl font-bold text-accent-text">{s.value}</span>
                  <span className="text-sm text-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Dyscypliny */}
      <section>
        <SectionTitle>Nasze zajęcia</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {club.disciplines.map((d) => (
            <div key={d.name} className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold">{d.name}</h3>
              <p className="mt-1 text-sm text-muted">{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kadra */}
      <section>
        <SectionTitle>Kadra trenerska</SectionTitle>
        <article className="grid gap-6 rounded-2xl border border-accent/40 bg-card p-6 md:grid-cols-[14rem_1fr]">
          <Portrait member={headCoach} className="mx-auto w-full max-w-56 md:max-w-none" />
          <div>
            <p className="text-sm text-accent-text">{headCoach.role}</p>
            <h3 className="mt-1 flex flex-wrap items-center gap-3 text-2xl font-bold">
              {headCoach.name}
              {headCoach.rank && <RankBadge rank={headCoach.rank} />}
            </h3>
            <p className="mt-3 leading-relaxed">{headCoach.bio}</p>
            {headCoach.achievements && (
              <>
                <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-muted">Osiągnięcia sportowe</h4>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {headCoach.achievements.map((a) => (
                    <li key={a} className="flex gap-2 rounded-lg bg-input px-3 py-2 text-sm">
                      <span aria-hidden className="text-accent-text">🏅</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </article>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((m) => (
            <article key={m.name} className="flex flex-col rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-accent-text">{m.role}</p>
              <h3 className="mt-1 flex flex-wrap items-center gap-2 text-lg font-semibold">
                {m.name}
                {m.rank && <RankBadge rank={m.rank} small />}
              </h3>
              <p className="mt-2 text-sm text-muted">{m.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Akademia 50+ */}
      <section className="rounded-2xl border border-border bg-gradient-to-br from-card to-input p-6 md:p-8">
        <div className="mb-2 h-1 w-10 rounded-full bg-accent" />
        <h2 className="text-2xl font-bold tracking-tight">{academy50.title}</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-foreground/85">{academy50.lead}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {academy50.points.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-background/60 p-4">
              <h3 className="font-semibold text-accent-text">{p.title}</h3>
              <p className="mt-1 text-sm">{p.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-semibold">{academy50.closing}</p>
      </section>

      {/* Galeria */}
      <section>
        <SectionTitle>Galeria</SectionTitle>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              className={`group relative overflow-hidden rounded-xl border border-border bg-input ${
                i === 0 ? "col-span-2 aspect-[16/9] md:row-span-2 md:aspect-auto" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pt-8 pb-2 text-sm">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="scroll-mt-20">
        <SectionTitle>Kontakt i lokalizacja</SectionTitle>
        <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-border bg-card p-6">
            <dl className="space-y-3">
              {contactRows.map((row) => (
                <div key={row.label}>
                  <dt className="text-xs uppercase tracking-wide text-muted">{row.label}</dt>
                  <dd className="font-medium">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="hover:text-accent-text"
                        target={row.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:bg-accent-hover"
            >
              Wyznacz trasę
            </a>
          </div>
          <iframe
            title={`Mapa: ${club.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full rounded-2xl border border-border md:aspect-auto md:h-full md:min-h-80"
          />
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="mb-2 h-1 w-10 rounded-full bg-accent" />
      <h2 className="text-2xl font-bold tracking-tight">{children}</h2>
    </div>
  );
}

// Czarny pas z czerwonymi belkami: liczba belek = stopień dan.
function RankBadge({ rank, small = false }: { rank: string; small?: boolean }) {
  const dan = Number.parseInt(rank, 10) || 0;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border border-white/15 bg-black font-semibold text-white ${
        small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
    >
      <span aria-hidden className="flex gap-0.5">
        {Array.from({ length: dan }, (_, i) => (
          <span key={i} className={`${small ? "h-2.5 w-1" : "h-3 w-1.5"} rounded-[1px] bg-accent`} />
        ))}
      </span>
      {rank}
    </span>
  );
}

function Portrait({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-input ${className ?? ""}`}>
      {member.photo ? (
        <Image src={member.photo} alt={member.name} fill sizes="14rem" className="object-cover" />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-muted">
          <span aria-hidden className="text-6xl font-bold text-accent/40">龍</span>
          <span className="text-sm">Zdjęcie wkrótce</span>
        </div>
      )}
    </div>
  );
}
