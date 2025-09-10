/*
───────────────────────────────────────────────
  Property of CKS  © 2025
  Manifested by Freedom
───────────────────────────────────────────────

File: src/UpsessedLandingPage.tsx

Description: Main landing page component for Upsessed platform.
Function: Renders hero section, city grid, features, and vendor signup with animations.
Importance: Primary user interface showcasing thrift marketplace benefits and onboarding.
Connects to: App.tsx (main route), SmartImage.tsx (image handling), ui components (buttons, cards, inputs).
Notes: Includes rotating word animation, responsive design, and fallback image handling for external URLs.
*/
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Store,
  Globe2,
  Mail,
  ArrowRight,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import SmartImage from "./components/SmartImage";

const ROTATING_WORDS = [
  { word: "Be", color: "text-emerald-500" },
  { word: "Thrift", color: "text-sky-500" },
  { word: "Stay", color: "text-fuchsia-500" },
  { word: "Shop", color: "text-amber-500" },
  { word: "Get", color: "text-indigo-500" },
  { word: "Live", color: "text-rose-500" },
];

function RotatingWord({ interval = 1800 }: { interval?: number }) {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <span
      className="inline-flex relative select-none"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[index].word}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={`mr-2 font-semibold ${ROTATING_WORDS[index].color}`}
        >
          {ROTATING_WORDS[index].word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const CityPill = ({ name }: { name: string }) => (
  <Badge className="rounded-full px-4 py-2 bg-white/70 text-gray-900 backdrop-blur border border-white/60 hover:bg-white">
    <MapPin className="mr-1 h-3.5 w-3.5" /> {name}
  </Badge>
);

const cities = ["Tokyo", "London", "Toronto", "NYC", "Paris", "Seoul", "Berlin", "Mexico City"];

function NavBar() {
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-500" />
          <span className="font-semibold tracking-wide">Upsessed</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#why" className="hover:text-gray-900">The Why</a>
          <a href="#how" className="hover:text-gray-900">The How</a>
          <a href="#cities" className="hover:text-gray-900">The Wear</a>
          <a href="#vendors" className="hover:text-gray-900">Vendors</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="hidden sm:inline-flex">For Thrift Stores</Button>
          <Button className="gap-2"><Globe2 className="h-4 w-4" /> Browse</Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto mt-6 max-w-6xl px-4">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <RotatingWord /> <span className="align-middle">Upsessed</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-prose">
            Connect with independent thrift and vintage stores worldwide. Discover one-of-a-kind
            fashion from Tokyo to Toronto, London to NYC — all in one place.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button className="gap-2"><ShoppingBag className="h-4 w-4" /> Start browsing</Button>
            <Button variant="outline" className="gap-2"><Globe2 className="h-4 w-4" /> Explore cities</Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2" id="browse">
            {cities.slice(0, 5).map((c) => (<CityPill key={c} name={c} />))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-gradient-to-br from-emerald-100 via-white to-sky-100 shadow-xl">
            <SmartImage
              src="/img/hero.webp"
              srcSet="/img/hero-480.webp 480w, /img/hero-768.webp 768w, /img/hero-1200.webp 1200w, /img/hero-1600.webp 1600w"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 800px"
              alt="Vintage fashion collage"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyShop() {
  const bullets = [
    { title: "Sustainable fashion", desc: "Shop second-life pieces that make a real impact." },
    { title: "Unique finds", desc: "One-offs you won’t see anywhere else." },
    { title: "Support small stores", desc: "Every order helps local creatives and indie businesses." },
  ];
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Why Upsessed?</h2>
        <p className="mt-2 text-gray-600">Thrift across borders with confidence.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {bullets.map((b) => (
          <Card key={b.title} className="rounded-2xl">
            <CardHeader><CardTitle className="text-xl">{b.title}</CardTitle></CardHeader>
            <CardContent className="text-gray-600">{b.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: <Globe2 className="h-5 w-5" />, title: "Browse cities & stores", desc: "Search by city or follow your favorite thrift stores around the world." },
    { icon: <Store className="h-5 w-5" />, title: "Shop directly", desc: "Add items to cart from a store's page. We connect you; the store fulfills." }, // ← fixed the multiline string
    { icon: <ShoppingBag className="h-5 w-5" />, title: "Track your finds", desc: "Get updates from the store and manage orders in one place." },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">How Upsessed</h2>
        <p className="mt-2 text-gray-600">We’re the Connect — You and the Stores make the Magic.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <Card key={s.title} className="rounded-2xl">
            <CardHeader className="flex flex-row items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">{s.icon}</span>
              <CardTitle className="text-lg">{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">{s.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FeaturedCities() {
  const items = [
    { name: "Tokyo",  img: "/img/city-tokyo.webp"  },
    { name: "London", img: "/img/city-london.webp" },
    { name: "Toronto",img: "/img/city-toronto.webp"},
    { name: "NYC",    img: "/img/city-nyc.webp"    },
    { name: "Paris",  img: "/img/city-paris.webp"  },
    { name: "Seoul",  img: "/img/city-seoul.webp"  },
  ];
  return (
    <section id="cities" className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Wear Upsessed</h2>
        <p className="mt-2 text-gray-600">Thrift in Tokyo, London, Toronto, NYC, Paris and more.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((c) => (
          <a key={c.name} href="#" className="group relative overflow-hidden rounded-3xl border shadow-sm">
            <SmartImage
              src={c.img}
              srcSet={`${c.img.replace(".webp","-480.webp")} 480w, ${c.img.replace(".webp","-768.webp")} 768w, ${c.img.replace(".webp","-1200.webp")} 1200w, ${c.img.replace(".webp","-1600.webp")} 1600w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={c.name}
              className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
            <div className="absolute bottom-3 left-3 text-white font-semibold tracking-wide">{c.name}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ForVendors() {
  return (
    <section id="vendors" className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">For Thrift & Vintage Stores</h2>
          <p className="mt-4 text-gray-600 max-w-prose">
            Join the movement. List your store, reach global customers, and grow your community. Early access for the first 20 founding vendors.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="your@email.com" className="h-11" />
            <Button className="h-11 gap-2">Request invite <ArrowRight className="h-4 w-4" /></Button>
          </form>
          <p className="mt-3 text-sm text-gray-500">
            Prefer email? <a className="underline" href="mailto:upsessedmarketplace@gmail.com">upsessedmarketplace@gmail.com</a>
          </p>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-white shadow-xl">
            <SmartImage
              src="/img/vendors.webp"
              srcSet="/img/vendors-480.webp 480w, /img/vendors-768.webp 768w, /img/vendors-1200.webp 1200w, /img/vendors-1600.webp 1600w"
              sizes="(max-width: 1024px) 100vw, 800px"
              alt="Inside a vintage store"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    "/img/gallery-1.webp",
    "/img/gallery-2.webp",
    "/img/gallery-3.webp",
    "/img/gallery-4.webp",
    "/img/gallery-5.webp",
    "/img/gallery-6.webp",
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">From the community</h2>
        <p className="mt-2 text-gray-600">Tag <span className="font-semibold">#upsessed</span> for a chance to be featured.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {imgs.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border">
            <SmartImage
              src={src}
              srcSet={`${src.replace(".webp","-480.webp")} 480w, ${src.replace(".webp","-768.webp")} 768w, ${src.replace(".webp","-1200.webp")} 1200w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt="gallery"
              className="h-56 w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
      <Card className="rounded-3xl">
        <CardContent className="p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold">Get Upsessed about the launch</h3>
              <p className="mt-2 text-gray-600">Be first to know about new cities, featured stores, and drops.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="you@domain.com" className="h-11" />
              <Button className="h-11">Subscribe</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} Upsessed — Built with love for thrift culture.
        </div>
        <div className="flex items-center gap-4 text-gray-700">
          <a href="mailto:upsessedmarketplace@gmail.com" className="inline-flex items-center gap-1 hover:underline"><Mail className="h-4 w-4" /> Email</a>
          <a href="https://instagram.com/up.sessed" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline"><Instagram className="h-4 w-4" /> Instagram</a>
          <a href="#" className="inline-flex items-center gap-1 hover:underline"><Twitter className="h-4 w-4" /> X</a>
          <a href="#" className="inline-flex items-center gap-1 hover:underline"><Youtube className="h-4 w-4" /> YouTube</a>
        </div>
      </div>
    </footer>
  );
}

export default function UpsessedLandingPage() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-white via-white to-emerald-50/40">
      <NavBar />
      <Hero />
      <WhyShop />
      <HowItWorks />
      <FeaturedCities />
      <ForVendors />
      <Gallery />
      <Newsletter />
      <Footer />
    </div>
  );
}
