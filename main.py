import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from tensorflow.keras.models import load_model
from tensorflow.keras.losses import MeanSquaredError
from typing import List

# Load datasets
akg_bayi_df = pd.read_csv('https://raw.githubusercontent.com/Nourish-Path/MachineLearning/refs/heads/main/Dataset/AKG-bayi.csv')
food_check_df = pd.read_csv('https://raw.githubusercontent.com/Nourish-Path/MachineLearning/refs/heads/main/Dataset/food-check.csv')

# Initialize FastAPI app
app = FastAPI()

# Normalize scaler for data
scaler = MinMaxScaler()

# Load pre-trained model
model = load_model('nutrition_recommendation_model.h5', custom_objects={'mse': MeanSquaredError()})

# Define request models
class FoodInput(BaseModel):
    category: str
    description: str
    amount: float  # Amount of the food (e.g., grams)

class NutrientInput(BaseModel):
    age: int
    total_foods: int  # Total number of food entries
    foods: List[FoodInput]  # List of food items

# Endpoint for home
@app.get("/")
async def home():
    return {"message": "Welcome to API Cek Nutrition and Recommendation"}

# Endpoint for nutrition recommendation
@app.post("/recommend")
async def recommend_food(input_data: NutrientInput):
    # Extract input data
    age = input_data.age
    foods = input_data.foods  # List of FoodInput
    total_foods = input_data.total_foods

    # Validate the number of food items provided
    if len(foods) != total_foods:
        raise HTTPException(
            status_code=400,
            detail=f"You must provide {total_foods} food items. Provided {len(foods)}."
        )

    # Filter data for the specified age
    akg_bayi_filtered = akg_bayi_df[akg_bayi_df['age'] == age]
    if akg_bayi_filtered.empty:
        raise HTTPException(status_code=404, detail="Data not found for the provided age")

    # Prepare food data
    selected_foods = []
    for food in foods:
        food_category = food.category
        food_description = food.description
        food_amount = food.amount

        food_check_filtered = food_check_df[
            (food_check_df['Category'] == food_category) &
            (food_check_df['Description'] == food_description)
        ]

        if food_check_filtered.empty:
            raise HTTPException(
                status_code=404,
                detail=f"Food not found for category '{food_category}' with description '{food_description}'"
            )

        # Adjust the nutrient values based on the provided amount
        food_check_filtered = food_check_filtered.copy()
        for col in food_check_filtered.columns:
            if col not in ['Category', 'Description']:
                food_check_filtered[col] *= (food_amount / 100.0)

        # Add the filtered food to the list
        selected_foods.append(food_check_filtered)

    # Combine selected foods into one DataFrame
    food_check_filtered_combined = pd.concat(selected_foods)

    # Align column names for common nutrition metrics
    common_columns = [col for col in akg_bayi_filtered.columns if col in food_check_filtered_combined.columns and col != 'age']
    if not common_columns:
        raise HTTPException(status_code=400, detail="No matching nutrition columns found")

    akg_bayi_filtered = akg_bayi_filtered[common_columns]
    food_check_filtered_combined = food_check_filtered_combined[common_columns]

    # Calculate nutrient differences
    required_nutrients = akg_bayi_filtered.iloc[0].round(2).to_dict()
    consumed_nutrients = food_check_filtered_combined.sum().round(2).to_dict()
    nutrient_differences = {key: round(required_nutrients[key] - consumed_nutrients.get(key, 0), 2) for key in required_nutrients}

    # Normalize data
    normalized_food_data = pd.DataFrame(scaler.fit_transform(food_check_df[common_columns]), columns=common_columns)
    normalized_nutrient_diff = scaler.transform(pd.DataFrame([nutrient_differences.values()], columns=nutrient_differences.keys()))

    # Predict nutrient differences
    nutrient_predictions = model.predict(normalized_food_data.values)

    # Calculate cosine similarity
    similarities = cosine_similarity(normalized_nutrient_diff, normalized_food_data)

    # Add similarity scores
    food_check_df['Relevance'] = similarities.flatten()

    # Recommend top N foods
    top_n = 5
    recommended_foods = food_check_df.sort_values(by='Relevance', ascending=False).head(top_n)

    # Format recommendations
    recommendations = recommended_foods[['Category', 'Description', 'Relevance']].to_dict(orient='records')

    # Format the output for better readability
    formatted_response = {
        "Nutrisi yang harus dipenuhi": required_nutrients,
        "Nutrisi makanan yang telah dikonsumsi": consumed_nutrients,
        "Selisih nutrisi": nutrient_differences,
        "Rekomendasi makanan berdasarkan Content-Based Filtering": recommendations
    }

    return formatted_response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
