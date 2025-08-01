import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

df = pd.read_csv("./datasets/dataset.csv")

y = df['Safety score']

categorical_cols = df.select_dtypes(include=['object']).columns.tolist()

X_full = df.drop(columns=['Safety score'])

X_full = pd.get_dummies(X_full, columns=categorical_cols, drop_first=True)

# Model 1: Train using only Latitude & Longitude
X_coords = df[['Latitude', 'Longitude']]
X_train_c, X_test_c, y_train_c, y_test_c = train_test_split(X_coords, y, test_size=0.2, random_state=42)

model_coords = RandomForestRegressor(n_estimators=100, random_state=42)
model_coords.fit(X_train_c, y_train_c)

# Model 2: Train using all 9 features (after encoding)
X_train_f, X_test_f, y_train_f, y_test_f = train_test_split(X_full, y, test_size=0.2, random_state=42)

model_full = RandomForestRegressor(n_estimators=100, random_state=42)
model_full.fit(X_train_f, y_train_f)

with open("model_coords.pkl", "wb") as f:
    pickle.dump(model_coords, f)

with open("model_full.pkl", "wb") as f:
    pickle.dump(model_full, f)

print("✅ Both models trained & saved: 'model_coords.pkl' (coords only) & 'model_full.pkl' (all features)")
