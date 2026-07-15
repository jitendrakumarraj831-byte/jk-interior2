export function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs.length) return null;

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground marker:content-none">
            {faq.question}
            <span className="shrink-0 text-primary transition-transform group-open:rotate-45 text-xl leading-none">+</span>
          </summary>
          <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
