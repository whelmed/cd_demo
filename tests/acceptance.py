from splinter import Browser
import sys


with Browser('phantomjs') as browser:
    # Visit URL
    url = sys.argv[1]
    browser.visit(url)

    element = browser.find_by_css('header h1').first

    print(element)

    if element == "todo":
        sys.exit(1)
    else:
        sys.exit(0)
