import pandas as pd

def load_and_clean_data(file_path):
    df = pd.read_csv(file_path)

    print("Dataset Columns:", df.columns.tolist())

    df = df.drop_duplicates()
    df = df.dropna()

    return df

if __name__ == "__main__":
    dataset = load_and_clean_data("./datasets/dataset.csv")
    print("Cleaned dataset preview:\n", dataset.head())
