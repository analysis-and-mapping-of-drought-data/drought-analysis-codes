from flask import Flask, request, jsonify
import openai
import requests
import pandas as pd
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

app = Flask(__name__)

apiKey = "***************************"
openai.api_key = apiKey

data = []

@app.route("/chat", methods=["GET"])
def askChat():

    data = request.args.get("question")

    response = openai.Completion.create(
        engine="gpt-3.5-turbo-0613",
        prompt=data,
        max_tokens=50
    )

    return jsonify({response:response.choices[0].text})


@app.route("/ml", methods=["GET"])
def ml():
    try:

        baraj_adi = request.args.get("baraj_adi")

        response = requests.get(f'http://localhost:3001/baraj/year/{baraj_adi}')

        global data
        data = response.json()

        df = pd.DataFrame(data)

        csv_data = df.to_csv(index=False)
        file_exists = os.path.isfile(f'{baraj_adi}.csv')

        if not file_exists:
            with open(f'{baraj_adi}.csv', 'w') as file:
                file.write(csv_data)

        df = pd.read_csv(f'{baraj_adi}.csv')

        #X = df.drop(['baraj_adi'], axis=1)
        X = df.iloc[0, 1:7].values
        y = df.iloc[0, 7:13].values

        y = pd.DataFrame(y)
        X = pd.DataFrame(X)
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=0)

        model = LinearRegression()

        model.fit(X_train, y_train)

        y_pred = model.predict(X_test)
        print(y)
        return jsonify({"basarili"})

    except requests.exceptions.RequestException as e:
        # Handle request exceptions
        return jsonify({"error": str(e)})

    except Exception as e:
        # Handle other exceptions
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(port=6007)