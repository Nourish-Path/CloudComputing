const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Middleware untuk parsing JSON

// Data artikel
let articles = [
    {
        id: 1,
        title: "Stunting in a nutshell",
        description: "Stunting is a growth and development impairment experienced by children due to poor nutrition, recurrent infections, and inadequate psychosocial stimulation. Children are considered stunted if their height-for-age is more than two standard deviations below the WHO Child Growth Standards median. Stunting begins in early life, particularly during the first 1,000 days from conception to a child's second birthday. Impaired growth has adverse functional consequences for children, including poor cognition and educational performance, lower adult wages, reduced productivity, and, if accompanied by excessive weight gain later in childhood, an increased risk of nutrition-related chronic diseases in adulthood. Linear growth in early childhood is a strong marker of healthy development due to its association with risks of morbidity, mortality, non-communicable diseases later in life, as well as learning capacity and productivity. Linear growth is also closely tied to child development in several domains, including cognitive, language, and sensory-motor skills. Stunting is not a synonym of under-normal nutrition. Stunting in the modern sense has been the natural condition of human height for more than 10,000 years. Historic observations on children of starving populations in Europe emphasized the lack of association between starvation and long-term growth. Modern studies in low- and middle-income countries similarly fail to provide evidence of an association between stunting and malnutrition. Being shorter than average reflects poor social, economic, political, and emotional circumstances and highlights social disadvantage and poor parental education. Parental education has a positive effect on the body height of children. The concept of SEPE is a modern concept explaining the regulation of body height.",
        image: "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting1.WEBP"
    },
    {
        id: 2,
        title: "Stunting Reduction in Bojonegoro",
        description: "Stunting is not synonymous with under-normal nutrition. In fact, stunting, in the modern sense, has been a natural condition of human height for over 10,000 years. Historical observations of children from starving populations in Europe highlighted the lack of correlation between starvation and long-term growth. Modern studies in low- and middle-income countries also fail to establish a direct link between stunting and malnutrition. Being shorter than average is often a result of poor social, economic, political, and emotional conditions, reflecting social disadvantage and inadequate parental education. Parental education, however, has a positive influence on children's body height. The concept of SEPE (Social, Economic, Political, and Educational factors) is a modern framework that helps explain the regulation of body height.",
        image: "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting2.JPEG"
    },
    {
        "id": 3,
        "title": "What does stunting tell us?",
        "description": "Stunting is not a synonym of under-normal nutrition. Stunting in the modern sense has been the natural condition of human height for more than 10,000 years. Already historic observations on children of starving populations in Europe emphasized the lack of association between starvation and long-term growth. Modern studies in low- and middle-income countries similarly fail to provide evidence of an association between stunting and malnutrition. Being shorter than average reflects poor social, economic, political, and emotional circumstances and reflects social disadvantage and poor parental education. Parental education has a positive effect on the body height of children. The concept of SEPE is a modern concept explaining the regulation of body height.",
        "image": "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting3.WEBP"
        },
    
        {
        "id": 4,
        "title": "Narration in Health Communication for Stunting ",
        "description": "The Ministry of Health, as the primary driver of stunting prevention in Indonesia, launched national campaigns to raise public awareness about stunting through various media, including social media, TV, radio, and public service advertisements. These efforts emphasized the importance of the first 1,000 days of a child's life for proper nutrition and promoted the 'Fill My Plate' campaign for balanced meals. Collaborative actions with government institutions improved synergy, while innovative platforms like Radio Siaran Kesehatan expanded outreach. These initiatives addressed a previously overlooked issue, reducing stunting rates toward WHO's acceptable limit of 20%.",
        "image": "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting4.WEBP"
        },
    
        {
        "id": 5,
        "title": "Awareness, Motivation, and Intentions in Preventing Stunting in the Dry Land Area of Kupang Regency, East Nusa Tenggara Province ",
        "description": "The study examined the characteristics and awareness of mothers and health workers in preventing stunting in East Kupang. Among 20 mothers, most were unemployed, with varying education levels, and diverse religious backgrounds. Health workers included three professionals with different education levels. Many mothers lacked knowledge of stunting, associating it with short stature rather than malnutrition, and some attributed it to heredity. Awareness and action cues, such as breastfeeding and hygiene, were influenced by health workers and family support. Economic constraints and limited time often hindered proper nutrition. Despite challenges, mothers expressed a desire to provide better care, highlighting the need for enhanced education and resources to support stunting prevention efforts.",
        "image": "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting5.WEBP"
        },
        
        {
        "id": 6,
        "title": "Stunting In Indonesia: Undesrtanding The Roots of The Problem and Solutions",
        "description": "The root causes of stunting in Indonesia include malnutrition, poor environment, sanitation, poor maternal health, lack of nutrition education and public awareness, and socio-economic factors and inequality. A holistic approach involving the government, the community, and related stakeholders is needed to address stunting. This approach should include increasing access to quality nutrition, improving health services, providing adequate nutrition education, and raising public awareness. Additionally, socioeconomic factors must be considered to ensure equal access to resources and opportunities. For this reason, Commission IX of the DPR RI is conducting oversight to ensure that the government makes coordinated efforts and cooperates with all parties in overcoming stunting.",
        "image": "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting6.WEBP"
        },
        
        {
        "id": 7,
        "title": "Building Public Awareness : Education and Campaigns to Prevent Stunting in the Next Generation",
        "description": "Stunting remains a significant health challenge in Indonesia, particularly in RW 07 Cibunut, Kebon Pisang Village, Bandung City. Contributing factors include limited access to proper nutrition, poor sanitation, inadequate healthcare, and low education levels. A local initiative, 'Banting Pintu,' has been successful in addressing stunting by growing vegetables and raising catfish through compost media, with proceeds supporting families at risk. However, broader socio-economic issues, such as poverty, inadequate hygiene, and low awareness of nutrition, exacerbate stunting. Effective intervention requires a holistic approach, involving improved nutrition, healthcare access, sanitation, and community education. Collaborative efforts between the government, NGOs, and the community are essential for sustainable solutions to reduce stunting and improve children's health outcomes.",
        "image": "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting7.WEBP"
        },
        
        {
        "id": 8,
        "title": "Childhood stunting: a global perspective",
         "description": "Childhood stunting is the best overall indicator of children's well-being and an accurate reflection of social inequalities. Stunting is the most prevalent form of child malnutrition, affecting millions of children globally. Despite its high prevalence and consensus regarding how to define and measure it, stunting often goes unrecognized in communities where short stature is the norm. Growth faltering often begins in utero and continues for at least the first 2 years of post-natal life. The severe irreversible physical and neurocognitive damage that accompanies stunted growth is a major barrier to human development. Increased awareness of stunting's magnitude and devastating consequences has resulted in its being identified as a major global health priority and the focus of international attention at the highest levels with global reduction targets set for 2025 and beyond. The challenge ahead is to prevent linear growth failure while keeping child overweight and obesity at bay.",
        "image": "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting8.WEBP"
        },
        
        {
        "id": 9,
        "title": "Stunting Reduction Strategy In Indonesia: Maternal Knowledge Aspects",
        "description": "This study was part of the Infant Weighing Operation Program conducted in February 2023, involving 92 participants. Its aim was to examine the relationship between maternal nutritional knowledge and the prevalence of stunting among infants. The bivariate analysis revealed that 40 mothers had sufficient nutritional knowledge, with 36 infants classified as short and 4 as very short. Additionally, 16 underweight infants were classified as short, while 22 were categorized as very short. The analysis yielded a p-value of 0.000, indicating statistical significance. Therefore, a notable correlation exists between maternal nutritional literacy and infant stunting. The study further identified that 49 participants had poor nutritional knowledge, while 38 had sufficient knowledge, with a p-value of 0.008, indicating statistical significance at a significance threshold of 0.005.",
        "image": "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting9.WEBP"
        },
        
        {
        "id": 10,
        "title": "Preventing Stunting in Children",
        "description": "According to the research results, education is one of the internal factors that significantly affects knowledge. With a higher level of education, individuals can more easily receive and comprehend information. This enables mothers to better understand how to prevent stunting in children. This finding aligns with theories suggesting that individuals with higher education levels are more capable of absorbing information compared to those with lower education levels. The knowledge gained serves as essential guidance for mothers in caring for their children, ensuring that they are not at risk of stunting.",
        "image": "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting10.WEBP"
        },
];

// Endpoint utama (root)
app.get('/', (req, res) => {
    res.send('Welcome to the Article API!');
});

// Endpoint untuk mendapatkan semua artikel
app.get('/api/articles', (req, res) => {
    res.status(200).json({ articles });
});

// Endpoint untuk mendapatkan artikel berdasarkan ID
app.get('/api/articles/:id', (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = articles.find(a => a.id === articleId);

    if (article) {
        res.status(200).json(article);
    } else {
        res.status(404).json({ error: "Article not found" });
    }
});

// Endpoint untuk menambahkan artikel baru
app.post('/api/articles', (req, res) => {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
        return res.status(400).json({ error: "Invalid data" });
    }

    const newArticle = {
        id: articles.length > 0 ? articles[articles.length - 1].id + 1 : 1,
        title,
        description,
        image
    };

    articles.push(newArticle);
    res.status(201).json({ message: "Article added successfully", article: newArticle });
});

// Jalankan server
const PORT = process.env.PORT || 8080; // Gunakan port 8080 untuk Google Cloud
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});