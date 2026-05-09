import { eq } from "drizzle-orm";
import {
  db,
  usersTable,
  providersTable,
  petsTable,
  servicesTable,
  availabilitySlotsTable,
  bookingsTable,
  reviewsTable,
  demoSessionTable,
} from "@workspace/db";
import { logger } from "./logger";

// Path under pawhub /public/seed served at <BASE>/seed/<name>.png — but we
// only have a relative path from the app's BASE_URL. The frontend computes
// the absolute URL by prepending import.meta.env.BASE_URL. To keep seed data
// portable, just store the leaf name and let the frontend resolve it.
const img = (name: string) => `seed/${name}.png`;

function daysFromNow(days: number, hour = 10, minute = 0): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d;
}

function plusMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

export async function seedIfEmpty(): Promise<void> {
  const existing = await db.select().from(usersTable).limit(1);
  if (existing.length > 0) {
    logger.info("Seed skipped: users already exist");
    return;
  }
  logger.info("Seeding PawHub demo data...");

  // Owners
  const [emma, david] = await db
    .insert(usersTable)
    .values([
      { displayName: "Emma Hayes", email: "emma@pawhub.demo", city: "Brooklyn, NY", avatarUrl: img("owner_emma") },
      { displayName: "David Chen", email: "david@pawhub.demo", city: "Brooklyn, NY", avatarUrl: img("owner_david") },
    ])
    .returning();

  // Providers (also users)
  const [sarahU, marcusU, lenaU, carlaU, jordanU] = await db
    .insert(usersTable)
    .values([
      { displayName: "Sarah Lopez", email: "sarah@pawhub.demo", city: "Brooklyn, NY", avatarUrl: img("provider_sarah") },
      { displayName: "Marcus Reed", email: "marcus@pawhub.demo", city: "Queens, NY", avatarUrl: img("provider_marcus") },
      { displayName: "Lena Park", email: "lena@pawhub.demo", city: "Manhattan, NY", avatarUrl: img("provider_lena") },
      { displayName: "Carla Ramirez", email: "carla@pawhub.demo", city: "Brooklyn, NY", avatarUrl: img("provider_carla") },
      { displayName: "Jordan Kim", email: "jordan@pawhub.demo", city: "Queens, NY", avatarUrl: img("provider_jordan") },
    ])
    .returning();

  // Demo session starts as Emma
  await db.insert(demoSessionTable).values({ id: 1, activeUserId: emma.id });

  // Provider profiles
  const [sarahP, marcusP, lenaP, carlaP, jordanP] = await db
    .insert(providersTable)
    .values([
      {
        userId: sarahU.id,
        businessName: "Sarah's Sunny Walks",
        bio: "Certified dog walker who treats every pup like family. Small group walks, long routes, and lots of belly rubs.",
        city: "Brooklyn, NY",
        zipCode: "11215",
        photoUrl: img("provider_sarah"),
        coverPhotoUrl: img("cover_walking"),
        yearsExperience: 6,
        verified: true,
      },
      {
        userId: marcusU.id,
        businessName: "Reed Dog Training",
        bio: "Force-free, science-based training. Specializing in reactive dogs, recall, and confident puppy starts.",
        city: "Queens, NY",
        zipCode: "11375",
        photoUrl: img("provider_marcus"),
        coverPhotoUrl: img("cover_training"),
        yearsExperience: 9,
        verified: true,
      },
      {
        userId: lenaU.id,
        businessName: "Lena & Co. Grooming",
        bio: "Boutique grooming for dogs and cats. Hand-scissoring, gentle handling, and breed-specific cuts.",
        city: "Manhattan, NY",
        zipCode: "10003",
        photoUrl: img("provider_lena"),
        coverPhotoUrl: img("cover_grooming"),
        yearsExperience: 11,
        verified: true,
      },
      {
        userId: carlaU.id,
        businessName: "Carla's Cozy Pet Sitting",
        bio: "Overnight and day sitting in your home. Cats, dogs, and small critters welcome. Daily photo updates included.",
        city: "Brooklyn, NY",
        zipCode: "11211",
        photoUrl: img("provider_carla"),
        coverPhotoUrl: img("cover_sitting"),
        yearsExperience: 4,
        verified: false,
      },
      {
        userId: jordanU.id,
        businessName: "Jordan's Bath House",
        bio: "Self-serve and full-service dog washing. Eco-friendly shampoos, blueberry facials, nail trims.",
        city: "Queens, NY",
        zipCode: "11101",
        photoUrl: img("provider_jordan"),
        coverPhotoUrl: img("cover_washing"),
        yearsExperience: 3,
        verified: true,
      },
    ])
    .returning();

  // Pets
  const [buddy, milo, nova] = await db
    .insert(petsTable)
    .values([
      { ownerId: emma.id, name: "Buddy", species: "dog", breed: "Golden Retriever", ageYears: 4, weightLbs: 65, photoUrl: img("pet_buddy"), notes: "Loves tennis balls. Mild leash pulling." },
      { ownerId: emma.id, name: "Milo", species: "cat", breed: "Tabby", ageYears: 7, weightLbs: 11, photoUrl: img("pet_milo"), notes: "Indoor only. Shy with new people for the first hour." },
      { ownerId: david.id, name: "Nova", species: "dog", breed: "French Bulldog", ageYears: 2, weightLbs: 22, photoUrl: img("pet_nova"), notes: "Sensitive stomach — no chicken treats please." },
    ])
    .returning();

  // Services
  const services = await db
    .insert(servicesTable)
    .values([
      // Sarah — walking
      { providerId: sarahP.id, serviceType: "walking", title: "30-min neighborhood walk", description: "A relaxed loop with sniff time and water breaks.", priceCents: 2500, durationMinutes: 30 },
      { providerId: sarahP.id, serviceType: "walking", title: "60-min adventure walk", description: "Longer route with park time. Great for high-energy dogs.", priceCents: 4500, durationMinutes: 60 },
      // Marcus — training
      { providerId: marcusP.id, serviceType: "training", title: "Private training session", description: "60-minute one-on-one in your home or local park.", priceCents: 12000, durationMinutes: 60 },
      { providerId: marcusP.id, serviceType: "training", title: "Puppy fundamentals", description: "Sit, recall, leash basics, socialization plan.", priceCents: 9000, durationMinutes: 45 },
      // Lena — grooming
      { providerId: lenaP.id, serviceType: "grooming", title: "Full groom (small dog)", description: "Bath, trim, ears, nails, blueberry facial.", priceCents: 8500, durationMinutes: 90 },
      { providerId: lenaP.id, serviceType: "grooming", title: "Cat groom", description: "Gentle de-shed, sanitary trim, nail clip.", priceCents: 7500, durationMinutes: 60 },
      // Carla — sitting
      { providerId: carlaP.id, serviceType: "sitting", title: "Daytime drop-in (45 min)", description: "Feeding, potty break, cuddle session, photo update.", priceCents: 3500, durationMinutes: 45 },
      { providerId: carlaP.id, serviceType: "sitting", title: "Overnight in-home stay", description: "Stay overnight in your home. Includes evening walk and morning routine.", priceCents: 11000, durationMinutes: 720 },
      // Jordan — washing
      { providerId: jordanP.id, serviceType: "washing", title: "Self-serve wash", description: "Use our tubs, towels, dryers, and shampoos.", priceCents: 2000, durationMinutes: 45 },
      { providerId: jordanP.id, serviceType: "washing", title: "Full-service wash & dry", description: "We do the bath, blow dry, brush, and ear clean.", priceCents: 5500, durationMinutes: 60 },
    ])
    .returning();

  // Availability slots — a few per provider over the next 14 days
  const slotRows: { providerId: number; startAt: Date; endAt: Date }[] = [];
  for (const provider of [sarahP, marcusP, lenaP, carlaP, jordanP]) {
    for (let dayOffset = 1; dayOffset <= 12; dayOffset += 2) {
      for (const hour of [9, 12, 15]) {
        const start = daysFromNow(dayOffset, hour);
        slotRows.push({ providerId: provider.id, startAt: start, endAt: plusMinutes(start, 60) });
      }
    }
  }
  const slots = await db.insert(availabilitySlotsTable).values(slotRows).returning();

  // A couple of past + upcoming bookings to make dashboards interesting
  const pastDate = (days: number, hour = 10) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(hour, 0, 0, 0);
    return d;
  };

  const findService = (providerId: number, type: string) =>
    services.find((s) => s.providerId === providerId && s.serviceType === type)!;

  const past1 = await db
    .insert(bookingsTable)
    .values({
      ownerId: emma.id,
      petId: buddy.id,
      providerId: sarahP.id,
      serviceId: findService(sarahP.id, "walking").id,
      slotId: null,
      startAt: pastDate(7),
      endAt: plusMinutes(pastDate(7), 30),
      status: "completed",
      notes: "Buddy loved his walk!",
      totalCents: 2500,
    })
    .returning();
  const past2 = await db
    .insert(bookingsTable)
    .values({
      ownerId: emma.id,
      petId: buddy.id,
      providerId: lenaP.id,
      serviceId: findService(lenaP.id, "grooming").id,
      slotId: null,
      startAt: pastDate(14),
      endAt: plusMinutes(pastDate(14), 90),
      status: "completed",
      totalCents: 8500,
    })
    .returning();
  const past3 = await db
    .insert(bookingsTable)
    .values({
      ownerId: david.id,
      petId: nova.id,
      providerId: marcusP.id,
      serviceId: findService(marcusP.id, "training").id,
      slotId: null,
      startAt: pastDate(10),
      endAt: plusMinutes(pastDate(10), 60),
      status: "completed",
      totalCents: 12000,
    })
    .returning();
  const past4 = await db
    .insert(bookingsTable)
    .values({
      ownerId: david.id,
      petId: nova.id,
      providerId: jordanP.id,
      serviceId: findService(jordanP.id, "washing").id,
      slotId: null,
      startAt: pastDate(5),
      endAt: plusMinutes(pastDate(5), 60),
      status: "completed",
      totalCents: 5500,
    })
    .returning();

  // Upcoming: pick the first available slot per relevant provider
  const sarahSlot = slots.find((s) => s.providerId === sarahP.id)!;
  const carlaSlot = slots.find((s) => s.providerId === carlaP.id)!;
  await db.insert(bookingsTable).values({
    ownerId: emma.id,
    petId: buddy.id,
    providerId: sarahP.id,
    serviceId: findService(sarahP.id, "walking").id,
    slotId: sarahSlot.id,
    startAt: sarahSlot.startAt,
    endAt: sarahSlot.endAt,
    status: "confirmed",
    totalCents: 2500,
  });
  await db
    .update(availabilitySlotsTable)
    .set({ isBooked: true })
    .where(eq(availabilitySlotsTable.id, sarahSlot.id));

  await db.insert(bookingsTable).values({
    ownerId: emma.id,
    petId: milo.id,
    providerId: carlaP.id,
    serviceId: findService(carlaP.id, "sitting").id,
    slotId: carlaSlot.id,
    startAt: carlaSlot.startAt,
    endAt: carlaSlot.endAt,
    status: "requested",
    totalCents: 3500,
  });
  await db
    .update(availabilitySlotsTable)
    .set({ isBooked: true })
    .where(eq(availabilitySlotsTable.id, carlaSlot.id));

  // Reviews on completed bookings
  await db.insert(reviewsTable).values([
    { bookingId: past1[0].id, providerId: sarahP.id, ownerId: emma.id, rating: 5, body: "Sarah is the best — Buddy comes home tired and happy every single time." },
    { bookingId: past2[0].id, providerId: lenaP.id, ownerId: emma.id, rating: 5, body: "Lena gave Buddy the cleanest, most comfortable groom we've ever had." },
    { bookingId: past3[0].id, providerId: marcusP.id, ownerId: david.id, rating: 5, body: "Marcus's calm energy completely transformed Nova's leash behavior in three sessions." },
    { bookingId: past4[0].id, providerId: jordanP.id, ownerId: david.id, rating: 4, body: "Friendly, quick, and Nova smelled amazing for days." },
  ]);

  logger.info("Seed complete");
}
