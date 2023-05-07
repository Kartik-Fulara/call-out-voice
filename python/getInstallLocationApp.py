import sys
import winapps


data_from_nextron = sys.argv[1]


print(data_from_nextron)
sys.stdout.flush()


def retLocation(gameName):
    for item in winapps.search_installed(gameName):
        if (item):
            return item.install_location
    return "No item found"


for item in winapps.list_installed():
    if(item.name == data_from_nextron):
        print(item)
        sys.stdout.flush()
