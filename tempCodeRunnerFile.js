
use("e-buy");

db.getCollection("categories").insertMany([
  { name: "Electronics" },
  { name: "Fashion" },
  { name: "Home & Kitchen" },
  { name: "Books" },
  { name: "Beauty & Personal Care" },
  { name: "Health & Wellness" },
  { name: "Sports & Outdoors" },
  { name: "Toys & Games" },
  { name: "Automotive" },
  { name: "Grocery & Gourmet Food" },
  { name: "Pet Supplies" },
  { name: "Office Products" },
  { name: "Baby Products" },
  { name: "Jewelry & Watches" },
  { name: "Luggage & Travel" },
  { name: "Music Instruments" },
  { name: "Garden & Outdoor" },
  { name: "Tools & Home Improvement" },
  { name: "Movies & TV" },
  { name: "Video Games" },
]);
