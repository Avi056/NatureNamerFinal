from flask import Flask, render_template, request
import subprocess
import newesttester
from newesttester import dothething
import requests

app = Flask(__name__)


@app.route('/')
def home():
    # return render_template('index.html')
    return render_template('index.html')
# def run_script():
#     result = subprocess.check_output(['python', 'newesttester.py'])
#     print(result)
#     return result

# @app.route('/process-image', methods=['POST'])
# def process_image():
#     render_template('index.html')
@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    filename = file.filename
    result = dothething(filename)
    return render_template('result.html', result=result)

if __name__ == '__main__':
    app.run(port=4000)