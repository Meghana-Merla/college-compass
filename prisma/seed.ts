import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "IIT Dhanbad",
        location: "Jharkhand",
        fees: 850000,
        rating: 4.5,
        placements: 2500000,
      },
      {
        name: "NIT Trichy",
        location: "Tamil Nadu",
        fees: 650000,
        rating: 4.7,
        placements: 2800000,
      },
      {
        name: "IIIT Hyderabad",
        location: "Telangana",
        fees: 1200000,
        rating: 4.8,
        placements: 3500000,
      },
      {
        name: "BITS Pilani",
        location: "Rajasthan",
        fees: 2400000,
        rating: 4.8,
        placements: 3000000,
      },
      {
        name: "VIT Vellore",
        location: "Tamil Nadu",
        fees: 800000,
        rating: 4.3,
        placements: 1500000,
      }
    ]
  });

  console.log("Seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });