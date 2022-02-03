import pandas as pd
from flask import Flask, send_from_directory
from flask_cors import CORS

# import the csv file
words = pd.read_csv("wordList.csv", header=None)

# add spaced between the letters of the words
spaced = pd.DataFrame()
spaced[0] = words[0]
for i in range(words.count()[0]):
    spaced[0][i] = " ".join(spaced[0][i]).lower()

# create a dataframe where each letter is in their own column
letters = spaced[0].str.split(" ", n=4, expand=True)

# find_word function


def find_word(first="", second="", third="", fourth="", fifth="", present=None, absent=None):

    query = letters  # query to narrow down

    # if there are letters in "present", then narrow the query by taking words that include those letters.
    if present != None:
        for i in present:
            query = query[(query[0] == i) | (query[1] == i) | (
                query[2] == i) | (query[3] == i) | (query[4] == i)]

    # if there are letters in "absent", exclude words that include those letters from the query
    if absent != None:
        for i in absent:
            query = query[(query[0] != i) & (query[1] != i) & (
                query[2] != i) & (query[3] != i) & (query[4] != i)]

    # now work on each position
    pos = [first, second, third, fourth, fifth]

    current_pos = 0  # index of current position

    # for each position
    for p in pos:
        # if there are letters passed to the position,
        if len(p) >= 1:
            # create a subquery
            subquery = pd.DataFrame()
            # for each letter passed into the position, query the words and concatenate with the subquery of previous letters
            for i in p:
                subquery = pd.concat(
                    [subquery, query[query[current_pos] == i]])
            # update the query
            query = subquery.copy()
        current_pos += 1

    # reset the index and return the query
    return query.reset_index(drop=True)


app = Flask(__name__)
CORS(app)


@app.route("/", methods=['GET'])
def hello_world():
    return send_from_directory('', 'index.html')


@app.route("/script.js", methods=['GET'])
def send_script():
    return send_from_directory('', 'script.js')


@app.route("/find/<string:clues>", methods=['GET'])
def word_finder(clues):
    clues_arr = clues.split(',')
    first_letters = clues_arr[0]
    second_letters = clues_arr[1]
    third_letters = clues_arr[2]
    fourth_letters = clues_arr[3]
    fifth_letters = clues_arr[4]
    present_letters = clues_arr[5]
    absent_letters = clues_arr[6]

# p,,r,,,ery,adiusnotlmh
    result = find_word(first=first_letters, second=second_letters, third=third_letters,
                       fourth=fourth_letters, fifth=fifth_letters, present=present_letters, absent=absent_letters)
    np_arr = result.to_numpy()
    result_arr = []
    for word in np_arr:
        result_arr.append("".join(word))

    response = {"result": result_arr}
    print(response)
    return response, 200
