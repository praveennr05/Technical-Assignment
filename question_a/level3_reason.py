"""
Question A - Level 3: Reason with your results
Decision threshold sweep to find Recall >= 0.90
Candidate Seed: S = 1042
"""
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import recall_score, precision_score, accuracy_score

# Load data and run threshold sweep
try:
    df = pd.read_csv('https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv')
    X = df.drop(columns=['DEATH_EVENT', 'time'], errors='ignore')
    y = df['DEATH_EVENT']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1042, stratify=y)
    scaler = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)
    X_test_s = scaler.transform(X_test)
    
    # Train Logistic Regression
    from sklearn.linear_model import LogisticRegression
    lr = LogisticRegression(random_state=1042, max_iter=1000)
    lr.fit(X_train_s, y_train)
    probs = lr.predict_proba(X_test_s)[:, 1]
    
    print('=== Level 3 Decision Threshold Sweep ===')
    for t in np.linspace(0.15, 0.70, 12):
        preds = (probs >= t).astype(int)
        r = recall_score(y_test, preds, zero_division=0)
        p = precision_score(y_test, preds, zero_division=0)
        a = accuracy_score(y_test, preds)
        flag = ' <-- TARGET REACHED (Recall >= 0.90)' if r >= 0.90 and (r - 0.90) < 0.08 else ''
        print(f'Threshold tau={t:.2f} | Recall={r*100:.1f}% | Precision={p*100:.1f}% | Accuracy={a*100:.1f}%{flag}')
except Exception as e:
    print('Error running sweep:', e)
