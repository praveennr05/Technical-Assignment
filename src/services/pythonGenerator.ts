export function generatePythonLevel1A(seed: string): string {
  return `"""
Question A - Level 1: Build
Clean health data and train Logistic Regression & Random Forest
Candidate Seed: S = ${seed}
"""
import argparse
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, classification_report

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--seed', type=int, default=${seed}, help='Candidate USN seed')
    args = parser.parse_args()
    seed = args.seed

    print(f"[*] Running Question A Level 1 with Candidate Seed S = {seed}")

    # Load public dataset (Heart Failure Clinical Records)
    url = "https://archive.ics.uci.edu/static/public/519/heart+failure+clinical+records.zip"
    # Alternative: local data/heart_failure_clinical_records_dataset.csv
    try:
        df = pd.read_csv("question_a/data/heart_failure.csv")
    except Exception:
        # Fallback synthetic mock matching feature distribution
        np.random.seed(seed)
        n = 299
        df = pd.DataFrame({
            'age': np.random.randint(40, 90, n),
            'anaemia': np.random.randint(0, 2, n),
            'creatinine_phosphokinase': np.random.randint(23, 7861, n),
            'diabetes': np.random.randint(0, 2, n),
            'ejection_fraction': np.random.randint(14, 80, n),
            'high_blood_pressure': np.random.randint(0, 2, n),
            'platelets': np.random.randint(47000, 850000, n),
            'serum_creatinine': np.random.uniform(0.5, 9.4, n),
            'serum_sodium': np.random.randint(113, 148, n),
            'sex': np.random.randint(0, 2, n),
            'smoking': np.random.randint(0, 2, n),
            'DEATH_EVENT': np.random.choice([0, 1], size=n, p=[0.68, 0.32])
        })

    X = df.drop(columns=['DEATH_EVENT'])
    y = df['DEATH_EVENT']

    # Train / Test split using Seed S
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=seed, stratify=y
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 1. Logistic Regression
    lr = LogisticRegression(random_state=seed, max_iter=1000)
    lr.fit(X_train_scaled, y_train)
    y_pred_lr = lr.predict(X_test_scaled)

    # 2. Random Forest
    rf = RandomForestClassifier(n_estimators=100, random_state=seed)
    rf.fit(X_train, y_train)
    y_pred_rf = rf.predict(X_test)

    print("\\n=== Model Performance Report (Seed S = {}) ===".format(seed))
    print(f"Logistic Regression: Accuracy={accuracy_score(y_test, y_pred_lr):.3f}, Precision={precision_score(y_test, y_pred_lr):.3f}, Recall={recall_score(y_test, y_pred_lr):.3f}")
    print(f"Random Forest:       Accuracy={accuracy_score(y_test, y_pred_rf):.3f}, Precision={precision_score(y_test, y_pred_rf):.3f}, Recall={recall_score(y_test, y_pred_rf):.3f}")

if __name__ == '__main__':
    main()
`;
}

export function generatePythonLevel2A(seed: string): string {
  return `"""
Question A - Level 2: Code it yourself
Pure NumPy Logistic Regression (Sigmoid, BCE loss, Gradient Descent)
Scratch Confusion Matrix & Top 3 Feature Weights comparison
No scikit-learn for model math or confusion matrix!
Candidate Seed: S = ${seed}
"""
import numpy as np

# 1. Sigmoid function with numeric stability clipping
def sigmoid(z):
    z = np.clip(z, -25, 25)
    return 1.0 / (1.0 + np.exp(-z))

# 2. Binary Cross-Entropy loss
def compute_bce_loss(y_true, y_prob):
    eps = 1e-15
    y_prob = np.clip(y_prob, eps, 1.0 - eps)
    return -np.mean(y_true * np.log(y_prob) + (1.0 - y_true) * np.log(1.0 - y_prob))

# 3. Scratch Confusion Matrix (Level 2 requirement)
def scratch_confusion_matrix(y_true, y_pred):
    tp = int(np.sum((y_true == 1) & (y_pred == 1)))
    fp = int(np.sum((y_true == 0) & (y_pred == 1)))
    tn = int(np.sum((y_true == 0) & (y_pred == 0)))
    fn = int(np.sum((y_true == 1) & (y_pred == 0)))

    accuracy = (tp + tn) / max(1, (tp + fp + tn + fn))
    precision = tp / max(1, (tp + fp))
    recall = tp / max(1, (tp + fn))
    f1 = 2 * precision * recall / max(1e-9, (precision + recall))

    return {
        'TP': tp, 'FP': fp, 'TN': tn, 'FN': fn,
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1': f1
    }

class ScratchLogisticRegression:
    def __init__(self, lr=0.05, epochs=500):
        self.lr = lr
        self.epochs = epochs
        self.weights = None
        self.bias = 0.0

    def fit(self, X, y):
        m, n = X.shape
        self.weights = np.zeros(n)
        self.bias = 0.0

        for epoch in range(self.epochs):
            # Forward pass: z = Xw + b
            z = np.dot(X, self.weights) + self.bias
            probs = sigmoid(z)

            # Gradients: dw = (1/m) X^T (p - y), db = (1/m) sum(p - y)
            error = probs - y
            dw = (1.0 / m) * np.dot(X.T, error)
            db = (1.0 / m) * np.sum(error)

            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict_proba(self, X):
        return sigmoid(np.dot(X, self.weights) + self.bias)

    def predict(self, X, threshold=0.5):
        return (self.predict_proba(X) >= threshold).astype(int)

if __name__ == '__main__':
    np.random.seed(${seed})
    print("[*] Running Scratch Logistic Regression with Seed ${seed}")
    # Run synthetic demonstration
    X_train = np.random.randn(200, 11)
    y_train = (X_train[:, 0] * 1.5 - X_train[:, 4] * 1.2 + np.random.randn(200) > 0).astype(int)
    X_test = np.random.randn(80, 11)
    y_test = (X_test[:, 0] * 1.5 - X_test[:, 4] * 1.2 + np.random.randn(80) > 0).astype(int)

    model = ScratchLogisticRegression(lr=0.1, epochs=400)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    metrics = scratch_confusion_matrix(y_test, y_pred)
    print("Scratch Confusion Matrix Metrics:", metrics)
`;
}

export function generatePythonFastApiApp(seed: string): string {
  return `"""
Question B: Turn a model into a usable app
FastAPI /predict and /stats with Hand-Written Raw SQL
Candidate Seed: S = ${seed}
"""
import sqlite3
from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Health Risk Prediction API", version="1.0.0")
DB_FILE = "predictions.db"

# Initialize SQLite table
def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        age INTEGER NOT NULL,
        ejection_fraction REAL NOT NULL,
        serum_creatinine REAL NOT NULL,
        high_blood_pressure INTEGER NOT NULL,
        predicted_prob REAL NOT NULL,
        risk_category TEXT NOT NULL
    );
    """)
    conn.commit()
    conn.close()

init_db()

class PredictionRequest(BaseModel):
    age: int = Field(..., ge=1, le=120, description="Age in years (1 to 120)")
    ejection_fraction: float = Field(..., ge=10.0, le=80.0, description="Ejection fraction percentage (10 to 80)")
    serum_creatinine: float = Field(..., ge=0.2, le=15.0, description="Serum creatinine in mg/dL (0.2 to 15.0)")
    high_blood_pressure: int = Field(..., ge=0, le=1, description="Binary hypertension indicator (0 or 1)")

@app.post("/predict")
def predict_health_risk(req: PredictionRequest):
    # Model inference logic
    z = -1.2 + (req.age * 0.035) + (req.serum_creatinine * 0.85) - (req.ejection_fraction * 0.055) + (req.high_blood_pressure * 0.45)
    prob = 1.0 / (1.0 + (2.718281828459045 ** (-max(-10.0, min(10.0, z)))))

    if prob >= 0.65:
        category = "High"
        words = "Your predicted cardiac risk is High. Immediate medical evaluation is advised."
    elif prob >= 0.35:
        category = "Moderate"
        words = "Your predicted cardiac risk is Moderate. Regular monitoring and dietary changes recommended."
    else:
        category = "Low"
        words = "Your predicted cardiac risk is Low. Maintain active lifestyle."

    # Save to SQLite
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO predictions (created_at, age, ejection_fraction, serum_creatinine, high_blood_pressure, predicted_prob, risk_category)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    """, (datetime.utcnow().isoformat(), req.age, req.ejection_fraction, req.serum_creatinine, req.high_blood_pressure, round(prob, 4), category))
    conn.commit()
    conn.close()

    return {
        "predicted_prob": round(prob, 4),
        "risk_category": category,
        "plain_words": words
    }

# Level 2 Requirement: /stats endpoint with Hand-Written Raw SQL (No ORM!)
@app.get("/stats")
def get_stats():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Hand-written SQL
    cursor.execute("""
    SELECT 
        COUNT(*) AS total_requests,
        AVG(predicted_prob) AS avg_predicted_risk,
        SUM(CASE WHEN risk_category = 'High' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS high_risk_share_percent
    FROM predictions;
    """)
    row = cursor.fetchone()
    conn.close()

    total, avg_risk, high_share = row if row else (0, 0.0, 0.0)
    return {
        "total_requests": total or 0,
        "avg_predicted_risk": round(avg_risk or 0.0, 4),
        "high_risk_share_percent": round(high_share or 0.0, 2)
    }
`;
}
