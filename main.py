import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
from tensorflow.keras.models import load_model

# Inisialisasi aplikasi FastAPI
app = FastAPI()

# Load the dataset from CSV
data_path = "data/check-stunting.csv"  # Pastikan path ini benar
df = pd.read_csv(data_path)

# Load the pre-trained model dari .h5
model_path = "model.h5"  # Pastikan path ini benar
try:
    model = load_model(model_path)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Schema untuk request body untuk cek stunting
class StuntingRequest(BaseModel):
    age: int
    weight: float
    height: float

# Fungsi untuk mengecek stunting berdasarkan dataset referensi
def check_stunting(weight, height, age, df):
    row = df[df['age'] == age]
    if row.empty:
        raise HTTPException(status_code=404, detail="Age group not found")
    
    # Assuming the dataset has a direct mapping from 'age' to weight and height limits
    row = row.iloc[0]  # Get the first matching row
    if weight < row['weight.min'] or weight > row['weight.max'] or height < row['height.min'] or height > row['height.max']:
        return 'Stunting'
    else:
        return 'Normal'

# Endpoint root
@app.get("/")
def read_root():
    return {"message": "Welcome to the Stunting Prediction API"}

# Endpoint untuk cek stunting
@app.post("/check_stunting/")  # POST method
def check_stunting_endpoint(request: StuntingRequest):
    print(f"Received data: {request}")
    
    # Cek stunting berdasarkan dataset 
    stunting_status = check_stunting(request.weight, request.height, request.age, df)
    
    # Logika untuk model prediksi stunting
    if stunting_status == "Stunting":
        model_status = [1]  # Terindikasi stunting
    else:
        model_status = [0]  # Tidak terindikasi stunting
    
    return {
        "stunting_status": stunting_status,  # Dari dataset 
        "model_prediction": model_status  # Prediksi berdasarkan logika sederhana
    }