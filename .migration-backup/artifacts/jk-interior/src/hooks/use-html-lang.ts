import { useEffect } from "react"

/**
 * Updates the HTML lang attribute based on application language
 * Helps with SEO and accessibility
 */
export function useHtmlLang(lang: string = "en") {
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "hi" ? "ltr" : "ltr"
  }, [lang])
}
