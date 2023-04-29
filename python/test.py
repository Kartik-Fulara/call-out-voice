# add.py

import json

def add_numbers(a, b):
    return a + b

# Read input data from standard input
input_data = json.loads(input())

# Call the add_numbers function with the input data
result = add_numbers(input_data['a'], input_data['b'])

# Write the result to standard output
print(json.dumps(result))
