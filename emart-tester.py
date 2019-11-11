import os
import requests
import json
import pprint

# Dummy values
PERSON_NAMES = [
    "Guruvaran Z.", "Ranesh O.", "Nandagopal R.", "Sukreevan O.", "Pargavan M.", "Kethesan U.", "Branan W.", "Jeeva A.", "Enthayen E.", "Ilamvaluthi U.", "Vasee Y.", "Jasothan V.", "Subajan E.", "Vaengayen B.", "Madhurangan M.", "Thanayanthan R.", "Oormilan Z.", "Akshay K.", "Vikunthan G.", "Kiash O.", "Kishori U.", "Keetha R.", "Javaani T.", "Pallawi V.", "Nimaalini A.", "Shalinii H.", "Shurabi T.", "Luxmie B.", "Ireena B.", "Sinthika M."]

CITY_NAMES = [
    "Ganpatan", "Sewtaken", "Khuirand", "Larsehra", "Periyagundi", "Shishbag", "Ganhala", "Suriyawana", "Kamabagar", "Ramlamai", "Barigura", "Khahet", "Villinfushi", "Mimeedhoo", "Barnakha", "Pabling"
]

PIN_CODES = [
    "641035", "641006", "641012", "641019", "641049", "641030", "641004", "641201"
]
# Utilities
def prGreen(skk): print("\033[92m {}\033[00m" .format(skk))


def prRed(skk): print("\033[91m {}\033[00m" .format(skk))


def cls():
    os.system('cls' if os.name == 'nt' else 'clear')


# Globals
BASE_URL = 'http://cezhop.herokuapp.com/graphql'
ADMIN_TOKEN = ''


def run_query(query=None, token=None):
    assert (query is not None), 'Query is not provided'
    query = {'query': '{' + query + "}"}
    if(token is None):
        result = requests.post(url=BASE_URL, json=query)
    else:
        result = requests.post(url=BASE_URL, json=query, headers={
                               'Authorization': f'Bearer {token}'})
    return json.loads(result.text)


def run_mutation(mutation=None, token=None):
    assert (mutation is not None), 'Mutation is not provided'
    mutation = {'query': 'mutation {' + mutation + "}"}
    if(token is None):
        result = requests.post(url=BASE_URL, json=mutation)
    else:
        result = requests.post(url=BASE_URL, json=mutation, headers={
                               'Authorization': f'Bearer {token}'})
    return result.text


def vendor_login_mutation(phoneNumber=None, password=None):
    assert phoneNumber is not None, 'Phone Number is not provided'
    assert password is not None, 'Password is not provided'
    login = f'''
    vendorLogin(phoneNumber: "{phoneNumber}" password:"{password}") {{
        user {{
            id 
            name 
            storeName
            fcmToken
        }}
        jwtToken
    error {{
        path
        message
    }}
    }}
    '''
    result = run_mutation(mutation=login)
    result = json.loads(result)
    result = result['data']['vendorLogin']
    if(result.get('error') is not None):
        prRed('🚫 ERROR WHILE LOGIN 🚫')
        print('You provided:', phoneNumber, password)
        pprint.pprint(result.get('error'))
        return
    else:
        print('✔️ Logged in successfully ✔️')
        pprint.pprint(result)
        return result


def main():
    print('🚀 Starting the tool, please wait...')
    ADMIN_TOKEN = vendor_login_mutation(
        phoneNumber='123456', password='123456').get('jwtToken')
    print('JWT for admin:', ADMIN_TOKEN)
    cls()
    prGreen('✔️ Logged in successfully as ADMIN ✔️')


main()
