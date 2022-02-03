import pandas as pd

# import the csv file
words = pd.read_csv("wordList.csv", header = None)

# add spaced between the letters of the words
spaced = pd.DataFrame()
spaced[0] = words[0]
for i in range(words.count()[0]): 
  spaced[0][i] = " ".join(spaced[0][i]).lower()

# create a dataframe where each letter is in their own column
letters = spaced[0].str.split(" ", n=4, expand = True)

# find_word function
def find_word(first="", second="", third="", fourth="", fifth="", present=None, absent=None):
    
    query = letters # query to narrow down
    
    # if there are letters in "present", then narrow the query by taking words that include those letters.
    if present != None:
        for i in present:
            query = query[(query[0]==i) | (query[1]==i) | (query[2]==i) | (query[3]==i) | (query[4]==i)]
            
    # if there are letters in "absent", exclude words that include those letters from the query
    if absent != None:
        for i in absent:
            query = query[(query[0]!=i) & (query[1]!=i) & (query[2]!=i) & (query[3]!=i) & (query[4]!=i)]
    
    # now work on each position
    pos = [first, second, third, fourth, fifth]
    
    current_pos = 0 # index of current position
    
    # for each position 
    for p in pos:
        # if there are letters passed to the position,
        if len(p)>= 1: 
            # create a subquery
            subquery = pd.DataFrame()
            # for each letter passed into the position, query the words and concatenate with the subquery of previous letters
            for i in p:
                subquery = pd.concat([subquery,query[query[current_pos]==i]])
            #update the query
            query = subquery.copy()
        current_pos += 1
        
    # reset the index and return the query 
    return query.reset_index(drop=True)

print(find_word())