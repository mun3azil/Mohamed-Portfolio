import { skills } from '@/data/skills';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Card } from '@/components/ui/Card';

export function SkillsSection() {
  return (
    <Section id="skills" className="section-divider">
      <Container>
        <Heading
          title="Skills"
          subtitle="Core technical capabilities used to build reliable, modern products."
          align="center"
          className="mb-[var(--space-10)]"
        />

        <div className="grid gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <Card key={skill.name} className="p-[var(--space-4)]">
              <p className="font-medium">{skill.name}</p>
              <p className="mt-[var(--space-1)] text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{skill.level}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
