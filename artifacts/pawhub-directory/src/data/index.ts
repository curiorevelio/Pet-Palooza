export type Craft = "Walker" | "Sitter" | "Groomer" | "Bather" | "Trainer";

export interface Practitioner {
  id: string;
  name: string;
  craft: Craft;
  neighborhood: string;
  bio: string;
  yearsOfPractice: number;
  services: string[];
}

export interface Letter {
  id: string;
  practitionerId: string;
  author: string;
  text: string;
  context: string;
}

export const services = [
  { n: "01", name: "Walking", note: "Daily loops, weather respected, leash matched to temperament." },
  { n: "02", name: "Sitting", note: "An attentive guest who keeps the routine intact while you're away." },
  { n: "03", name: "Grooming", note: "Coat, claws, and ears, considered as a whole rather than a checklist." },
  { n: "04", name: "Bathing", note: "Warm water, gentle product, towels that have already been warmed." },
  { n: "05", name: "Training", note: "Patient repetition, in your home, on your animal's terms." },
];

export const practitioners: Practitioner[] = [
  {
    id: "maya-calderon",
    name: "Maya Calderón",
    craft: "Walker",
    neighborhood: "Mission",
    bio: "Maya approaches a walk not as a route to be finished, but a perimeter to be understood. She has walked the Mission for seven years, learning which gates hold loud dogs and which corners catch the morning sun.",
    yearsOfPractice: 7,
    services: ["Daily Loops", "Pack Socialization", "Leash Training"],
  },
  {
    id: "idris-halcyon",
    name: "Idris Halcyon",
    craft: "Sitter",
    neighborhood: "Bernal Heights",
    bio: "A quiet presence in any home. Idris believes the best sitting goes unnoticed by the animal, maintaining the exact rhythm and rules the owner established.",
    yearsOfPractice: 12,
    services: ["Overnight Stays", "Medication Administration", "Elder Care"],
  },
  {
    id: "noor-petrov",
    name: "Noor Petrov",
    craft: "Groomer",
    neighborhood: "Hayes Valley",
    bio: "Grooming is often rushed; Noor refuses to hurry. She works slowly, letting the animal set the pace, using shears with a practiced, steady hand.",
    yearsOfPractice: 5,
    services: ["Breed-Specific Cuts", "Hand Stripping", "Nail Filing"],
  },
  {
    id: "etienne-ward",
    name: "Étienne Ward",
    craft: "Trainer",
    neighborhood: "Outer Sunset",
    bio: "Training is mostly about teaching the human. Étienne works entirely in-home, addressing the behaviors where they actually happen, with an emphasis on mutual respect.",
    yearsOfPractice: 15,
    services: ["Puppy Foundations", "Reactivity Adjustment", "Off-Leash Reliability"],
  },
  {
    id: "saoirse-lin",
    name: "Saoirse Lin",
    craft: "Bather",
    neighborhood: "Inner Richmond",
    bio: "Bathing should not be a battle. Saoirse uses warmed water and unscented oat shampoos, turning a typically stressful event into something resembling rest.",
    yearsOfPractice: 4,
    services: ["Oatmeal Soaks", "Deshedding", "Paw Pad Treatment"],
  },
  {
    id: "julian-voss",
    name: "Julian Voss",
    craft: "Walker",
    neighborhood: "Noe Valley",
    bio: "Julian maps his walks by topography, preferring the steep climbs of Noe Valley to tire out high-energy working breeds before noon.",
    yearsOfPractice: 8,
    services: ["High-Energy Treks", "Solo Walks"],
  },
  {
    id: "clara-bell",
    name: "Clara Bell",
    craft: "Sitter",
    neighborhood: "Pacific Heights",
    bio: "With a background in veterinary nursing, Clara is the rare sitter who is entirely unbothered by complex medical routines or senior animals needing constant monitoring.",
    yearsOfPractice: 10,
    services: ["Medical Boarding", "Senior Care", "Post-Op Supervision"],
  },
  {
    id: "omar-tariq",
    name: "Omar Tariq",
    craft: "Trainer",
    neighborhood: "Castro",
    bio: "Omar specializes in rescue dogs who have forgotten how to trust. His methods are agonizingly slow, entirely positive, and undeniably effective.",
    yearsOfPractice: 9,
    services: ["Rescue Rehabilitation", "Fear Mitigation"],
  },
  {
    id: "lucy-chen",
    name: "Lucy Chen",
    craft: "Walker",
    neighborhood: "Cole Valley",
    bio: "Lucy keeps her packs small—never more than three. She believes dogs need to be understood as individuals, even when moving as a group.",
    yearsOfPractice: 3,
    services: ["Small Group Walks", "Trail Hikes"],
  },
  {
    id: "david-miller",
    name: "David Miller",
    craft: "Groomer",
    neighborhood: "Marina",
    bio: "David's studio is silent. No overlapping appointments, no cages. Just one dog at a time, receiving his undivided attention from bath to final brush.",
    yearsOfPractice: 20,
    services: ["Anxiety-Free Grooming", "Show Trims"],
  },
  {
    id: "amina-khan",
    name: "Amina Khan",
    craft: "Bather",
    neighborhood: "Haight-Ashbury",
    bio: "Amina works primarily with large breeds that most bathers turn away. She has a grounding presence that keeps nervous giants still in the tub.",
    yearsOfPractice: 6,
    services: ["Large Breed Baths", "Double Coat Blowouts"],
  },
  {
    id: "samuel-oak",
    name: "Samuel Oak",
    craft: "Sitter",
    neighborhood: "Mission",
    bio: "Samuel is a writer who found that dogs make the best company for drafting a novel. He is present, quiet, and profoundly reliable.",
    yearsOfPractice: 5,
    services: ["Extended Stays", "House Sitting"],
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    craft: "Trainer",
    neighborhood: "Bernal Heights",
    bio: "Elena's voice never raises. She teaches boundaries through body language and timing, helping owners communicate without yelling.",
    yearsOfPractice: 14,
    services: ["Non-Verbal Cues", "Household Integration"],
  },
  {
    id: "marcus-weill",
    name: "Marcus Weill",
    craft: "Walker",
    neighborhood: "Outer Sunset",
    bio: "Rain or shine, Marcus is on the beach at dawn. He handles the early morning shift for owners whose dogs wake before the sun.",
    yearsOfPractice: 11,
    services: ["Dawn Patrol", "Beach Runs"],
  },
  {
    id: "sophie-turner",
    name: "Sophie Turner",
    craft: "Groomer",
    neighborhood: "Noe Valley",
    bio: "Sophie specializes in curly and wired coats, maintaining their texture without relying on harsh clippers or chemical softeners.",
    yearsOfPractice: 7,
    services: ["Poodle Cuts", "Doodle Maintenance"],
  },
  {
    id: "james-wu",
    name: "James Wu",
    craft: "Bather",
    neighborhood: "Pacific Heights",
    bio: "James brings the bath to you. His mobile setup is meticulously clean, allowing dogs to be bathed without ever leaving their driveway.",
    yearsOfPractice: 4,
    services: ["Mobile Bathing", "Flea Treatments"],
  }
];

export const letters: Letter[] = [
  {
    id: "l1",
    practitionerId: "maya-calderon",
    author: "A. Whitfield",
    context: "on her first walker",
    text: "She arrived ten minutes early, sat on the floor, and let the dog decide. By the time we left, the leash was an afterthought. Maya does not walk dogs so much as she accompanies them."
  },
  {
    id: "l2",
    practitionerId: "etienne-ward",
    author: "M. & T. Sullivan",
    context: "regarding a reactive rescue",
    text: "We spent six months trying to 'fix' him. Étienne spent one afternoon showing us that nothing was broken. The training wasn't for the dog; it was for us."
  },
  {
    id: "l3",
    practitionerId: "noor-petrov",
    author: "L. Kensington",
    context: "after a long search for a gentle groomer",
    text: "I used to dread grooming day. The shaking started two blocks away. With Noor, he walks right in. I don't know what she whispers to him in there, but I am entirely grateful for it."
  },
  {
    id: "l4",
    practitionerId: "clara-bell",
    author: "J. Davies",
    context: "on leaving a senior dog",
    text: "Leaving a fifteen-year-old hound with daily medications is terrifying. Clara sent exactly one photo a day, perfectly timed, showing him asleep in his favorite chair. I slept well for the first time on a trip."
  },
  {
    id: "l5",
    practitionerId: "idris-halcyon",
    author: "R. Vance",
    context: "on returning home",
    text: "If the mail hadn't been on the table, I wouldn't have known Idris was there. The house was exactly as left it, and the dog was entirely at peace. A rare and true professional."
  },
  {
    id: "l6",
    practitionerId: "omar-tariq",
    author: "S. Bennett",
    context: "on fear mitigation",
    text: "He sat in my hallway for two hours just reading a book until she approached him. He possesses a patience I have rarely seen in humans."
  }
];