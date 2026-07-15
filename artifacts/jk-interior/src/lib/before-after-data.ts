// "Before" side is an illustrative plain-room placeholder (no fabricated customer photo).
// Replace `beforeSrc` with a real on-site "before" photo per project as JK Interior
// captures them, and the slider will automatically use the real image instead.
export interface BeforeAfterItem {
  title: string
  titleHi: string
  category: string
  afterSrc: string
  afterAlt: string
  beforeSrc?: string
  beforeAlt: string
}

export const beforeAfterItems: BeforeAfterItem[] = [
  {
    title: "Gypsum False Ceiling",
    titleHi: "जिप्सम फॉल्स सीलिंग",
    category: "Gypsum",
    afterSrc: "/images/gypsum5.jpg",
    afterAlt: "Gypsum false ceiling with cove lighting after JK Interior installation",
    beforeAlt: "Plain bare ceiling before renovation",
  },
  {
    title: "PVC Waterproof Ceiling",
    titleHi: "PVC वॉटरप्रूफ सीलिंग",
    category: "PVC",
    afterSrc: "/images/pvc3.jpg",
    afterAlt: "Waterproof PVC false ceiling after JK Interior installation",
    beforeAlt: "Plain bare ceiling before renovation",
  },
  {
    title: "WPC Wall Paneling",
    titleHi: "WPC वॉल पैनलिंग",
    category: "WPC",
    afterSrc: "/images/wpc3.jpg",
    afterAlt: "TV wall with WPC wood panel after JK Interior installation",
    beforeAlt: "Plain painted wall before renovation",
  },
  {
    title: "Modular TV Unit",
    titleHi: "मॉड्यूलर TV यूनिट",
    category: "TV Unit",
    afterSrc: "/images/tv-unit2.jpg",
    afterAlt: "Custom modular TV unit with LED backlight after JK Interior installation",
    beforeAlt: "Bare wall with no TV unit before renovation",
  },
]
