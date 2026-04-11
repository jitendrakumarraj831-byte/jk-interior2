import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          'gold-gradient text-primary-foreground hover:brightness-110 btn-luxury-glow [&:not(:disabled)]:active:scale-[0.98]',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-[0_0_24px_-6px_rgba(185,28,28,0.45)]',
        outline:
          'border border-gold/35 bg-white/[0.04] backdrop-blur-md text-gold shadow-[0_0_20px_-8px_rgba(201,162,74,0.35)] hover:bg-gold/10 hover:border-gold/55 hover:shadow-[0_0_28px_-6px_rgba(201,162,74,0.45)]',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-white/[0.08] shadow-[0_0_16px_-8px_rgba(201,162,74,0.2)]',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline shadow-none',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  const showShine =
    !asChild &&
    variant !== 'destructive' &&
    variant !== 'link' &&
    variant !== 'ghost'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {showShine ? (
        <>
          <span
            className={cn(
              'btn-shine-overlay',
              variant === 'outline' || variant === 'secondary'
                ? 'btn-shine-overlay--subtle'
                : '',
            )}
            aria-hidden
          />
          <span className="relative z-[1] inline-flex items-center justify-center gap-2">
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
