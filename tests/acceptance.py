from splinter import Browser
import sys


with Browser('phantomjs', wait_time=10) as browser:
    # Visit URL
    url = sys.argv[1]
    browser.visit(url)
    print(url)

    headers = browser.find_by_tag('header').first

    h1 = headers.find_by_tag('h1').first

    print(h1)

    if h1.value == "todo":
        sys.exit(1)
    else:
        sys.exit(0)
