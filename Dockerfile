# Gunakan Python 3.10 sebagai base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONUNBUFFERED True
ENV PORT 8080

# Tentukan working directory di dalam container
WORKDIR /app

# Salin semua file proyek ke dalam container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8080 untuk FastAPI
EXPOSE 8080

# Jalankan aplikasi dengan Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
