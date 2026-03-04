require("dotenv").config();
const mongoose = require("mongoose");
const Shloka = require("../models/shloka.model");

const shlokas = [
  {
    chapter: 2,
    verse: 47,
    sanskrit:
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    translations: {
      hinglish:
        "Tumhara adhikar sirf karm karne mein hai, uske phal par kabhi nahi. Isliye karm ke phal ke prati aasakti mat rakho, aur karm karna chhodna bhi mat.",
      english:
        "You have the right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results, nor be attached to inaction.",
    },
  },
  {
    chapter: 6,
    verse: 5,
    sanskrit:
      "उद्धरेदात्मनाऽत्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥",
    translations: {
      hinglish:
        "Manushya ko apne aap ko upar uthana chahiye, apne aap ko neeche nahi girana chahiye. Man apna mitra bhi hai aur shatru bhi.",
      english:
        "One must elevate oneself by one’s own mind, not degrade oneself. The mind can be the friend and also the enemy of the self.",
    },
  },
  {
  chapter: 2,
  verse: 14,
  sanskrit:
    "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः । आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥",
  translations: {
    hinglish:
      "Sukh aur dukh aate-jaate rehte hain, inhe sahansheelta se jhelo.",
    english:
      "Pleasure and pain come and go; endure them with patience.",
  },
},
{
  chapter: 2,
  verse: 20,
  sanskrit:
    "न जायते म्रियते वा कदाचित् नायं भूत्वा भविता वा न भूयः ।",
  translations: {
    hinglish:
      "Atma na kabhi janm leti hai, na marti hai.",
    english:
      "The soul is never born nor does it ever die.",
  },
},
{
  chapter: 2,
  verse: 23,
  sanskrit:
    "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः ।",
  translations: {
    hinglish:
      "Atma ko na shastra kaat sakte hain, na aag jala sakti hai.",
    english:
      "Weapons cannot cut the soul, nor can fire burn it.",
  },
},
{
  chapter: 3,
  verse: 8,
  sanskrit:
    "नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः ।",
  translations: {
    hinglish:
      "Apna niyat karm karo, karm na karna galat hai.",
    english:
      "Perform your prescribed duty; action is better than inaction.",
  },
},
{
  chapter: 4,
  verse: 18,
  sanskrit:
    "कर्मण्यकर्म यः पश्येदकर्मणि च कर्म यः ।",
  translations: {
    hinglish:
      "Jo karm mein akarm aur akarm mein karm dekhta hai.",
    english:
      "One who sees inaction in action is truly wise.",
  },
},
{
  chapter: 6,
  verse: 16,
  sanskrit:
    "नात्यश्नतस्तु योगोऽस्ति न चैकान्तमनश्नतः ।",
  translations: {
    hinglish:
      "Ati na bhojan achha hai, na ati upvaas.",
    english:
      "Yoga is not for one who eats too much or too little.",
  },
},
{
  chapter: 9,
  verse: 22,
  sanskrit:
    "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते ।",
  translations: {
    hinglish:
      "Jo mujhe poorn bhakti se yaad karte hain, main unka dhyan rakhta hoon.",
    english:
      "Those who worship Me with devotion, I preserve what they have.",
  },
},
{
  chapter: 12,
  verse: 3,
  sanskrit:
    "ये त्वक्षरमनिर्देश्यमव्यक्तं पर्युपासते ।",
  translations: {
    hinglish:
      "Jo nirakar Ishwar ki upasana karte hain.",
    english:
      "Those who worship the imperishable, unmanifested Absolute.",
  },
},
{
  chapter: 16,
  verse: 21,
  sanskrit:
    "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः ।",
  translations: {
    hinglish:
      "Kaam, krodh aur lobh — ye teen narak ke dwar hain.",
    english:
      "Lust, anger, and greed are the three gates to hell.",
  },
},
{
  chapter: 18,
  verse: 58,
  sanskrit:
    "मच्चित्तः सर्वदुर्गाणि मत्प्रसादात्तरिष्यसि ।",
  translations: {
    hinglish:
      "Mujh par man lagakar tum sab kathinaiyon se paar ho jaoge.",
    english:
      "By fixing your mind on Me, you will overcome all obstacles.",
  },
},

];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 Connected to MongoDB for seeding");

    await Shloka.deleteMany({});
    await Shloka.insertMany(shlokas);

    console.log("✅ Shlokas seeded successfully");
    process.exit();
  } catch (error) {
    console.error("🔴 Seeding failed");
    console.error(error);
    process.exit(1);
  }
};

seed();
