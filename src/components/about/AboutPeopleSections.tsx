import { User } from 'lucide-react'
import { useLanguage } from '../../i18n'
import { Reveal } from './Reveal'

type AboutPerson = {
  name: string
  roleKey: string
  image?: string
}

const ABOUT_FOUNDERS: AboutPerson[] = [
  { name: 'Damien Hill', roleKey: 'about.role.ceo', image: '/assets/damien.webp' },
  { name: 'Ali Shahroz', roleKey: 'about.role.ops', image: '/assets/ali.webp' },
  { name: 'Jarrod Freer', roleKey: 'about.role.cro', image: '/assets/jarrod.png' },
  { name: 'Sundas Shuja', roleKey: 'about.role.aiConsultant', image: '/assets/sundas.webp' },
]

const ABOUT_ADVISORS: AboutPerson[] = [
  { name: 'Michael Leggo', roleKey: 'about.role.markets', image: '/assets/michael.png' },
  { name: 'Dr Fedja Hadzic', roleKey: 'about.role.ml', image: '/assets/fedja.png' },
  { name: 'Jules Aknin', roleKey: 'about.role.strategy', image: '/assets/jules.png' },
  { name: 'Frederic Drouin', roleKey: 'about.role.security', image: '/assets/frederic.png' },
  { name: 'Jeremy Hills', roleKey: 'about.role.transformOps', image: '/assets/jermey.png' },
  { name: 'D. Abraham', roleKey: 'about.role.legal', image: '/assets/abraham.png' },
  { name: 'Luke Phillips', roleKey: 'about.role.finance', image: '/assets/luke.png' },
  { name: 'Tanya Mills', roleKey: 'about.role.leadership', image: '/assets/tanya.png' },
  { name: 'Drew McGregor', roleKey: 'about.role.talent', image: '/assets/drew.png' },
]

const ABOUT_DEVELOPERS: AboutPerson[] = [
  { name: 'Shahyar Farooq', roleKey: 'about.role.cto', image: '/assets/shahyar.webp' },
  { name: 'Mehagan Winkle', roleKey: 'about.role.cmo', image: '/assets/aqsa.png' },
  { name: 'Fareeha Fakhar', roleKey: 'about.role.coordinator', image: '/assets/fareeha.webp' },
  { name: 'Ariful Islam', roleKey: 'about.role.aiDev', image: '/assets/ariful.png' },
  { name: 'Bob Rana', roleKey: 'about.role.marketing', image: '/assets/bob.jpg' },
]

const founderCardClass =
  'flex h-full min-w-0 flex-col rounded-3xl border border-white/40 bg-gradient-to-br from-[#cfd9ea] via-[#dde6f2] to-[#eef3f9] p-8 text-center shadow-[0_16px_48px_rgba(8,25,56,0.24)]'

const advisorCardClass =
  'flex h-full flex-col rounded-3xl border border-white/15 bg-gradient-to-br from-blue-50/30 to-white p-8 text-center shadow-[0_16px_48px_rgba(8,25,56,0.35)]'

function PersonAvatar({ alt, src }: { alt: string; src?: string }) {
  return (
    <div className="mx-auto mb-6 flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-4 ring-[color:var(--brand)]/40">
      {src ? (
        <img src={src} alt={alt} width={160} height={160} loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color:var(--brand-sky)]/50 to-white"
          aria-hidden="true"
        >
          <User className="h-10 w-10 text-[color:var(--brand)]/35" />
        </div>
      )}
    </div>
  )
}

function PersonCard({
  person,
  cardClass,
  role,
}: {
  person: AboutPerson
  cardClass: string
  role: string
}) {
  return (
    <article className={cardClass}>
      <PersonAvatar alt={person.name} src={person.image} />
      <h3 className="mb-2 text-xl font-bold text-[color:var(--navy-deep)]">{person.name}</h3>
      <p className="text-balance text-sm font-medium leading-snug text-[color:var(--navy-deep)]/75">
        {role}
      </p>
    </article>
  )
}

export function AboutPeopleSections() {
  const { t } = useLanguage()
  const advisorFirstRow = ABOUT_ADVISORS.slice(0, 5)
  const advisorSecondRow = ABOUT_ADVISORS.slice(5)

  return (
    <>
      <section
        className="section-y"
        style={{ background: 'linear-gradient(rgb(248, 251, 255) 0%, rgb(255, 255, 255) 100%)' }}
      >
        <div className="section-shell">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-[color:var(--brand)]">
                {t('about.people.founders.eyebrow')}
              </span>
              <h2 className="mt-2 mb-4 text-3xl font-bold text-[color:var(--navy-deep)] md:text-4xl">
                {t('about.people.founders.title')}
              </h2>
              <p className="mx-auto max-w-2xl text-sm text-[color:var(--navy-deep)]/80 md:text-base">
                {t('about.people.founders.desc')}
              </p>
            </div>
          </Reveal>
          <div className="flex justify-center">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:max-w-[80%] lg:grid-cols-4">
              {ABOUT_FOUNDERS.map((person) => (
                <Reveal key={person.name} className="h-full min-w-0">
                  <PersonCard
                    person={person}
                    cardClass={founderCardClass}
                    role={t(person.roleKey)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y relative overflow-hidden bg-[color:var(--navy-deep)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(820px 300px at 10% 10%, rgba(125, 178, 255, 0.2), transparent 55%), radial-gradient(680px 300px at 88% 88%, rgba(56, 189, 248, 0.14), transparent 55%)',
          }}
        />
        <div className="section-shell relative z-10">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-sky-200/95">
                {t('about.people.advisors.eyebrow')}
              </span>
              <h2 className="mb-4 mt-2 text-3xl font-bold text-white md:text-4xl">
                {t('about.people.advisors.title')}
              </h2>
              <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
                {t('about.people.advisors.desc')}
              </p>
            </div>
          </Reveal>
          <div className="mx-auto max-w-6xl space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
              {advisorFirstRow.map((person) => (
                <Reveal key={person.name} className="h-full w-full min-w-0">
                  <PersonCard
                    person={person}
                    cardClass={advisorCardClass}
                    role={t(person.roleKey)}
                  />
                </Reveal>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {advisorSecondRow.map((person) => (
                  <Reveal key={person.name} className="h-full w-full min-w-0">
                    <PersonCard
                      person={person}
                      cardClass={advisorCardClass}
                      role={t(person.roleKey)}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(rgb(232, 244, 255) 0%, rgb(245, 250, 255) 70%, rgb(255, 255, 255) 100%)',
          }}
        />
        <div className="section-shell relative z-10">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[color:var(--navy-deep)] md:text-4xl">
                {t('about.people.developers.title')}
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-base text-[color:var(--navy-deep)]/80 md:text-lg">
                {t('about.people.developers.desc')}
              </p>
            </div>
          </Reveal>
          <div className="flex justify-center">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:gap-4 xl:grid-cols-5 xl:gap-3">
              {ABOUT_DEVELOPERS.map((person) => (
                <Reveal key={person.name} className="h-full min-w-0">
                  <PersonCard
                    person={person}
                    cardClass={founderCardClass}
                    role={t(person.roleKey)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
