"""
Question A - Level 2: Code it yourself
Pure NumPy Logistic Regression (Sigmoid, BCE loss, Gradient Descent)
Scratch Confusion Matrix & Top 3 Feature Weights comparison
No scikit-learn for model math or confusion matrix!
Candidate Seed: S = 1042
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
    np.random.seed(1042)
    print("[*] Running Scratch Logistic Regression with Seed 1042")
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
