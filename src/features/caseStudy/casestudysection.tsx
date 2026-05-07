
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Card } from '@/components/ui/Card';

export interface CaseStudyData {
  headline: string;
  hook: string;
  problem: {
    title: string;
    description: string;
    issues: string[];
    image?: {
      src: string;
      alt: string;
    };
  };
  solution: {
    title: string;
    description: string;
    improvements: string[];
    image?: {
      src: string;
      alt: string;
    };
  };
  results: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
      description?: string;
    }>;
    image?: {
      src: string;
      alt: string;
    };
  };
  cta: {
    title: string;
    primary: {
      text: string;
      href: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
}

interface CaseStudySectionProps {
  data: CaseStudyData;
}

export function CaseStudySection({ data }: CaseStudySectionProps) {
  return (
    <Section id="case-study" className="scroll-mt-20">
      <Container className="max-w-5xl">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {data.headline}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {data.hook}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button href={data.cta.primary.href}>{data.cta.primary.text}</Button>
            {data.cta.secondary && (
              <Button href={data.cta.secondary.href} variant="secondary">
                {data.cta.secondary.text}
              </Button>
            )}
          </div>
        </div>

        {/* Problem Section */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="p-8">
                <h2 className="mb-4 text-3xl font-bold">{data.problem.title}</h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  {data.problem.description}
                </p>
                <ul className="space-y-3">
                  {data.problem.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                      <span className="text-muted-foreground">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {data.problem.image && (
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={data.problem.image.src}
                    alt={data.problem.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Solution Section */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-2">
              {data.solution.image && (
                <div className="relative h-64 order-2 lg:order-1 lg:h-auto">
                  <Image
                    src={data.solution.image.src}
                    alt={data.solution.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="p-8 order-1 lg:order-2">
                <h2 className="mb-4 text-3xl font-bold">{data.solution.title}</h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  {data.solution.description}
                </p>
                <ul className="space-y-3">
                  {data.solution.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">{data.results.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {data.results.metrics.map((metric, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary sm:text-5xl">
                  {metric.value}
                </div>
                <div className="mb-1 text-sm font-semibold">{metric.label}</div>
                {metric.description && (
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                )}
              </Card>
            ))}
          </div>
          {data.results.image && (
            <div className="mt-8">
              <div className="relative h-64 lg:h-96">
                <Image
                  src={data.results.image.src}
                  alt={data.results.image.alt}
                  fill
                  className="object-cover rounded-lg"
                  sizes="100vw"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{data.cta.title}</h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href={data.cta.primary.href}>
              {data.cta.primary.text}
            </Button>
            {data.cta.secondary && (
              <Button href={data.cta.secondary.href} variant="secondary">
                {data.cta.secondary.text}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
