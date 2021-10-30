#imports
import time
import flask
import yfinance as yf
import json

#create object of Flask
app = flask.Flask(__name__)

#create route limited to get requests
@app.route('/', methods = ['GET'])
#func http root
def httproot():
    #return string
    return 'Flask http server is up and running.'

#create route limited to get requests
@app.route('/time', methods = ['GET'])
#func http /time
def get_current_time():
    #returns time value as json
    return {'time': time.time()}

#create route limited to get requests, capture inputform string after "/stock/*"
@app.route('/stock/<string:inputform>', methods = ['GET'])
#func http /stock
def get_stock_price(inputform):
    stock = yf.Ticker(inputform)
    #fetch price through yahoo finance
    price = stock.info['regularMarketPrice']
    return json.dumps(price)

#init main
if __name__ == '__main__':
    app.run(debug=True)
