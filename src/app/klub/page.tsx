import type { Metadata } from "next";
import Image from "next/image";
import { club, coach, contact, photos } from "@/content/club";

export const metadata: Metadata = {
  title: "O Klubie & Trenerze",
  description: `${club.name}: karate Kyokushin, kickboxing, boxing, capoeira i fitness w Radomiu.`,
};

export default function ClubPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;
  const contactRows = [
    { label: "Adres", value: [contact.address, contact.city].filter(Boolean).join(", ") },
    { label: "Telefon", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Facebook", value: contact.facebook && "Profil klubu", href: contact.facebook },
    { label: "Instagram", value: contact.instagram && "Profil klubu", href: contact.instagram },
    { label: "Strona", value: club.website.replace(/^https?:\/\/|\/$/g, ""), href: club.website },
  ].filter((row) => row.value);

  return (
    <div className="space-y-12">
      {/* Nagłówek */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-input p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 right-2 select-none text-[9rem] leading-none font-bold text-accent/10 md:text-[12rem]"
        >
          龍
        </span>
        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-widest text-accent-text">
            Od {club.founded} roku w Radomiu
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{club.name}</h1>
          <p className="mt-3 max-w-2xl text-muted">{club.lead}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {club.disciplines.map((d) => (
              <li key={d.name} className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-sm">
                {d.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* O klubie */}
      <section>
        <SectionTitle>O klubie</SectionTitle>
        <div className="max-w-3xl space-y-3 leading-relaxed">
          {club.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {club.disciplines.map((d) => (
            <div key={d.name} className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold">{d.name}</h3>
              <p className="mt-1 text-sm text-muted">{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trener */}
      <section>
        <SectionTitle>Trener</SectionTitle>
        <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-[16rem_1fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-60 overflow-hidden rounded-xl border border-border bg-input md:max-w-none">
            {coach.photo ? (
              <Image src={coach.photo} alt={coach.name} fill sizes="16rem" className="object-cover" />
            ) : (
              <PhotoPlaceholder caption="Zdjęcie trenera" />
            )}
          </div>
          <div>
            <p className="text-sm text-accent-text">{coach.title}</p>
            <h3 className="mt-1 text-2xl font-bold">{coach.name}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {coach.ranks.map((rank) => (
                <li key={rank} className="flex items-center gap-2 rounded-lg bg-accent px-3 py-1 text-sm font-semibold text-white">
                  <span aria-hidden className="inline-block h-2.5 w-6 rounded-sm bg-black ring-1 ring-white/30" />
                  {rank}
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-3 leading-relaxed">
              {coach.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {coach.achievements.length > 0 && (
              <>
                <h4 className="mt-6 font-semibold">Osiągnięcia sportowe</h4>
                <ul className="mt-2 space-y-1.5">
                  {coach.achievements.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span aria-hidden className="text-accent-text">▸</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section>
        <SectionTitle>Galeria</SectionTitle>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {photos.map((photo) => (
            <figure key={photo.caption} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-input">
              {photo.src ? (
                <>
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pt-6 pb-2 text-sm">
                    {photo.caption}
                  </figcaption>
                </>
              ) : (
                <PhotoPlaceholder caption={photo.caption} />
              )}
            </figure>
          ))}
        </div>
      </section>

      {/* Kontakt */}
      <section>
        <SectionTitle>Kontakt i lokalizacja</SectionTitle>
        <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
          <dl className="space-y-3 rounded-2xl border border-border bg-card p-6">
            {contactRows.map((row) => (
              <div key={row.label}>
                <dt className="text-xs uppercase tracking-wide text-muted">{row.label}</dt>
                <dd className="font-medium">
                  {row.href ? (
                    <a href={row.href} className="hover:text-accent-text" target={row.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:bg-accent-hover"
            >
              Wyznacz trasę
            </a>
          </dl>
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

function PhotoPlaceholder({ caption }: { caption: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center text-muted">
      <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 16-5-5-8 8" />
      </svg>
      <span className="text-sm">{caption}</span>
    </div>
  );
}
