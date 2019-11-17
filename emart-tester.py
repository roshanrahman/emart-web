import os
import requests
import json
import pprint
import random
import string

# Dummy values
PERSON_NAMES = [
    "Guruvaran Z.", "Ranesh O.", "Nandagopal R.", "Sukreevan O.", "Pargavan M.", "Kethesan U.", "Branan W.", "Jeeva A.", "Enthayen E.", "Ilamvaluthi U.", "Vasee Y.", "Jasothan V.", "Subajan E.", "Vaengayen B.", "Madhurangan M.", "Thanayanthan R.", "Oormilan Z.", "Akshay K.", "Vikunthan G.", "Kiash O.", "Kishori U.", "Keetha R.", "Javaani T.", "Pallawi V.", "Nimaalini A.", "Shalinii H.", "Shurabi T.", "Luxmie B.", "Ireena B.", "Sinthika M."]

CITY_NAMES = [
    "Ganpatan", "Sewtaken", "Khuirand", "Larsehra", "Periyagundi", "Shishbag", "Ganhala", "Suriyawana", "Kamabagar", "Ramlamai", "Barigura", "Khahet", "Villinfushi", "Mimeedhoo", "Barnakha", "Pabling"
]

PIN_CODES = [
    "641035", "641006", "641012", "641019", "641049", "641030", "641004", "641201"
]

STORE_NAMES = [
    "The Shaking Carpet", "The Ordinary Crate", "The Corrupted Dwarf", "The Blushing Screen", "The Groaning Crow Wand Store", "The Angelic Oven Saddler", "The Confused Tower Clothing Store", "The Precious Shawl Pawn Store", "Relish the Thought", "Carpe Donut", "The Humming Jug", "The SandyStove", "The Silly Cow", "The Mushy Phone", "The Running Elf Repairs", "The Small Stone Market", "The Talking Door Florist", "The Ironclad Cake Guns 'n Ammo", "Law In Order", "Men At Work"
]

DESCRIPTIONS = [
    "Affronting everything discretion men now own did. Still round match we to. Frankness pronounce daughters remainder extensive has but. Happiness cordially one determine concluded fat.Plenty season beyond by hardly giving of. Consulted or acuteness dejection an smallness if.Outward general passage another as it. Very his are come man walk one next. Delighted prevailed supported too not remainder perpetual who furnished. Nay affronting bed projection compliment instrument. ", "By in no ecstatic wondered disposal my speaking. Direct wholly valley or uneasy it at really. Sir wish like said dull and need make. Sportsman one bed departure rapturous situation disposing his. Off say yet ample ten ought hence. Depending in newspaper an september do existence strangers. Total great saw water had mirth happy new. Projecting pianoforte no of partiality is on. Nay besides joy society him totally six. ", "Mr oh winding it enjoyed by between. The servants securing material goodness her. Saw principles themselves ten are possession. So endeavor to continue cheerful doubtful we to. Turned advice the setvanity why mutual. Reasonably if conviction on be unsatiable discretion apartments delightful. Are melancholy appearance stimulated occasional entreaties end. Shy ham had esteem happen active county. Winding morning am shyness evident to. Garrets because elderly new manners however one village she. ", "Lose eyes get fat shew. Winter can indeed letter oppose way change tended now. So is improve my charmed picture exposed adapted demands. Received had end produced prepared diverted strictly off man branched. Known ye money so large decay voice there to. Preserved be mr cordially incommode as an. He doors quick child an point at. Had sharevexed front least style off why him. ", "Style never met and those among great. At no or september sportsmen he perfectly happiness attending. Depending listening delivered off new sheprocuring satisfied sex existence. Person plenty answer to exeter it if. Law use assistanceespecially resolution cultivated did out sentiments unsatiable. Way necessary had intentionhappiness but september delighted his curiosity. Furniture furnished or on strangers neglected remainder engrossed. ", "Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behaviour arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance amnorthward. Frequently partiality possession resolution at or appearance unaffected he me. Engaged its was evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began of cause an scale. Subjects he prospect elegance followed no overcame possible it on. ", "Drawings me opinions returned absolute in. Otherwise therefore sex did are unfeeling something. Certain be ye amiable by exposed so. To celebrated estimating excellence do. Coming either suffer living her gay theirs. Furnished do otherwise daughters contented conveying attempted no. Was yet general visitor present hundred too brother fat arrival. Friend are day own either lively new. ", "Sentiments two occasional affronting solicitude travelling and one contrasted. Fortune day out married parties. Happiness remainder joy but earnestly for off. Took sold add play may none him few. If as increasing contrasted entreaties be. Now summer who day looked our behind moment coming. Pain son rose more park way that. An stairs as be lovers uneasy. ", "Necessary ye contented newspaper zealously breakfast he prevailed. Melancholy middletons yet understood decisively boy law she. Answer him easily are its barton little. Oh no though mother be things simple itself. Dashwood horrible he strictly on as. Home fine in so am good body this hope. ", "Spoke as as other again ye. Hard on to roof he drew. So sell side ye in mr evil. Longer waited mr of nature seemed. Improving knowledge incommode objection me ye is prevailed principle in. Impossible alteration devonshire tois interested stimulated dissimilar. To matter esteem polite do if. "
]
CATEGORIES = [
    "Mobile Phones", "Televisions", "Headphones", "Gaming Consoles", "Cameras", "DSLR Cameras", "Speakers", "Musical Instruments", "Refridgerators", "Washing Machines", "Air Conditioners", "Laptops", "Desktop Computers", "Cases and Covers", "Screen Protectors", "Power Banks", "Tablets", "Software", "Smart Home Devices", "Drives and Storage", "Printers"
]
BIG_IMAGE_URL = 'https://picsum.photos/1200/1200'
PANCARD_STRING = '[\\"https://picsum.photos/1200/1200\\", \\"https://picsum.photos/1200/1200\\"]'
SMALL_IMAGE_URL = 'https://picsum.photos/300'

# Utilities


def prGreen(skk): print("\033[92m {}\033[00m" .format(skk))


def prRed(skk): print("\033[91m {}\033[00m" .format(skk))


def prYellow(skk): print("\033[93m {}\033[00m" .format(skk))


def cls():
    os.system('cls' if os.name == 'nt' else 'clear')


def randomword(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))


# Globals
BASE_URL = 'http://cezhop.herokuapp.com/graphql'


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
                               'authorization': f'Bearer {token}'})
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


def create_vendor_mutation(phoneNumber=None):
    mutation = f'''
    createVendor(
        email: "{randomword(8)}@{randomword(5)}.com"
        password: "123456"
        phoneNumber: "{phoneNumber}"
        storeName: "{random.choice(STORE_NAMES)}"
        paytmName: "{random.choice(PERSON_NAMES)}"
        paytmNumber: "{phoneNumber}"
        shopPhotoUrl: "{BIG_IMAGE_URL}"
        address: {{
            name: "{random.choice(STORE_NAMES)}"
            addressLine: "{randomword(36)}"
            landmark:  "{randomword(16)}"
            city: "{random.choice(CITY_NAMES)}"
            phoneNumber: "{phoneNumber}"
            pinCode: "{random.choice(PIN_CODES)}"
        }}
        bankAccountIFSC: "{randomword(16)}"
        vendorGSTNumber: "{randomword(16)}"
        bankAccountName: "{randomword(16)}"
        pancardPhotoUrls: "{PANCARD_STRING}"
        bankAccountNumber: "{randomword(16)}"
        alternativePhone1: "{random.randint(1234567890,9999999999)}"
        alternativePhone2: "{random.randint(1234567890,9999999999)}"
        ) {{
            user {{
                id
                phoneNumber
            }}
            jwtToken
            error {{
                message
            }}
        }}
    '''
    result = run_mutation(mutation=mutation)
    print(result)
    result = json.loads(result)
    result = result['data']['createVendor']
    if(result.get('error') is not None):
        prRed('🚫 Error during mutation, failed task. 🚫')
        pprint.pprint(result.get('error'))
        return
    else:
        print('✔️ Created vendor successfully ✔️')
        pprint.pprint(result)
        prYellow('Do you want to approve this newly created vendor?')
        user_option = input('Y/N : ')
        if(user_option == 'y' or user_option == 'Y'):
            vendorId = result.get('user').get('id')
            mutation = f'''
            updateVendorAccount(
                vendorId:"{vendorId}"
                approved: true
            ) {{
                error {{
                    message
                }}
            }}
            '''
            result = run_mutation(mutation=mutation, token=ADMIN_TOKEN)
            print(result)
            result = json.loads(result)
            result = result['data']['updateVendorAccount']
            if(result.get('error') is not None):
                prRed('🚫 Error during mutation, failed task. 🚫')
                pprint.pprint(result.get('error'))
                return
            else:
                print('✔️ Approved successfully ✔️')
                pprint.pprint(result)


def print_all_vendors():
    print('🚀 Running query...')
    query = '''
    getAllVendors {
        id 
        name 
        phoneNumber 
        address
        email 
        fcmToken 
        storeName 
        blocked 
        approved 
        amountToPay 

    }
    '''
    result = run_query(query=query, token=ADMIN_TOKEN)
    cls()
    vendors = result.get('data').get('getAllVendors')
    print(
        'id', '\t', 'store name', '\t', 'phone number'
    )
    for vendor in vendors:
        pprint.pprint(vendor)
        print()


def create_new_vendors():
    cls()
    prYellow('Create new vendors')
    print('===================')
    prYellow('This will create vendors with random data')
    prYellow('The password will remain the same however: 123456')
    print('Enter a phone number and the vendor will be created if does not exist.')
    prRed('To stop, type q or press Enter')
    print('===================')
    user_selection = 'hello'
    while True:
        user_selection = input('Enter a phone number: ')
        if(user_selection == 'q' or user_selection == ''):
            return
        create_vendor_mutation(phoneNumber=user_selection)


def add_inventory():
    cls()
    prYellow('Add new inventory')
    print('===================')
    prYellow(
        'This will create randomly generated inventory items to randomly selected vendors')
    print('===================')
    user_selection = input('Enter the no. of items you want to create: ')
    try:
        int(user_selection)
    except:
        print('Wrong input, assuming 10')
        user_selection = '10'
    counter = 0
    query = '''
    getAllVendors {
        id 
        name 
        phoneNumber 
        address
        email 
        fcmToken 
        storeName 
        blocked 
        approved 
        amountToPay 

    }
    '''
    result = run_query(query=query, token=ADMIN_TOKEN)
    vendors = result.get('data').get('getAllVendors')
    vendor_id_list = []
    for vendor in vendors:
        vendor_id_list.append(vendor.get('phoneNumber'))
    vendor_token = vendor_login_mutation(
        phoneNumber='7708898349', password='123456').get('jwtToken')
    while(counter < int(user_selection)):
        add_mutation = f'''
        addNewInventory(
            name: "{randomword(16)} - Variant: {randomword(16)} - Edition: {randomword(16)} by {randomword(16)}"
        height:{random.randint(1,100)}
        length:{random.randint(1,100)}
        inStock:{random.randint(1,100)}
        breadth:{random.randint(1,100)}
        category:"{random.choice(CATEGORIES)}"
        imageUrl:"{PANCARD_STRING}"
        sellingPrice: {random.randint(300,1000)}
        originalPrice: {random.randint(1001,10000)}
        description: "{random.choice(DESCRIPTIONS)}"
        ){{
            error {{
                message
            }}
        }}
        '''
        counter += 1
        result = run_mutation(mutation=add_mutation, token=vendor_token)
        print(result)


def show_admin_interface():
    print('======================')
    print('Admin Actions')
    print()
    print('1. Print all vendors')
    print('2. Create new vendors')
    print('3. Randomly add inventory')

    try:
        user_selection = int(input('\nEnter your choice: '))
    except:
        print('Exiting.')
        exit(0)
    if(user_selection not in [1, 2, 3, 4, 5, 6, 7]):
        show_admin_interface()
    else:
        admin_functions = {
            1: print_all_vendors,
            2: create_new_vendors,
            3: add_inventory
        }
        admin_functions.get(user_selection)()
        show_admin_interface()


def main():
    prGreen('✔️ Logged in successfully as ADMIN ✔️')
    show_admin_interface()


print('🚀 Starting the tool, please wait...')
ADMIN_TOKEN = vendor_login_mutation(
    phoneNumber='123456', password='123456').get('jwtToken')
print('JWT for admin:', ADMIN_TOKEN)
main()
