import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
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
      },
      {
        name: "IIT Bombay",
        location: "Maharashtra",
        fees: 900000,
        rating: 4.9,
        placements: 3200000,
      },
      {
        name: "IIT Delhi",
        location: "Delhi",
        fees: 850000,
        rating: 4.9,
        placements: 3100000,
      },
      {
        name: "IIT Madras",
        location: "Tamil Nadu",
        fees: 850000,
        rating: 4.8,
        placements: 3000000,
      },
      {
        name: "IIT Kanpur",
        location: "Uttar Pradesh",
        fees: 830000,
        rating: 4.8,
        placements: 2800000,
      },
      {
        name: "IIT Kharagpur",
        location: "West Bengal",
        fees: 800000,
        rating: 4.7,
        placements: 2600000,
      },
      {
        name: "IIT Roorkee",
        location: "Uttarakhand",
        fees: 790000,
        rating: 4.7,
        placements: 2500000,
      },
      {
        name: "NIT Warangal",
        location: "Telangana",
        fees: 600000,
        rating: 4.6,
        placements: 2200000,
      },
      {
        name: "NIT Surathkal",
        location: "Karnataka",
        fees: 620000,
        rating: 4.6,
        placements: 2300000,
      },
      {
        name: "NIT Calicut",
        location: "Kerala",
        fees: 610000,
        rating: 4.5,
        placements: 1800000,
      },
      {
        name: "NIT Rourkela",
        location: "Odisha",
        fees: 630000,
        rating: 4.5,
        placements: 2000000,
      },
      {
        name: "IIIT Bangalore",
        location: "Karnataka",
        fees: 1400000,
        rating: 4.8,
        placements: 3400000,
      },
      {
        name: "IIIT Delhi",
        location: "Delhi",
        fees: 1300000,
        rating: 4.7,
        placements: 3200000,
      },
      {
        name: "Manipal Institute of Technology",
        location: "Karnataka",
        fees: 1800000,
        rating: 4.3,
        placements: 1200000,
      },
      {
        name: "SRM Institute of Science and Technology",
        location: "Tamil Nadu",
        fees: 1600000,
        rating: 4.2,
        placements: 1100000,
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