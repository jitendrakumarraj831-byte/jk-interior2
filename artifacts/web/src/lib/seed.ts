import { db, pool } from "@workspace/db";
import {
  districtsTable,
  citiesTable,
  servicesTable,
  projectsTable,
  galleryItemsTable,
  reviewsTable,
  faqsTable,
  blogPostsTable,
} from "@workspace/db/schema";
import {
  districtsSeed,
  citiesSeed,
  servicesSeed,
  projectsSeed,
  galleryItemsSeed,
  reviewsSeed,
  faqsSeed,
  blogPostsSeed,
} from "./seed-data";

async function main() {
  console.log("Seeding database…");

  await db.delete(galleryItemsTable);
  await db.delete(reviewsTable);
  await db.delete(blogPostsTable);
  await db.delete(projectsTable);
  await db.delete(servicesTable);
  await db.delete(citiesTable);
  await db.delete(districtsTable);
  await db.delete(faqsTable);

  const districts = await db.insert(districtsTable).values(districtsSeed).returning();
  const districtBySlug = new Map(districts.map((d) => [d.slug, d]));
  console.log(`  districts: ${districts.length}`);

  const cities = await db
    .insert(citiesTable)
    .values(
      citiesSeed.map(({ districtSlug, ...city }) => {
        const district = districtBySlug.get(districtSlug);
        if (!district) throw new Error(`Unknown district slug: ${districtSlug}`);
        return { ...city, districtId: district.id };
      }),
    )
    .returning();
  const cityBySlug = new Map(cities.map((c) => [c.slug, c]));
  console.log(`  cities: ${cities.length}`);

  const services = await db.insert(servicesTable).values(servicesSeed).returning();
  const serviceBySlug = new Map(services.map((s) => [s.slug, s]));
  console.log(`  services: ${services.length}`);

  const projects = await db
    .insert(projectsTable)
    .values(
      projectsSeed.map(({ serviceSlug, citySlug, ...project }) => ({
        ...project,
        serviceId: serviceSlug ? (serviceBySlug.get(serviceSlug)?.id ?? null) : null,
        cityId: citySlug ? (cityBySlug.get(citySlug)?.id ?? null) : null,
      })),
    )
    .returning();
  const projectBySlug = new Map(projects.map((p) => [p.slug, p]));
  console.log(`  projects: ${projects.length}`);

  const galleryItems = await db.insert(galleryItemsTable).values(
    galleryItemsSeed.map(({ projectSlug, spaceType, ...item }) => {
      const project = projectBySlug.get(projectSlug);
      if (!project) throw new Error(`Unknown project slug: ${projectSlug}`);
      return { ...item, projectId: project.id, spaceType: spaceType as (typeof projectsTable.$inferSelect)["spaceType"] };
    }),
  );
  console.log(`  gallery items: ${galleryItemsSeed.length}`);

  await db.insert(reviewsTable).values(
    reviewsSeed.map(({ citySlug, districtSlug, ...review }) => ({
      ...review,
      cityId: citySlug ? (cityBySlug.get(citySlug)?.id ?? null) : null,
      districtId: districtSlug ? (districtBySlug.get(districtSlug)?.id ?? null) : null,
    })),
  );
  console.log(`  reviews: ${reviewsSeed.length}`);

  await db.insert(faqsTable).values(faqsSeed);
  console.log(`  faqs: ${faqsSeed.length}`);

  await db.insert(blogPostsTable).values(
    blogPostsSeed.map(({ serviceSlugs, districtSlug, ...post }) => ({
      ...post,
      serviceTags: serviceSlugs,
      districtId: districtSlug ? (districtBySlug.get(districtSlug)?.id ?? null) : null,
    })),
  );
  console.log(`  blog posts: ${blogPostsSeed.length}`);

  console.log("Seed complete.");
  void galleryItems;
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
