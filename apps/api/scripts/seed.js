const User = require("../models/user");
const Category = require("../models/category");
const Package = require("../models/package");
const Story = require("../models/story");
const Booking = require("../models/booking");
const Review = require("../models/review");
const Comment = require("../models/comment");
const Wishlist = require("../models/wishlist");


async function seedDatabase() {
  try {
    console.log("\n🌱 Seeding database...");

    // ── Clear all collections ───────────────────────────────────────────
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Package.deleteMany({}),
      Story.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
      Comment.deleteMany({}),
      Wishlist.deleteMany({}),
    ]);
    console.log("  ✓ Cleared all collections");

    // ── Users ───────────────────────────────────────────────────────────
    const adminUser = await User.create({
      email: "admin@tourguide.com",
      password: "admin123",
      name: "Admin User",
      role: "admin",
      isApproved: true,
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    });

    const testUser = await User.create({
      email: "user@test.com",
      password: "user123",
      name: "Test User",
      role: "user",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    });

    const guides = await User.create([
      {
        email: "john.guide@tourguide.com",
        password: "guide123",
        name: "John Anderson",
        role: "guide",
        isApproved: false,
        phone: "+1234567890",
        bio: "Experienced tour guide with 10+ years of expertise in adventure tours",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      },
      {
        email: "sarah.guide@tourguide.com",
        password: "guide123",
        name: "Sarah Mitchell",
        role: "guide",
        isApproved:false,
        phone: "+1234567891",
        bio: "Nature and wildlife specialist, passionate about eco-tourism",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      },
      {
        email: "mike.guide@tourguide.com",
        password: "guide123",
        name: "Mike Johnson",
        role: "guide",
        isApproved: false,
        phone: "+1234567892",
        bio: "Cultural heritage expert and history enthusiast",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      },
         {
        email: "jodhn.guide@tourguide.com",
        password: "guide123",
        name: "John Anderson",
        role: "guide",
        isApproved: false,
        phone: "+1234567890",
        bio: "Experienced tour guide with 10+ years of expertise in adventure tours",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      },
      {
        email: "sardah.guide@tourguide.com",
        password: "guide123",
        name: "Sarah Mitchell",
        role: "guide",
        isApproved:false,
        phone: "+1234567891",
        bio: "Nature and wildlife specialist, passionate about eco-tourism",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      },
      {
        email: "midke.guide@tourguide.com",
        password: "guide123",
        name: "Mike Johnson",
        role: "guide",
        isApproved: false,
        phone: "+1234567892",
        bio: "Cultural heritage expert and history enthusiast",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      },
         {
        email: "jofdhn.guide@tourguide.com",
        password: "guide123",
        name: "John Anderson",
        role: "guide",
        isApproved: false,
        phone: "+1234567890",
        bio: "Experienced tour guide with 10+ years of expertise in adventure tours",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      },
      {
        email: "mifdke.guide@tourguide.com",
        password: "guide123",
        name: "Mike Johnson",
        role: "guide",
        isApproved: false,
        phone: "+1234567892",
        bio: "Cultural heritage expert and history enthusiast",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      },
    ]);
    console.log(`  ✓ Created ${3 + guides.length} users (1 admin, 1 test, ${guides.length} guides)`);

    // ── Categories ──────────────────────────────────────────────────────
    const categories = await Category.create([
      {
        name: "Adventure",
        slug: "adventure",
        description: "Thrilling adventures for adrenaline seekers",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      },
      {
        name: "Nature",
        slug: "nature",
        description: "Explore beautiful natural landscapes",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      },
      {
        name: "Beach",
        slug: "beach",
        description: "Relaxing beach destinations",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      },
      {
        name: "Hiking",
        slug: "hiking",
        description: "Mountain and trail hiking experiences",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      },
      {
        name: "Historical",
        slug: "historical",
        description: "Discover rich cultural heritage",
        image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800",
      },
    ]);
    console.log(`  ✓ Created ${categories.length} categories`);

    // ── Packages ─────────────────────────────────────────────────────────
    const packages = await Package.create([
      {
        title: "Mountain Adventure Trek",
        description:
          "Experience breathtaking mountain views on this 5-day adventure trek through pristine wilderness. Perfect for adventure enthusiasts.",
        price: 899,
        duration: 5,
        maxGroupSize: 12,
        difficulty: "difficult",
        tourType: "Adventure Trek",
        category: categories[0]._id, // Adventure
        guide: guides[0]._id, // John
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
          "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
        ],
        startLocation: "Mountain Base Camp",
        locations: ["Base Camp", "Summit Ridge", "Alpine Lake", "Peak Point"],
        activities: [
          { day: 1, title: "Base Camp Arrival", description: "Meet the team and prepare equipment" },
          { day: 2, title: "Ridge Hiking", description: "Trek to summit ridge" },
          { day: 3, title: "Peak Attempt", description: "Summit day – reach the peak" },
          { day: 4, title: "Alpine Lake", description: "Descend to beautiful alpine lake" },
          { day: 5, title: "Return Journey", description: "Trek back to base camp" },
        ],
        availability: true,
        isApproved: true,
      },
      {
        title: "Tropical Paradise Island Tour",
        description:
          "Explore pristine beaches and crystal-clear waters in this 3-day tropical getaway.",
        price: 599,
        duration: 3,
        maxGroupSize: 20,
        difficulty: "easy",
        tourType: "Beach Tour",
        category: categories[2]._id, // Beach
        guide: guides[1]._id, // Sarah
        coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        images: [
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
          "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800",
        ],
        startLocation: "Island Port",
        locations: ["Island Port", "Paradise Beach", "Coral Reef"],
        activities: [
          { day: 1, title: "Island Arrival", description: "Check-in and beach orientation" },
          { day: 2, title: "Snorkeling Adventure", description: "Explore coral reefs" },
          { day: 3, title: "Beach Relaxation", description: "Free time at paradise beach" },
        ],
        availability: true,
        isApproved: true,
      },
      {
        title: "Ancient Heritage Tour",
        description:
          "Journey through time visiting ancient temples, monuments, and historical sites.",
        price: 749,
        duration: 4,
        maxGroupSize: 15,
        difficulty: "moderate",
        tourType: "Cultural Tour",
        category: categories[4]._id, // Historical
        guide: guides[2]._id, // Mike
        coverImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800",
        images: [
          "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800",
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
        ],
        startLocation: "Historic City Center",
        locations: ["Ancient Temple", "Royal Palace", "Museum District"],
        activities: [
          { day: 1, title: "City Orientation", description: "Introduction to historical sites" },
          { day: 2, title: "Temple Complex", description: "Visit ancient temple ruins" },
          { day: 3, title: "Royal Palace", description: "Explore the royal palace" },
          { day: 4, title: "Cultural Museum", description: "Museum and artifact viewing" },
        ],
        availability: true,
        isApproved: true,
      },
      {
        title: "Rainforest Eco Safari",
        description:
          "Immerse yourself in lush rainforest ecosystems with expert naturalist guides.",
        price: 1099,
        duration: 6,
        maxGroupSize: 10,
        difficulty: "moderate",
        tourType: "Eco Tour",
        category: categories[1]._id, // Nature
        guide: guides[1]._id, // Sarah
        coverImage: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
        images: [
          "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
          "https://images.unsplash.com/photo-1597423498219-04418210827d?w=800",
        ],
        startLocation: "Rainforest Lodge",
        locations: ["Forest Lodge", "Canopy Walkway", "Waterfall", "Wildlife Reserve"],
        activities: [
          { day: 1, title: "Lodge Arrival", description: "Welcome and nature briefing" },
          { day: 2, title: "Canopy Walk", description: "Walk among the treetops" },
          { day: 3, title: "Waterfall Trek", description: "Hike to hidden waterfall" },
          { day: 4, title: "Wildlife Spotting", description: "Morning wildlife observation" },
          { day: 5, title: "Village Visit", description: "Meet local communities" },
          { day: 6, title: "Departure", description: "Morning birdwatching and departure" },
        ],
        availability: true,
        isApproved: true,
      },
    ]);
    console.log(`  ✓ Created ${packages.length} packages`);

    // ── Stories ──────────────────────────────────────────────────────────
    const stories = await Story.create([
      {
        user: testUser._id,
        title: "My Amazing Mountain Adventure",
        content:
          "The trek to the summit was challenging but incredibly rewarding. The views from the top were absolutely breathtaking. Our guide was knowledgeable and made sure everyone was safe throughout the journey. This experience changed my perspective on life and nature. I highly recommend this adventure to anyone seeking a transformative experience.",
        coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        images: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
          "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
        ],
        isPublished: true,
        isApproved: true,
      },
      {
        user: guides[0]._id,
        title: "Why I Became a Tour Guide",
        content:
          "After years of working in an office, I decided to follow my passion for the outdoors. Becoming a tour guide has been the best decision of my life. Every day I get to share the beauty of nature with others and see their faces light up with wonder. The connections I make with travelers from around the world are priceless.",
        coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        images: ["https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"],
        isPublished: true,
        isApproved: true,
      },
    ]);
    console.log(`  ✓ Created ${stories.length} stories`);

    // ── Bookings ────────────────────────────────────────────────────────
    const now = new Date();
    const bookings = await Booking.create([
      {
        user: testUser._id,
        package: packages[0]._id, // Mountain Adventure Trek
        guide: guides[0]._id,
        status: "completed",
        bookingDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        travelDate: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        guests: 2,
        totalPrice: 1798,
        paymentStatus: "paid",
      },
      {
        user: testUser._id,
        package: packages[1]._id, // Tropical Paradise
        guide: guides[1]._id,
        status: "confirmed",
        bookingDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        travelDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        guests: 3,
        totalPrice: 1797,
        paymentStatus: "paid",
      },
      {
        user: testUser._id,
        package: packages[2]._id, // Ancient Heritage
        guide: guides[2]._id,
        status: "pending",
        bookingDate: new Date(),
        travelDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        guests: 1,
        totalPrice: 749,
        paymentStatus: "pending",
      },
    ]);
    console.log(`  ✓ Created ${bookings.length} bookings`);

    // ── Reviews (for the completed booking) ─────────────────────────────
    const reviews = await Review.create([
      {
        guide: guides[0]._id,
        user: testUser._id,
        booking: bookings[0]._id,
        rating: 5,
        comment:
          "John was an incredible guide! Very knowledgeable about the mountain trails and kept us safe the entire trip. Highly recommended!",
        isApproved: true,
      },
      {
        guide: guides[1]._id,
        user: adminUser._id,
        booking: bookings[1]._id,
        rating: 4,
        comment:
          "Sarah made our tropical trip unforgettable. Great knowledge of marine life and very friendly with the group.",
        isApproved: true,
      },
    ]);
    console.log(`  ✓ Created ${reviews.length} reviews`);

    // ── Comments (on stories) ───────────────────────────────────────────
    const comments = await Comment.create([
      {
        story: stories[0]._id,
        user: guides[1]._id,
        content: "What an inspiring adventure! The mountain trek sounds absolutely amazing.",
        isApproved: true,
      },
      {
        story: stories[0]._id,
        user: guides[2]._id,
        content: "I have done the same trek last year — it truly changes your perspective!",
        isApproved: true,
      },
      {
        story: stories[1]._id,
        user: testUser._id,
        content:
          "Great story, John! It is wonderful to see guides who are so passionate about what they do.",
        isApproved: true,
      },
    ]);
    console.log(`  ✓ Created ${comments.length} comments`);

    // ── Wishlists ───────────────────────────────────────────────────────
    const wishlists = await Wishlist.create([
      {
        user: testUser._id,
        package: packages[3]._id, // Rainforest Eco Safari
      },
      {
        user: testUser._id,
        package: packages[2]._id, // Ancient Heritage
      },
    ]);
    console.log(`  ✓ Created ${wishlists.length} wishlist items`);

    // ── Summary ─────────────────────────────────────────────────────────
    console.log("\n=== SEED COMPLETE ===");
    console.log("\nTest Accounts:");
    console.log("  Admin : admin@tourguide.com / admin123");
    console.log("  User  : user@test.com / user123");
    console.log("  Guide : john.guide@tourguide.com / guide123");
    console.log("  Guide : sarah.guide@tourguide.com / guide123");
    console.log("  Guide : mike.guide@tourguide.com / guide123");
    console.log("Database seeded successfully!\n");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

module.exports = seedDatabase;

if (require.main === module) {
  require("dotenv").config();
  const mongoose = require("mongoose");
  const uri =
    process.env.MONGO_URI ||
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST || "cluster0.crat2tn.mongodb.net"}/tourDb?retryWrites=true&w=majority`;
  mongoose.connect(uri).then(async () => {
    console.log("Connected to MongoDB");
    await seedDatabase();
    await mongoose.connection.close();
    process.exit(0);
  }).catch((err) => {
    console.error("Connection error:", err);
    process.exit(1);
  });
}
