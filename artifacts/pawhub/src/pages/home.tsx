import { useGetHomeDiscovery } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  MapPin,
  ArrowRight,
  Footprints,
  Home as HomeIcon,
  Scissors,
  Bath,
  GraduationCap,
  Zap,
  Quote,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TOP_SERVICES = [
  { key: "walking", title: "Dog walking", desc: "Daily neighborhood loops with sniff time and water breaks.", Icon: Footprints },
  { key: "sitting", title: "Pet sitting", desc: "Drop-ins and overnight in-home stays with photo updates.", Icon: HomeIcon },
  { key: "grooming", title: "Grooming", desc: "Bath, trim, nails, and breed-specific cuts by pros.", Icon: Scissors },
  { key: "washing", title: "Bathing & wash", desc: "Self-serve tubs or full-service wash & dry.", Icon: Bath },
  { key: "training", title: "Training", desc: "Force-free, science-based plans for every pup.", Icon: GraduationCap },
];

const TESTIMONIALS = [
  {
    name: "Emma H.",
    pet: "Buddy, Golden Retriever",
    avatar: "seed/owner_emma.png",
    quote:
      "Sarah is the best — Buddy comes home tired and happy every single time. We feel like part of a real neighborhood.",
    rating: 5,
  },
  {
    name: "David C.",
    pet: "Nova, French Bulldog",
    avatar: "seed/owner_david.png",
    quote:
      "Marcus's calm energy completely transformed Nova's leash behavior in three sessions. PawHub made the booking effortless.",
    rating: 5,
  },
  {
    name: "Priya R.",
    pet: "Mango, Tabby cat",
    avatar: "seed/provider_carla.png",
    quote:
      "I had a sitter at my door within the hour. Daily photos, gentle handling — Mango actually cuddled them goodbye.",
    rating: 5,
  },
];

export default function Home() {
  const base = import.meta.env.BASE_URL;
  const { data: discovery, isLoading } = useGetHomeDiscovery();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-secondary/30">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 sm:px-6 py-10 md:py-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary font-bold px-4 py-1.5 text-base">
                <Zap className="w-5 h-5 fill-primary" />
                10-minute care promise
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                Trusted neighborhood pet care.
              </h1>
              <p className="text-2xl text-muted-foreground leading-relaxed max-w-xl">
                Find loving sitters, energetic walkers, and skilled groomers — matched and confirmed in 10 minutes flat.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" asChild className="text-lg rounded-full px-8 h-14 font-semibold">
                  <Link href="/providers">Find Care Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg rounded-full px-8 h-14 font-semibold">
                  <Link href="/become-a-provider">Become a Provider</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-secondary">
                <img
                  src={`${base}seed/hero_banner.png`}
                  alt="A happy dog and cat playing together"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-card rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary fill-primary" />
                </div>
                <div>
                  <div className="font-bold text-lg leading-none">~10 min</div>
                  <div className="text-sm text-muted-foreground">avg. provider match</div>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 bg-card rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border">
                <Star className="w-6 h-6 fill-primary text-primary" />
                <div>
                  <div className="font-bold text-lg leading-none">5.0 rated</div>
                  <div className="text-sm text-muted-foreground">across the network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-12 space-y-14">
        {/* Stats */}
        {!isLoading && discovery && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-border/50">
            <div className="text-center space-y-1">
              <h3 className="text-4xl font-extrabold text-primary">{discovery.totalProviders}</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Trusted Providers</p>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-4xl font-extrabold text-primary">{discovery.totalCompletedBookings}</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Happy Pets</p>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-4xl font-extrabold text-primary">5.0</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Average Rating</p>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-4xl font-extrabold text-primary">10 min</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Match Promise</p>
            </div>
          </div>
        )}

        {/* Top services */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-extrabold">Top services</h2>
              <p className="text-lg text-muted-foreground mt-1">Everything your pet needs, all in one place.</p>
            </div>
            <Link href="/providers" className="text-primary font-semibold flex items-center gap-1 hover:underline">
              Browse all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {TOP_SERVICES.map(({ key, title, desc, Icon }) => (
              <Link key={key} href={`/providers?serviceType=${key}`}>
                <Card className="h-full hover-elevate transition-all border shadow-sm hover:shadow-md rounded-2xl cursor-pointer group">
                  <CardContent className="p-5 space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold leading-tight">{title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Providers */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-extrabold">Featured in your area</h2>
              <p className="text-lg text-muted-foreground mt-1">Hand-picked, neighborhood-loved providers.</p>
            </div>
            <Link href="/providers" className="text-primary font-semibold flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-[300px] rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {discovery?.featured.map((provider) => (
                <Link key={provider.id} href={`/providers/${provider.id}`}>
                  <Card className="h-full overflow-hidden hover-elevate transition-all border-none shadow-md hover:shadow-lg rounded-2xl cursor-pointer group">
                    <div className="h-32 bg-secondary relative">
                      {provider.coverPhotoUrl && (
                        <img src={`${base}${provider.coverPhotoUrl}`} alt="" className="w-full h-full object-cover" />
                      )}
                      <div className="absolute -bottom-10 left-6">
                        <Avatar className="w-20 h-20 border-4 border-card shadow-sm">
                          <AvatarImage src={provider.photoUrl ? `${base}${provider.photoUrl}` : ""} />
                          <AvatarFallback className="text-xl">{provider.businessName[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <CardContent className="pt-12 pb-5 px-6">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                          {provider.businessName}
                        </h3>
                        <div className="flex items-center gap-1 text-sm font-bold bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md shrink-0">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          <span>{provider.ratingAverage.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.city}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {provider.serviceTypes.slice(0, 3).map((type) => (
                          <span
                            key={type}
                            className="text-xs font-semibold bg-accent/50 text-accent-foreground px-2 py-1 rounded-md capitalize"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Testimonials */}
        <section className="space-y-6">
          <div>
            <h2 className="text-4xl font-extrabold">Loved by pet parents</h2>
            <p className="text-lg text-muted-foreground mt-1">Real stories from neighbors who found their people.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="rounded-2xl border-none shadow-md">
                <CardContent className="p-6 space-y-4">
                  <Quote className="w-8 h-8 text-primary/40" />
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary" />
                    ))}
                  </div>
                  <p className="text-lg leading-snug">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <Avatar className="w-11 h-11">
                      <AvatarImage src={`${base}${t.avatar}`} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold leading-tight">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.pet}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-primary text-primary-foreground px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Care for your pet in 10 minutes.</h2>
            <p className="text-lg opacity-90">Tell us what you need — we&rsquo;ll match a trusted neighbor before your kettle boils.</p>
          </div>
          <Button size="lg" variant="secondary" asChild className="text-lg rounded-full px-8 h-14 font-semibold">
            <Link href="/providers">Find Care Now</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
