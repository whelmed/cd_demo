from splinter import Browser
import sys


with Browser('phantomjs') as browser:
    # Visit URL
    url = sys.argv[1]
    browser.visit(url)

    headers = browser.find_by_tag('header')

    h1 = headers.find_by_tag('h1').first

    print(h1)

    if h1 == "todo":
        sys.exit(1)
    else:
        sys.exit(0)
