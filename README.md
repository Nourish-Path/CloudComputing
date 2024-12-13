# Stunting Prevention Application - Cloud Computing Infrastructure

This repository contains the cloud infrastructure and API implementations for the Stunting Prevention Application, developed by the Cloud Computing team. It comprises three branches, each dedicated to a specific API function to ensure modularity and scalability.

## Repository Structure

### Branches and Functions:
1. **main**
   - Contains the API for managing educational articles to inform mothers about stunting.
   - Articles are hosted on Google App Engine, and images are stored in Cloud Storage.

2. **calculate-nutrition**
   - Contains the API for calculating nutritional intake.
   - Mothers input the food consumed by their baby, and the system evaluates the nutritional content, identifies unmet nutritional needs, and provides food recommendations.

3. **check-stunting**
   - Contains the API for detecting if a baby is at risk of stunting.
   - Based on user input (baby’s age, weight, and height), the system uses a machine learning model to determine the stunting risk and stores the results in Firestore.


## Technologies Used
- **node.js:** Web framework for building the API server.
- **FastAPI:** Used to create the API endpoint for the ML model.
- **uviccorn:** run FastAPI applications asynchronously
- **Firebase:** Provides a NoSQL database (Firestore) and authentication services.
- **Docker:** To package applications into containers so they can run on Cloud Run.

  
## GCP Architecture
![Cloud Architecture](https://github.com/Nourish-Path/CloudComputing/blob/main/Cloud%20Architecture.png)



## API Endpoint Documentation
#### Article

**GET /api/articles**

* **Description:** List of article.
* **URL Base**
   ```json
   https://endless-ability-442917-v1.et.r.appspot.com/api/articles
   ```
**GET /api/articles/id**

* **Description:** Detail of article.
* **URL Base**
   ```json
   https://endless-ability-442917-v1.et.r.appspot.com/api/articles/3
   ```
* **Request Body**: None
* **Response**
   ```json
   {
  "error": false,
  "message": "Article fetched successfully",
  "article": {
    "id": 3,
    "title": "What does stunting tell us?",
    "description": "Stunting is not a synonym of under-normal nutrition. Stunting in the modern sense has been the natural condition of human height for more than 10,000 years. Already historic observations on children of starving populations in Europe emphasized the lack of association between starvation and long-term growth. Modern studies in low- and middle-income countries similarly fail to provide evidence of an association between stunting and malnutrition. Being shorter than average reflects poor social, economic, political, and emotional circumstances and reflects social disadvantage and poor parental education. Parental education has a positive effect on the body height of children. The concept of SEPE is a modern concept explaining the regulation of body height.",
    "image": "https://storage.googleapis.com/endless-ability-442917-v1.appspot.com/stunting3.jpg"
  }

   ```
   
#### Analyze-Stunting

**POST /check_stunting/**

* **Description:** check stunting status in babies.
* **Request Body:**
  ```json
   {
       "age": "baby_age",
       "weight": "baby_weight",
       "height": "baby_height"
   }
   ```
   
* **Response:**
   ```json
   {
       "stunting_status": "Normal" or "Stunting",
       "model_prediction": "[1] or [0]" 
   }
   ```

#### Calculate-Nutrition

**POST /recommend/**

* **Description:** check stunting status in babies.
* **Request Body:**
   ```json
   {
       "age": "baby_age",
       "total_foods": "total food (array)",
       "foods": [
         {
         "category": "food_category",
         "description": "food_description",
         "amount": "food_amount"
         }
      ]
   }
   ```
* **Response:**
   ```json
   {
  "Nutrisi yang harus dipenuhi": {
    "Data.Protein": 9,
    "Data.Fat.Total Lipid": 31,
    "Data.Fat.Polysaturated Fat": 4.9,
    "Data.Carbohydrate": 59,
    "Data.Fiber": 0,
    "Data.Water": 700,
    "Data.Vitamins.Vitamin A": 375,
    "Data.Major Minerals.Calcium": 200,
    "Data.Vitamins.Vitamin E": 0,
    "Data.Vitamins.Vitamin K": 5,
    "Data.Thiamin": 0.2,
    "Data.Riboflavin": 0.3,
    "Data.Niacin": 2,
    "Data.Vitamins.Vitamin B6": 0.1,
    "Data.Vitamins.Vitamin B12": 0.4,
    "Data.Choline": 125,
    "Data.Vitamins.Vitamin C": 40,
    "Data.Major Minerals.Phosphorus": 100,
    "Data.Major Minerals.Magnesium": 30,
    "Data.Major Minerals.Sodium": 120,
    "Data.Major Minerals.Potassium": 400,
    "Data.Major Minerals.Copper": 0.2,
    "Data.Major Minerals.Iron": 0.3,
    "Data.Major Minerals.Zinc": 1.1
  },
  "Nutrisi makanan yang telah dikonsumsi": {
    "Data.Protein": 3.28,
    "Data.Fat.Total Lipid": 3.2,
    "Data.Fat.Polysaturated Fat": 0.11,
    "Data.Carbohydrate": 4.67,
    "Data.Fiber": 0,
    "Data.Water": 88.1,
    "Data.Vitamins.Vitamin A": 32,
    "Data.Major Minerals.Calcium": 123,
    "Data.Vitamins.Vitamin E": 0.05,
    "Data.Vitamins.Vitamin K": 0.3,
    "Data.Thiamin": 0.06,
    "Data.Riboflavin": 0.14,
    "Data.Niacin": 0.1,
    "Data.Vitamins.Vitamin B6": 0.06,
    "Data.Vitamins.Vitamin B12": 0.54,
    "Data.Choline": 17.8,
    "Data.Vitamins.Vitamin C": 0,
    "Data.Major Minerals.Phosphorus": 101,
    "Data.Major Minerals.Magnesium": 12,
    "Data.Major Minerals.Sodium": 38,
    "Data.Major Minerals.Potassium": 150,
    "Data.Major Minerals.Copper": 0,
    "Data.Major Minerals.Iron": 0,
    "Data.Major Minerals.Zinc": 0.41
  },
  "Selisih nutrisi": {
    "Data.Protein": 5.72,
    "Data.Fat.Total Lipid": 27.8,
    "Data.Fat.Polysaturated Fat": 4.79,
    "Data.Carbohydrate": 54.33,
    "Data.Fiber": 0,
    "Data.Water": 611.9,
    "Data.Vitamins.Vitamin A": 343,
    "Data.Major Minerals.Calcium": 77,
    "Data.Vitamins.Vitamin E": -0.05,
    "Data.Vitamins.Vitamin K": 4.7,
    "Data.Thiamin": 0.14,
    "Data.Riboflavin": 0.16,
    "Data.Niacin": 1.9,
    "Data.Vitamins.Vitamin B6": 0.04,
    "Data.Vitamins.Vitamin B12": -0.14,
    "Data.Choline": 107.2,
    "Data.Vitamins.Vitamin C": 40,
    "Data.Major Minerals.Phosphorus": -1,
    "Data.Major Minerals.Magnesium": 18,
    "Data.Major Minerals.Sodium": 82,
    "Data.Major Minerals.Potassium": 250,
    "Data.Major Minerals.Copper": 0.2,
    "Data.Major Minerals.Iron": 0.3,
    "Data.Major Minerals.Zinc": 0.69
  },
  "Rekomendasi makanan berdasarkan Content-Based Filtering": [
    {
      "Category": "Milk",
      "Description": "Milk, human",
      "Relevance": 0.9997051522832326
    },
    {
      "Category": "Rum",
      "Description": "Rum, hot buttered",
      "Relevance": 0.9992692659491228
    },
    {
      "Category": "Infant formula",
      "Description": "Infant formula, powder, made with baby water (Gerber Good Start Gentle)",
      "Relevance": 0.9990750503629751
    },
    {
      "Category": "Infant formula",
      "Description": "Infant formula, powder, made with baby water (Gerber Good Start Protect)",
      "Relevance": 0.9990750503629751
    },
    {
      "Category": "Infant formula",
      "Description": "Infant formula, liquid concentrate, made with baby water (Gerber Good Start Gentle)",
      "Relevance": 0.9990750503629751
    }
  ]

   ```

## Contributors

| Name                              | Bangkit ID       | Learning Path       | University                                           | Role                         |
|-----------------------------------|------------------|---------------------|-----------------------------------------------------|------------------------------|
| Naufal Hanggara Putra Anwar       | C296B4KY3286     | Cloud Computing     | Universitas Pembangunan Nasional “Veteran” Jawa Timur | Backend Engineer, Cloud Engineer |
| Dika Maulana Putra Pratama        | C296B4KY1127     | Cloud Computing     | Universitas Pembangunan Nasional “Veteran” Jawa Timur | Backend Engineer, Cloud Engineer |

---
Thank you for exploring our repository! If you have any questions or feedback, feel free to reach out.
