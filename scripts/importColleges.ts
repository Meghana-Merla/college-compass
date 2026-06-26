import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges: any[] = [];

fs.createReadStream("data/college.csv")
  .pipe(csv())
  .on("data", (row) => {
  colleges.push({
    name: row.name,
    city: row.city,
    state: row.state,
    type: row.type,
    fees: row.fees_ug_inr ? Number(row.fees_ug_inr) : null,
    averagePackage: row.placement_avg_lpa
      ? Number(row.placement_avg_lpa)
      : null,
    rating: row.rating ? Number(row.rating) : null,
    nirfRank: row.nirf_rank ? Number(row.nirf_rank) : null,

    website: null,
    image: null,
    description: null,
  });
})
  .on("end", async () => {
    try {
      await prisma.college.createMany({
        data: colleges,
      });

      console.log(`✅ Imported ${colleges.length} colleges`);
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
    }
  });