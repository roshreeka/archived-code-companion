// Content carried over from the original Ward 16 Heritage archive, with Nepali translations.
// Do not add historical or geographical facts beyond the supplied interview material.

export type L = { en: string; ne: string };

export type SourceKind = "documented" | "interview" | "community-belief" | "folklore" | "placeholder";

export type StorySection = {
  eyebrow: L;
  title: L;
  body: L[];
  source: SourceKind;
};

export type HeritageSite = {
  slug: string;
  name: L;
  type: L;
  shortDescription: L;
  cardDescription: L;
  featured: boolean;
  documented: boolean;
  intro: L;
  sections: StorySection[];
  rituals: L[];
  gallery: L[];
  quote: L;
  location: L;
  visitorNote: L;
  sources: L[];
  related: string[];
};

const pendingIntro: L = {
  en: "This heritage location is part of the Ward 16 collection. Its historical and cultural description will be added when documentation is available.",
  ne: "यो सम्पदा स्थल वडा नं. १६ को संग्रहको हिस्सा हो। यसको ऐतिहासिक तथा सांस्कृतिक विवरण अभिलेख उपलब्ध भएपछि थपिनेछ।",
};
const pendingShort: L = {
  en: "A Ward 16 heritage location waiting for its documented story to be added.",
  ne: "आफ्नो अभिलेखित कथा थपिने प्रतीक्षामा रहेको वडा नं. १६ को सम्पदा स्थल।",
};
const pendingCard: L = {
  en: "More information coming soon. This card is ready for future community-verified documentation.",
  ne: "थप जानकारी चाँडै आउँदैछ। यो कार्ड भविष्यमा समुदायद्वारा प्रमाणित अभिलेखका लागि तयार छ।",
};
const pendingLocation: L = { en: "Ward 16 · visitor information to be added", ne: "वडा नं. १६ · आगन्तुक जानकारी थपिनेछ" };
const pendingNote: L = { en: "Documentation pending.", ne: "अभिलेखीकरण बाँकी।" };
const verifiedLocation: L = {
  en: "Ward 16 · exact visitor directions to be added after community verification",
  ne: "वडा नं. १६ · सामुदायिक प्रमाणीकरणपछि पुग्ने सही बाटो थपिनेछ",
};

function pendingSite(slug: string, name: L, type: L, related: string[]): HeritageSite {
  return {
    slug,
    name,
    type,
    shortDescription: pendingShort,
    cardDescription: pendingCard,
    featured: false,
    documented: false,
    intro: pendingIntro,
    sections: [],
    rituals: [],
    gallery: [],
    quote: { en: "", ne: "" },
    location: pendingLocation,
    visitorNote: pendingNote,
    sources: [],
    related,
  };
}

export const heritageSites: HeritageSite[] = [
  {
    slug: "siddhi-ganesh",
    name: { en: "Siddhi Ganesh Temple", ne: "सिद्धि गणेश मन्दिर" },
    type: { en: "Temple · documented story", ne: "मन्दिर · अभिलेखित कथा" },
    shortDescription: {
      en: "A living account of worship, memory, and the community keeping a neighborhood temple present.",
      ne: "पूजा, सम्झना र टोलको मन्दिरलाई जीवन्त राख्ने समुदायको एक जीवित विवरण।",
    },
    cardDescription: {
      en: "Interview-based documentation from Siddhi Ganesh Puja Samiti, shared with care and clear source notes.",
      ne: "सिद्धि गणेश पूजा समितिसँगको अन्तर्वार्तामा आधारित अभिलेख, सावधानी र स्पष्ट स्रोत टिप्पणीसहित।",
    },
    featured: true,
    documented: true,
    intro: {
      en: "The Siddhi Ganesh story is rooted in recollection: a once sparsely settled landscape, a neighborhood that grew around it, and a temple whose meaning continues through everyday acts of worship.",
      ne: "सिद्धि गणेशको कथा सम्झनामा आधारित छ: कुनै बेला विरलै बस्ती भएको भूभाग, त्यसको वरिपरि बढेको टोल, र दैनिक पूजाआजाबाट अर्थ निरन्तर रहेको एउटा मन्दिर।",
    },
    sections: [
      {
        eyebrow: { en: "Historical background", ne: "ऐतिहासिक पृष्ठभूमि" },
        title: { en: "From fields and water to a growing settlement", ne: "खेत र पानीदेखि बढ्दो बस्तीसम्म" },
        body: [
          {
            en: "According to the interview documentation, the surrounding area was previously known as Sallaghari. At that time, there were few residential houses and much of the land was occupied by agricultural fields.",
            ne: "अन्तर्वार्ता अभिलेखअनुसार, वरपरको क्षेत्रलाई पहिले सल्लाघारी भनिन्थ्यो। त्यस बेला बसोबासका घरहरू थोरै थिए र धेरैजसो जमिन खेतीयोग्य खेतले ढाकेको थियो।",
          },
          {
            en: "People used the Bishnumati River for bathing, while a well served as an important water source. The area gradually developed into a more populated settlement, changing the context around the temple while retaining the memory of what came before.",
            ne: "मानिसहरू नुहाउन विष्णुमती नदी प्रयोग गर्थे भने एउटा इनार पानीको महत्त्वपूर्ण स्रोत थियो। यो क्षेत्र बिस्तारै घना बस्तीमा विकसित भयो, जसले मन्दिर वरपरको परिवेश बदल्यो तर पहिलेको सम्झना जोगाइरह्यो।",
          },
        ],
        source: "interview",
      },
      {
        eyebrow: { en: "Religious significance", ne: "धार्मिक महत्त्व" },
        title: { en: "A place people return to with hope", ne: "मानिसहरू आशा लिएर फर्किने ठाउँ" },
        body: [
          {
            en: "The local community regards Siddhi Ganesh as the original and significant Ganesh idol in the area. Community beliefs associate worship with prosperity, happiness, and well-being.",
            ne: "स्थानीय समुदायले सिद्धि गणेशलाई यस क्षेत्रको मौलिक र महत्त्वपूर्ण गणेश मूर्ति मान्छ। सामुदायिक विश्वासअनुसार यहाँको पूजा समृद्धि, खुसी र सुस्वास्थ्यसँग जोडिएको छ।",
          },
          {
            en: "Newly married couples traditionally visit the temple after marriage. People also come to offer prayers and make wishes, giving the temple a continuing role in everyday and life-cycle moments.",
            ne: "परम्पराअनुसार नवविवाहित जोडीहरू विवाहपछि मन्दिर दर्शन गर्न आउँछन्। मानिसहरू प्रार्थना गर्न र मनोकामना माग्न पनि आउँछन्, जसले मन्दिरलाई दैनिक जीवन र जीवनचक्रका क्षणहरूमा निरन्तर भूमिका दिन्छ।",
          },
        ],
        source: "community-belief",
      },
      {
        eyebrow: { en: "Local folklore", ne: "स्थानीय लोककथा" },
        title: { en: "A giant snake near the well", ne: "इनार नजिकको विशाल सर्प" },
        body: [
          {
            en: "A traditional story shared during the interview tells of a giant snake believed to have lived near the well. It is presented here as local folklore and an interviewee account, not as a scientifically verified historical event.",
            ne: "अन्तर्वार्ताका क्रममा सुनाइएको एक परम्परागत कथाले इनार नजिक एउटा विशाल सर्प बस्थ्यो भन्ने विश्वासको कुरा गर्छ। यसलाई यहाँ स्थानीय लोककथा र अन्तर्वार्ताकर्ताको भनाइका रूपमा प्रस्तुत गरिएको हो, वैज्ञानिक रूपमा प्रमाणित ऐतिहासिक घटनाका रूपमा होइन।",
          },
        ],
        source: "folklore",
      },
      {
        eyebrow: { en: "Cultural structures", ne: "सांस्कृतिक संरचनाहरू" },
        title: { en: "A shared temple space", ne: "साझा मन्दिर परिसर" },
        body: [
          {
            en: "The temple premises include the main Siddhi Ganesh idol, a Buddhist Chaitya, and a Patti. Together, these structures point to the layered cultural life held within a single neighborhood setting.",
            ne: "मन्दिर परिसरमा मुख्य सिद्धि गणेशको मूर्ति, एउटा बौद्ध चैत्य र एउटा पाटी छन्। यी संरचनाहरूले एउटै टोलभित्र रहेको बहुतह सांस्कृतिक जीवनलाई देखाउँछन्।",
          },
        ],
        source: "interview",
      },
      {
        eyebrow: { en: "Community involvement", ne: "सामुदायिक सहभागिता" },
        title: { en: "Preservation happens through participation", ne: "संरक्षण सहभागिताबाटै हुन्छ" },
        body: [
          {
            en: "The Siddhi Ganesh Puja Samiti helps organize religious activity and care for the site. Community donations, voluntary religious activities, and local participation all contribute to keeping the temple active and maintained.",
            ne: "सिद्धि गणेश पूजा समितिले धार्मिक गतिविधि आयोजना र स्थलको हेरचाहमा सहयोग गर्छ। सामुदायिक दान, स्वैच्छिक धार्मिक गतिविधि र स्थानीय सहभागिताले मन्दिरलाई सक्रिय र व्यवस्थित राख्न योगदान दिन्छन्।",
          },
        ],
        source: "interview",
      },
      {
        eyebrow: { en: "Current preservation challenges", ne: "हालका संरक्षण चुनौतीहरू" },
        title: { en: "Care also means making the site safer", ne: "हेरचाह भनेको स्थललाई सुरक्षित बनाउनु पनि हो" },
        body: [
          {
            en: "The interview documentation notes drainage and water blockage issues around the temple, particularly during the monsoon season. Recording these challenges makes preservation practical as well as symbolic.",
            ne: "अन्तर्वार्ता अभिलेखले मन्दिर वरपर विशेषगरी वर्षायाममा ढल निकास र पानी जम्ने समस्या औंल्याएको छ। यी चुनौतीहरू अभिलेख गर्दा संरक्षण प्रतीकात्मक मात्र नभई व्यावहारिक पनि बन्छ।",
          },
        ],
        source: "interview",
      },
    ],
    rituals: [
      { en: "Ganesh Chaturthi", ne: "गणेश चतुर्थी" },
      { en: "Chyamma Puja", ne: "च्याम्मा पूजा" },
      { en: "Devali Puja", ne: "देवाली पूजा" },
      { en: "Dumbhe Puja", ne: "डुम्भे पूजा" },
      { en: "Tisabicha", ne: "तिसाबिचा" },
    ],
    gallery: [
      { en: "Carved timber", ne: "कुँदिएको काठ" },
      { en: "Stone threshold", ne: "ढुंगाको सँघार" },
      { en: "Future field photograph", ne: "भविष्यको स्थलगत तस्बिर" },
    ],
    quote: {
      en: "Preservation is not only the story of a structure. It is the story of the people who keep returning.",
      ne: "संरक्षण केवल एउटा संरचनाको कथा होइन। यो बारम्बार फर्किरहने मानिसहरूको कथा हो।",
    },
    location: verifiedLocation,
    visitorNote: {
      en: "Traditional Tuesday worship activities and major festival occasions are the most relevant visitor moments noted in the documentation. Please be respectful of ongoing religious activity.",
      ne: "अभिलेखमा उल्लेख भएअनुसार परम्परागत मंगलबारको पूजा र प्रमुख चाडपर्वका अवसरहरू आगन्तुकका लागि सबैभन्दा सान्दर्भिक समय हुन्। कृपया चलिरहेका धार्मिक गतिविधिप्रति सम्मान देखाउनुहोस्।",
    },
    sources: [
      {
        en: "Interview documentation with Shantaram Maharjan, President of Siddhi Ganesh Puja Samiti",
        ne: "सिद्धि गणेश पूजा समितिका अध्यक्ष शान्तराम महर्जनसँगको अन्तर्वार्ता अभिलेख",
      },
      {
        en: "Community accounts recorded for the Ward 16 heritage documentation project",
        ne: "वडा नं. १६ सम्पदा अभिलेखीकरण परियोजनाका लागि संकलित सामुदायिक भनाइहरू",
      },
    ],
    related: ["koncha-dyo", "22-dhara"],
  },
  {
    slug: "koncha-dyo",
    name: { en: "Koncha Dyo", ne: "कोन्चा द्यः" },
    type: { en: "Shrine · interview-led story", ne: "देवस्थल · अन्तर्वार्तामा आधारित कथा" },
    shortDescription: {
      en: "A vessel-shaped shrine whose traditional meaning is carried through Newar community practice and memory.",
      ne: "भाँडाको आकारको देवस्थल, जसको परम्परागत अर्थ नेवार समुदायको अभ्यास र सम्झनाले बोकेको छ।",
    },
    cardDescription: {
      en: "A careful introduction to the traditional Gagro form, ritual association, and the work of keeping its meaning visible.",
      ne: "परम्परागत गाग्रो आकार, यससँग जोडिएको धार्मिक सम्बन्ध र यसको अर्थलाई देखिने बनाइराख्ने कामको सावधान परिचय।",
    },
    featured: true,
    documented: true,
    intro: {
      en: "Koncha Dyo is described through community memory: a vessel-like form, traditional Newar religious associations, and a cultural meaning that local people want younger generations to recognize.",
      ne: "कोन्चा द्यःलाई सामुदायिक सम्झनामार्फत वर्णन गरिन्छ: भाँडाजस्तो आकार, परम्परागत नेवार धार्मिक सम्बन्ध, र स्थानीयहरूले नयाँ पुस्ताले चिनून् भन्ने चाहेको सांस्कृतिक अर्थ।",
    },
    sections: [
      {
        eyebrow: { en: "Historical background", ne: "ऐतिहासिक पृष्ठभूमि" },
        title: { en: "A form remembered through its associations", ne: "आफ्ना सम्बन्धहरूबाट सम्झिइने एउटा आकार" },
        body: [
          {
            en: "The interview notes associate Koncha Dyo with the traditional Newar community. The structure is described as resembling a traditional Gagro, a vessel used for storing liquid.",
            ne: "अन्तर्वार्ता टिपोटहरूले कोन्चा द्यःलाई परम्परागत नेवार समुदायसँग जोड्छन्। यो संरचना तरल पदार्थ राख्न प्रयोग हुने परम्परागत भाँडो गाग्रोजस्तै देखिने भनी वर्णन गरिएको छ।",
          },
          {
            en: "The surrounding area was previously known as Sallaghari. Amod Rajbhandari is mentioned in connection with the historical background of the area; the notes do not establish dates or a complete architectural history.",
            ne: "वरपरको क्षेत्रलाई पहिले सल्लाघारी भनिन्थ्यो। क्षेत्रको ऐतिहासिक पृष्ठभूमिसँग जोडेर आमोद राजभण्डारीको नाम उल्लेख गरिएको छ; टिपोटहरूले मिति वा पूर्ण वास्तुकलात्मक इतिहास स्थापित गर्दैनन्।",
          },
        ],
        source: "interview",
      },
      {
        eyebrow: { en: "Traditional Gagro", ne: "परम्परागत गाग्रो" },
        title: { en: "A vessel-like structure with ritual meaning", ne: "धार्मिक अर्थ बोकेको भाँडाजस्तो संरचना" },
        body: [
          {
            en: "The vessel-like structure is traditionally associated with alcohol offerings during religious practices. This explanation is kept close to the interview notes and does not add ritual details that were not documented.",
            ne: "यो भाँडाजस्तो संरचना परम्परागत रूपमा धार्मिक अभ्यासका बेला मदिरा चढाउने चलनसँग जोडिएको छ। यो व्याख्या अन्तर्वार्ता टिपोटको नजिक राखिएको छ र अभिलेख नभएका धार्मिक विवरण थपिएको छैन।",
          },
        ],
        source: "interview",
      },
      {
        eyebrow: { en: "Religious and cultural significance", ne: "धार्मिक तथा सांस्कृतिक महत्त्व" },
        title: { en: "A living connection to Newar practice", ne: "नेवार अभ्याससँगको जीवित सम्बन्ध" },
        body: [
          {
            en: "The site is connected in the notes to traditional Newar religious practices, alcohol offerings, and traditional connections with Samay Baje. These meanings are presented as community beliefs and interview-based accounts rather than as independently verified historical facts.",
            ne: "टिपोटहरूमा यो स्थललाई परम्परागत नेवार धार्मिक अभ्यास, मदिरा अर्पण र समय बजिसँगको परम्परागत सम्बन्धसँग जोडिएको छ। यी अर्थहरूलाई स्वतन्त्र रूपमा प्रमाणित ऐतिहासिक तथ्यका रूपमा नभई सामुदायिक विश्वास र अन्तर्वार्तामा आधारित भनाइका रूपमा प्रस्तुत गरिएको छ।",
          },
        ],
        source: "community-belief",
      },
      {
        eyebrow: { en: "Marriage-related beliefs", ne: "विवाहसम्बन्धी विश्वास" },
        title: { en: "Blessings for a shared life", ne: "साझा जीवनका लागि आशीर्वाद" },
        body: [
          {
            en: "A community belief holds that newly married couples who visit Koncha Dyo receive blessings for a happy, prosperous, and successful married life. It is a belief shared through local tradition and recorded as such here.",
            ne: "सामुदायिक विश्वासअनुसार कोन्चा द्यःको दर्शन गर्ने नवविवाहित जोडीले सुखी, समृद्ध र सफल वैवाहिक जीवनको आशीर्वाद पाउँछन्। यो स्थानीय परम्पराबाट चलिआएको विश्वास हो र यहाँ त्यसै रूपमा अभिलेख गरिएको छ।",
          },
        ],
        source: "community-belief",
      },
      {
        eyebrow: { en: "Community involvement", ne: "सामुदायिक सहभागिता" },
        title: { en: "The Puja Samiti and local care", ne: "पूजा समिति र स्थानीय हेरचाह" },
        body: [
          {
            en: "The Puja Samiti, local donations, and community participation help keep the site present. This kind of collective care is part of the cultural preservation story even when the physical site is modest.",
            ne: "पूजा समिति, स्थानीय दान र सामुदायिक सहभागिताले यो स्थललाई जीवन्त राख्न मद्दत गर्छन्। भौतिक स्थल सानो भए पनि यस्तो सामूहिक हेरचाह सांस्कृतिक संरक्षणको कथाको हिस्सा हो।",
          },
        ],
        source: "interview",
      },
      {
        eyebrow: { en: "Cultural preservation", ne: "सांस्कृतिक संरक्षण" },
        title: { en: "Making the meaning visible again", ne: "अर्थलाई फेरि देखिने बनाउँदै" },
        body: [
          {
            en: "The notes highlight declining awareness of the site's traditional significance, especially among younger generations and people outside the local community. Documentation can help create a bridge between inherited practice and future understanding.",
            ne: "टिपोटहरूले विशेषगरी नयाँ पुस्ता र स्थानीय समुदायबाहिरका मानिसहरूमा यस स्थलको परम्परागत महत्त्वबारे घट्दो चेतनालाई औंल्याउँछन्। अभिलेखीकरणले पुर्खाबाट पाएको अभ्यास र भविष्यको बुझाइबीच पुल बनाउन मद्दत गर्न सक्छ।",
          },
        ],
        source: "interview",
      },
    ],
    rituals: [
      { en: "Traditional alcohol offerings", ne: "परम्परागत मदिरा अर्पण" },
      { en: "Connections with Samay Baje", ne: "समय बजिसँगको सम्बन्ध" },
      { en: "Marriage-related visits described in community belief", ne: "सामुदायिक विश्वासमा वर्णित विवाहसम्बन्धी दर्शन" },
    ],
    gallery: [
      { en: "Gagro form", ne: "गाग्रोको आकार" },
      { en: "Brick platform", ne: "इँटाको चौतारो" },
      { en: "Future field photograph", ne: "भविष्यको स्थलगत तस्बिर" },
    ],
    quote: {
      en: "A site's meaning can become quiet without disappearing. Documentation gives it another way to be heard.",
      ne: "कुनै स्थलको अर्थ हराउँदै नहराई मौन हुन सक्छ। अभिलेखीकरणले त्यसलाई सुनिने अर्को बाटो दिन्छ।",
    },
    location: verifiedLocation,
    visitorNote: {
      en: "Please approach the site as an active place of cultural and religious meaning. Further visiting guidance will be added with community input.",
      ne: "कृपया यस स्थललाई सांस्कृतिक र धार्मिक अर्थ बोकेको सक्रिय ठाउँका रूपमा लिनुहोस्। थप भ्रमण निर्देशन समुदायको सुझावसहित थपिनेछ।",
    },
    sources: [
      { en: "Koncha Dyo interview notes", ne: "कोन्चा द्यः अन्तर्वार्ता टिपोटहरू" },
      {
        en: "Community accounts recorded for the Ward 16 heritage documentation project",
        ne: "वडा नं. १६ सम्पदा अभिलेखीकरण परियोजनाका लागि संकलित सामुदायिक भनाइहरू",
      },
    ],
    related: ["siddhi-ganesh", "sitala-ajima"],
  },
  pendingSite("22-dhara", { en: "22 Dhara", ne: "२२ धारा" }, { en: "Water heritage · documentation pending", ne: "जल सम्पदा · अभिलेखीकरण बाँकी" }, ["siddhi-ganesh"]),
  pendingSite("sitala-ajima", { en: "Sitala Ajima", ne: "शीतला अजिमा" }, { en: "Shrine · documentation pending", ne: "देवस्थल · अभिलेखीकरण बाँकी" }, ["koncha-dyo"]),
  pendingSite("mhepi-ajima", { en: "Mhepi Ajima", ne: "म्हेपी अजिमा" }, { en: "Shrine · documentation pending", ne: "देवस्थल · अभिलेखीकरण बाँकी" }, ["siddhi-ganesh"]),
  pendingSite("gurunakak", { en: "Gurunakak", ne: "गुरुनकक" }, { en: "Heritage location · documentation pending", ne: "सम्पदा स्थल · अभिलेखीकरण बाँकी" }, ["koncha-dyo"]),
];

export const documentedSites = heritageSites.filter((site) => site.documented);
export const futureSites = heritageSites.filter((site) => !site.documented);

export function getHeritageSite(slug: string) {
  return heritageSites.find((site) => site.slug === slug);
}
