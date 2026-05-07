import { aboutContent } from '@/data/about';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Card } from '@/components/ui/Card';

export function AboutSection() {
  return (
    <Section id="about" className="section-divider">
      <Container>
        <Heading title={aboutContent.title} subtitle={aboutContent.description} className="mb-[var(--space-8)]" />

        <div className="grid gap-[var(--space-4)] md:grid-cols-2">
          {aboutContent.highlights.map((highlight) => (
            <Card key={highlight} className="p-[var(--space-6)]">
              <p className="text-[length:var(--text-sm)] md:text-[length:var(--text-base)]">{highlight}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
