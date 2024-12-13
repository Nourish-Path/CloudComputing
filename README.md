# Stunting Prevention Application - Cloud Computing Infrastructure

This repository contains the cloud infrastructure and API implementations for the Stunting Prevention Application, developed by the Cloud Computing team. It comprises three branches, each dedicated to a specific API function to ensure modularity and scalability.

## GCP Architecture
![Cloud Architecture](https://github.com/Nourish-Path/CloudComputing/blob/main/Cloud%20Architecture.png)

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



## Contributors

| Name                              | Bangkit ID       | Learning Path       | University                                           | Role                         |
|-----------------------------------|------------------|---------------------|-----------------------------------------------------|------------------------------|
| Naufal Hanggara Putra Anwar       | C296B4KY3286     | Cloud Computing     | Universitas Pembangunan Nasional “Veteran” Jawa Timur | Backend Engineer, Cloud Engineer |
| Dika Maulana Putra Pratama        | C296B4KY1127     | Cloud Computing     | Universitas Pembangunan Nasional “Veteran” Jawa Timur | Backend Engineer, Cloud Engineer |

---
Thank you for exploring our repository! If you have any questions or feedback, feel free to reach out.
