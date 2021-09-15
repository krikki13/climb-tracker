import re
import urllib.request
from bs4 import BeautifulSoup

user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
headers={'User-Agent':user_agent,}
main_url = "http://www.plezanje.net/climbing/db/"

def fetch(url_suffix):
    url = main_url + url_suffix
    request = urllib.request.Request(url, None, headers)
    f = urllib.request.urlopen(request)
    return f.read()

def get_list_of_crags():
    html = fetch("cragIntro.asp?type=C&ord=n&cc=SI")

    soup = BeautifulSoup(html, 'html.parser')
    crags = []
    for crag in soup.find("table", {"class": "fmtTable active striped expandable"}).find_all("a"):
        crags.append((crag.text, crag['href']))

    return crags


def get_crag_routes(crag_url_suffix, abort_if_incomplete=True):
    soup = BeautifulSoup(fetch(crag_url_suffix), 'html.parser')
    sectors = []

    table = soup.find("table", {"class": "fmtTable expandable active striped"})
    for tr in table.find_all("tr"):
        if len(tr.get_attribute_list('class')) == 2 and tr.get_attribute_list('class')[0] == 'sectorRow' and tr.get_attribute_list('class')[1] == 'expandable':
            sectors.append((tr.find('p').text, []))
        id = tr.get_attribute_list('id')[0]
        if id is not None and re.match("r_\\d+", id):
            if len(sectors) == 0:
                sectors.append(("A", []))
            name = tr.td.a.text
            #res = re.search("<td[^>]+id=\"g_\\d+.+>([^<>]+)(?:</a>)?</p>", str(tr), re.DOTALL)
            res = tr.find("td", id=re.compile("g_"))
            grade = None
            if res is not None:
                grade = res.p.text
            res = re.search("<td class=\"right\">(\\d*)(?: m)?</td>", str(tr))
            length = None
            if res is not None:
                length = str(res.group(1))
            sectors[-1][1].append((name, grade, length))
            #print(sectors[-1][0] + " " + str(sectors[-1][1][-1]))

    fail = False
    for sector in sectors:
        if sector[0] == '':
            print("Unknown sector")
            fail = True
        for r in sector[1]:
            if r[0] == '':
                print("Missing name")
                fail = True
            if r[1] == '':
                print("Missing grade")
                fail = True
            if r[2] == '':
                print("Missing length")
                fail = True
        if fail:
            print(sectors[-1][0] + " " + str(sectors[-1][1][-1]))

    if fail:
        print("Something is missing")
    else:
        print("Nothing is missing :)")

    if abort_if_incomplete and fail:
        return None
    return sectors


def get_crags_and_their_routes():
    crags = get_list_of_crags()
    crags_copy = []

    for crag in crags:
        print("Crag: " + crag[0])
        crags_copy.append((crag[0], crag[1], get_crag_routes(crag[1], False)))

    return crags_copy


if __name__ == '__main__':
    get_crags_and_their_routes()