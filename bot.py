import requests

API_ENDPOINT = 'https://api.wit.ai/message'
WIT_ACCESS_TOKEN = 'DJP3NJSD236J77UO3MFXPROK2RRJ2A6G'

headers = {'Authorization': 'Bearer {}'.format(WIT_ACCESS_TOKEN)}
query = {'q': 'Hi'}

resp = requests.get(API_ENDPOINT, headers=headers, params=query)
data = resp.json()

print(data)
