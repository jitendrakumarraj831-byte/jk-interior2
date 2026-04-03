import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"

// ✅ SEO Metadata (Google ke liye – design par koi effect nahi)
export const metadata = {
title:
"Best Interior Designer in Forbesganj | Gypsum, POP, PVC Ceiling & Wall Panel – JK Interior",

description:
"JK Interior provides gypsum ceiling, POP design, PVC wall paneling, grid ceiling and modern home decor services in Forbesganj, Araria, Narpatganj, Jogbani, Raniganj, Kursakanta, Chhatapur and Tribeniganj at affordable price.",

keywords:
"interior designer near me, best interior designer in Forbesganj, gypsum ceiling near me, false ceiling near me, POP ceiling design, PVC wall panel near me, grid ceiling work, home decor near me, interior designer Forbesganj Bihar, gypsum ceiling Forbesganj, false ceiling Araria, PVC panel Narpatganj, ceiling work Jogbani, false ceiling Raniganj Bihar, interior designer Kursakanta, home decor Chhatapur, interior Tribeniganj, JK Interior Forbesganj",
}

export default function Page() {
return (
<>
<Navbar />
<Services />
<Footer />
</>
)
}
