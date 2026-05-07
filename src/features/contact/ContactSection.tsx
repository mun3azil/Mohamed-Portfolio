'use client';

import { useTranslations } from 'next-intl';
import { useState, type FormEvent, useEffect } from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import { initEmailJS, sendContactForm } from '@/lib/emailjs';

type ContactFormState = {
  name: string;
  email: string;
  projectSummary: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  projectSummary: '',
  projectType: '',
  budget: '',
  timeline: '',
  details: '',
};

type FunnelStep = 1 | 2;

export function ContactSection() {
  const t = useTranslations('contact');

  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [step, setStep] = useState<FunnelStep>(1);
  const [step1Completed, setStep1Completed] = useState(false);

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS();
    trackEvent('contact_page_visit', { location: 'contact_section' });
  }, []);

  const projectTypes = [
    t('projectTypes.marketingWebsite'),
    t('projectTypes.saasDashboard'),
    t('projectTypes.ecommerce'),
    t('projectTypes.designSystem'),
    t('projectTypes.performanceRefactor'),
  ];

  const budgetRanges = [
    t('budgetRanges.range2k5k'),
    t('budgetRanges.range5k10k'),
    t('budgetRanges.range10k20k'),
    t('budgetRanges.range20kPlus'),
  ];

  const timelineOptions = [
    t('timelineOptions.asap'),
    t('timelineOptions.twoToFourWeeks'),
    t('timelineOptions.oneToTwoMonths'),
    t('timelineOptions.flexible'),
  ];

  const updateField = <K extends keyof ContactFormState>(field: K, value: ContactFormState[K]) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const validateStep1 = () => {
    const nextErrors: ContactFormErrors = {};

    if (!form.name.trim()) nextErrors.name = t('errors.nameRequired');
    if (!form.email.trim()) nextErrors.email = t('errors.emailRequired');
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = t('errors.emailInvalid');
    if (!form.projectSummary.trim()) nextErrors.projectSummary = t('errors.projectSummaryRequired');

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors: ContactFormErrors = {};

    if (!form.details.trim()) nextErrors.details = t('errors.detailsRequired');

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleStep1Continue = () => {
    if (!validateStep1()) {
      setStatus('error');
      trackEvent('contact_form_validation_failed', { location: 'contact_section', step: 1 });
      return;
    }

    setStatus('idle');
    setStep1Completed(true);
    setStep(2);
    trackEvent('step1_submit', { location: 'contact_section' });
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateStep2()) {
      setStatus('error');
      trackEvent('contact_form_validation_failed', { location: 'contact_section', step: 2 });
      return;
    }

    setStatus('loading');
    trackEvent('step2_submit', {
      location: 'contact_section',
      projectType: form.projectType,
      budget: form.budget,
      timeline: form.timeline,
    });

    try {
      // Send form via EmailJS
      await sendContactForm(new FormData(event.currentTarget));

      setStatus('success');
      setForm(initialFormState);
      setStep(1);
      setStep1Completed(false);

      trackEvent('contact_form_submitted', {
        projectType: form.projectType,
        budget: form.budget,
        timeline: form.timeline,
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      trackEvent('contact_form_submit_failed', { location: 'contact_section' });
    }
  };

  useEffect(() => {
    return () => {
      if (step1Completed && step === 2 && status !== 'success') {
        trackEvent('contact_funnel_dropoff', {
          location: 'contact_section',
          from_step: 1,
          to_step: 2,
          completed_step2: false,
        });
      }
    };
  }, [step1Completed, step, status]);

  return (
    <Section id="contact">
      <Container>
        <Heading
          title={t('title')}
          subtitle={t('description')}
          align="center"
          className="mb-[var(--space-10)]"
        />
        <div className="grid gap-[var(--space-8)] md:grid-cols-2">
          <Card>
            <div className="space-y-[var(--space-4)]">
              <p className="text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{t('responseTime')}</p>
              <p className="text-[length:var(--text-base)] font-medium">{t('responseExpectation')}</p>
              <p className="pt-[var(--space-2)] text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{t('email')}</p>
              <a href={`mailto:${t('contactEmail')}`} className="text-[length:var(--text-lg)] font-medium hover:underline">
                {t('contactEmail')}
              </a>
              <p className="pt-[var(--space-2)] text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{t('location')}</p>
              <p className="text-[length:var(--text-base)]">{t('contactLocation')}</p>
            </div>
          </Card>

          <Card>
            <form 
              className="space-y-[var(--space-4)]" 
              onSubmit={handleSubmit} 
              noValidate
              id="contact-form"
            >
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-4)] py-[var(--space-3)] text-[length:var(--text-sm)]">
                <p className="font-medium">{t('progressLabel', { current: step, total: 2 })}</p>
              </div>

              {step === 1 ? (
                <p className="text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{t('trustMessage')}</p>
              ) : null}

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('name')}
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] px-[var(--space-4)] py-[var(--space-3)] text-[length:var(--text-sm)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder={t('namePlaceholder')}
                />
                {errors.name ? <p className="mt-[var(--space-2)] text-[length:var(--text-xs)] text-[var(--color-error)]">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('emailLabel')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] px-[var(--space-4)] py-[var(--space-3)] text-[length:var(--text-sm)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder={t('emailPlaceholder')}
                />
                {errors.email ? <p className="mt-[var(--space-2)] text-[length:var(--text-xs)] text-[var(--color-error)]">{errors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="projectSummary" className="block text-sm font-medium mb-2">
                  {t('projectSummary')}
                </label>
                <textarea
                  id="projectSummary"
                  name="projectSummary"
                  value={form.projectSummary}
                  onChange={(event) => updateField('projectSummary', event.target.value)}
                  rows={2}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] px-[var(--space-4)] py-[var(--space-3)] text-[length:var(--text-sm)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder={t('projectSummaryPlaceholder')}
                />
                {errors.projectSummary ? <p className="mt-[var(--space-2)] text-[length:var(--text-xs)] text-[var(--color-error)]">{errors.projectSummary}</p> : null}
              </div>

              {step === 2 ? (
                <>
                  <p className="text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{t('optionalFieldsHint')}</p>

                  <div className="grid gap-[var(--space-4)] md:grid-cols-2">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                        {t('projectType')}
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={form.projectType}
                        onChange={(event) => updateField('projectType', event.target.value)}
                        className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] px-[var(--space-4)] py-[var(--space-3)] text-[length:var(--text-sm)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                      >
                        <option value="">{t('selectProjectType')}</option>
                        {projectTypes.map((projectType) => (
                          <option key={projectType} value={projectType}>
                            {projectType}
                          </option>
                        ))}
                      </select>
                      {errors.projectType ? <p className="mt-[var(--space-2)] text-[length:var(--text-xs)] text-[var(--color-error)]">{errors.projectType}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2">
                        {t('budget')}
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={(event) => updateField('budget', event.target.value)}
                        className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] px-[var(--space-4)] py-[var(--space-3)] text-[length:var(--text-sm)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                      >
                        <option value="">{t('selectBudget')}</option>
                        {budgetRanges.map((budgetRange) => (
                          <option key={budgetRange} value={budgetRange}>
                            {budgetRange}
                          </option>
                        ))}
                      </select>
                      {errors.budget ? <p className="mt-[var(--space-2)] text-[length:var(--text-xs)] text-[var(--color-error)]">{errors.budget}</p> : null}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                      {t('timeline')}
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={form.timeline}
                      onChange={(event) => updateField('timeline', event.target.value)}
                      className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] px-[var(--space-4)] py-[var(--space-3)] text-[length:var(--text-sm)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    >
                      <option value="">{t('selectTimeline')}</option>
                      {timelineOptions.map((timelineOption) => (
                        <option key={timelineOption} value={timelineOption}>
                          {timelineOption}
                        </option>
                      ))}
                    </select>
                    {errors.timeline ? <p className="mt-[var(--space-2)] text-[length:var(--text-xs)] text-[var(--color-error)]">{errors.timeline}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-sm font-medium mb-2">
                      {t('details')}
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      value={form.details}
                      onChange={(event) => updateField('details', event.target.value)}
                      rows={4}
                      className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] px-[var(--space-4)] py-[var(--space-3)] text-[length:var(--text-sm)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                      placeholder={t('detailsPlaceholder')}
                    />
                    {errors.details ? <p className="mt-[var(--space-2)] text-[length:var(--text-xs)] text-[var(--color-error)]">{errors.details}</p> : null}
                  </div>
                </>
              ) : null}

              {/* Honeypot field for spam protection */}
              <input
                type="text"
                name="bot-field"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {step === 1 ? (
                <Button type="button" onClick={handleStep1Continue} className="w-full">
                  {t('continueToStep2')}
                </Button>
              ) : (
                <div className="flex flex-col gap-[var(--space-3)] sm:flex-row">
                  <Button type="button" onClick={handleBackToStep1} className="w-full sm:w-auto" variant="secondary">
                    {t('backToStep1')}
                  </Button>
                  <Button type="submit" disabled={status === 'loading'} className="w-full">
                    {status === 'loading' ? t('sending') : t('submit')}
                  </Button>
                </div>
              )}

              {status === 'success' ? (
                <p className="text-[length:var(--text-sm)] text-[var(--color-success)]" role="alert">
                  {t('success')}
                </p>
              ) : null}

              {status === 'error' ? (
                <p className="text-[length:var(--text-sm)] text-[var(--color-error)]" role="alert">
                  {t('error')}
                </p>
              ) : null}
            </form>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
